import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { supabase } from '../lib/supabase';
import api from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Initialize Supabase Auth listener
    useEffect(() => {
        // Check active session
        console.log('[Auth] Initializing session check...');
        supabase.auth.getSession().then(({ data: { session }, error }) => {
            if (error) console.error('[Auth] Session check error:', error);
            if (session?.user) {
                console.log('[Auth] Active session found for:', session.user.email);
                fetchProfile(session);
            } else {
                console.log('[Auth] No active session found');
                setLoading(false);
            }
        }).catch(err => {
            console.error('[Auth] getSession failed:', err);
            setLoading(false);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setTimeout(() => {
                console.log('[Auth] Auth state change event:', event);
                if (session?.user) {
                    console.log('[Auth] Session updated for:', session.user.email);
                    setLoading(true);
                    // Fire and forget to avoid Supabase auth lock deadlocks!
                    fetchProfile(session);
                } else {
                    console.log('[Auth] User signed out');
                    setUser(null);
                    setIsAuthenticated(false);
                    setLoading(false);
                }
            }, 0);
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (session) => {
        const fetchId = Math.random().toString(36).substring(7);
        console.log(`[Auth][${fetchId}] fetchProfile started for:`, session?.user?.email);
        try {
            if (!session?.user) {
                console.warn(`[Auth][${fetchId}] No user in session for fetchProfile`);
                return;
            }
            const authUser = session.user;

            console.log(`[Auth][${fetchId}] Fetching profile from Supabase...`);
            // 1. Fetch profile from Supabase profiles table
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single();

            if (error) {
                console.warn(`[Auth][${fetchId}] Error fetching from Supabase:`, error.message);
            }

            const dbCredits = profile?.credits !== undefined ? profile.credits : 0;
            console.log(`[Auth][${fetchId}] Supabase data: credits=${dbCredits}`);

            // 2. Update user state - IMPORTANT: Only if it's the first load or if we don't have a newer local state
            setUser(prev => {
                // If we already have credits in state, and they are DIFFERENT from DB, 
                // we might want to be careful. But on first load (prev null), we always take DB.
                if (!prev) {
                    console.log(`[Auth][${fetchId}] Initial state set from DB`);
                    return {
                        ...authUser,
                        ...profile,
                        credits: dbCredits,
                        hasPurchased: profile?.has_purchased || false
                    };
                }
                
                // If already have state, only update if DB has something new or if we trust it
                console.log(`[Auth][${fetchId}] Updating existing state: current=${prev.credits}, db=${dbCredits}`);
                return {
                    ...prev,
                    ...profile,
                    credits: dbCredits, // We trust DB for now, but background fetch will also sync
                    hasPurchased: profile?.has_purchased || prev.hasPurchased
                };
            });
            setIsAuthenticated(true);

            // 3. Sync from backend API
            const fetchRichProfile = async () => {
                console.log(`[Auth][${fetchId}] Background rich sync started...`);
                try {
                    const res = await api.get('/profile');
                    if (res.status === 200) {
                        const responseData = res.data;
                        console.log(`[Auth][${fetchId}] Rich sync response: credits=${responseData.credits}`);
                        
                        setUser(prev => {
                            if (!prev) return prev; // Should not happen

                            // PROTECTION: If local state is > 0 and backend returns 0, it MIGHT be stale.
                            // However, we'll trust backend but log it heavily.
                            if (prev.credits > 0 && responseData.credits === 0) {
                                console.warn(`[Auth][${fetchId}] POTENTIAL STALE OVERWRITE: Local=${prev.credits}, Backend=${responseData.credits}`);
                            }

                            return {
                                ...prev,
                                ...responseData,
                                credits: responseData.credits !== undefined ? responseData.credits : prev.credits,
                                hasPurchased: responseData.has_purchased !== undefined ? responseData.has_purchased : prev.hasPurchased
                            };
                        });
                    }
                } catch (err) {
                    console.warn(`[Auth][${fetchId}] Background sync failed:`, err.message);
                }
            };

            fetchRichProfile();

        } catch (error) {
            console.error(`[Auth][${fetchId}] Fatal error in fetchProfile:`, error.message);
            if (session?.user && !user) {
                setUser({ ...session.user, credits: 0, hasPurchased: false });
                setIsAuthenticated(true);
            }
        } finally {
            setLoading(false);
        }
    };

    // Login function
    const login = async (email, password) => {
        console.log('[Auth] Attempting login for:', email);
        try {
            setLoading(true);
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password.trim(),
            });

            if (error) {
                console.error('[Auth] Login error from Supabase:', error.message);
                if (error.message === 'Invalid login credentials') {
                    throw new Error('Wrong email or password. Please try again.');
                }
                throw error;
            }
            console.log('[Auth] Login successful for:', email);
            return data;
        } catch (error) {
            console.error('[Auth] Login exception caught:', error.message);
            throw error;
        } finally {
            console.log('[Auth] login flow complete. Setting loading to false.');
            setLoading(false);
        }
    };


    // Register function
    const register = async (email, password, fullName) => {
        console.log('AuthContext.register called with:', { email, fullName });
        const { data, error } = await supabase.auth.signUp({
            email: email.trim(),
            password: password.trim(),
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) {
            console.error('[Auth] Supabase signUp error details:', error);
            throw error;
        }

        console.log('[Auth] signUp success:', data);
        return data;
    };


    // Add Credits function (Secure via Backend)
    const addCredits = async (amount, packId) => {
        console.log(`[Auth] addCredits requested: amount=${amount}, pack=${packId}`);
        try {
            const res = await api.post('/credits/add', { 
                credits: amount, 
                packId,
                transactionId: 'mock_' + Date.now() 
            });
            
            if (res.status === 200) {
                const newCredits = res.data.credits;
                console.log(`[Auth] addCredits SUCCESS. New balance: ${newCredits}`);
                
                // Update local state immediately
                setUser(prev => ({
                    ...prev,
                    credits: newCredits,
                    hasPurchased: true
                }));
                
                return res.data;
            } else {
                throw new Error(res.data.error || 'Failed to add credits');
            }
        } catch (error) {
            console.error('[Auth] addCredits FAILED:', error.message);
            throw error;
        }
    };

    // Logout function
    const logout = async () => {
        console.log('[Auth] Logging out...');
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    // Update user data (profile)
    const updateUser = async (updates) => {
        if (!user) return;
        console.log('[Auth] updateUser called with:', updates);

        const { error } = await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                ...updates,
                updated_at: new Date().toISOString(),
            });

        if (error) {
            console.error('[Auth] updateUser DB error:', error.message);
            throw error;
        }

        // Optimistic update
        setUser(prev => ({ ...prev, ...updates }));
        console.log('[Auth] updateUser SUCCESS (Local + DB)');
    };


    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
        addCredits,
        credits: user?.credits || 0,
        hasPurchased: user?.hasPurchased || false,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
