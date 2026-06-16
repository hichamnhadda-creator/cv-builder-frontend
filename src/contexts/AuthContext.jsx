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

            // 1. Set initial user state without overwriting credits to 0 immediately
            setUser(prev => {
                if (!prev) {
                    return { ...authUser, credits: 0, hasPurchased: false };
                }
                return { ...prev, ...authUser };
            });
            setIsAuthenticated(true);

            // 2. Fetch the true profile from the backend API (most reliable)
            console.log(`[Auth][${fetchId}] Fetching profile from backend API...`);
            
            try {
                const res = await api.get('/profile');
                if (res.status === 200) {
                    const responseData = res.data;
                    console.log(`[Auth][${fetchId}] Backend sync response: credits=${responseData.credits}, freeExports=${responseData.free_export_count}`);
                    
                    setUser(prev => {
                        if (!prev) return prev;
                        return {
                            ...prev,
                            ...responseData,
                            credits: responseData.credits,
                            freeExportCount: responseData.free_export_count || 0,
                            hasPurchased: responseData.has_purchased || false
                        };
                    });
                }
            } catch (err) {
                console.warn(`[Auth][${fetchId}] Backend API fetch failed, trying direct Supabase fallback:`, err.message);
                
                // Fallback to direct supabase fetch if API fails
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', authUser.id)
                    .single();

                if (!error && profile) {
                    const dbCredits = profile.credits !== undefined ? profile.credits : 0;
                    setUser(prev => ({
                        ...prev,
                        ...profile,
                        credits: dbCredits,
                        freeExportCount: profile.free_export_count || 0,
                        hasPurchased: profile.has_purchased || false
                    }));
                }
            }

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


    // addCredits removed - handled via Paddle Webhooks

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

    // Update user state ONLY (no DB call)
    const syncUserLocal = (updates) => {
        console.log('[Auth] syncUserLocal called with:', updates);
        setUser(prev => ({ ...prev, ...updates }));
    };

    // Expose a manual refresh profile function to sync credits
    const refreshProfile = async () => {
        console.log('[Auth] Manual refreshProfile triggered');
        try {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) throw error;
            if (session) {
                await fetchProfile(session);
            }
        } catch (err) {
            console.error('[Auth] Manual refreshProfile failed:', err.message);
        }
    };


    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
        syncUserLocal,
        refreshProfile,
        credits: user?.credits || 0,
        freeExportCount: user?.freeExportCount || 0,
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
