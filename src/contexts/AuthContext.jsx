import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { supabase } from '../lib/supabase';

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
                fetchProfile(session.user);
            } else {
                console.log('[Auth] No active session found');
                setLoading(false);
            }
        }).catch(err => {
            console.error('[Auth] getSession failed:', err);
            setLoading(false);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('[Auth] Auth state change event:', event);
            if (session?.user) {
                console.log('[Auth] Session updated for:', session.user.email);
                await fetchProfile(session.user);
            } else {
                console.log('[Auth] User signed out');
                setUser(null);
                setIsAuthenticated(false);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (authUser) => {
        try {
            // Fetch profile via API to get credits and has_purchased derived from backend
            let responseData = null;
            try {
                const { data: { session } } = await supabase.auth.getSession();
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);
                const res = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
                    headers: { 'Authorization': `Bearer ${session?.access_token}` },
                    signal: controller.signal,
                });
                clearTimeout(timeoutId);
                if (res.ok) responseData = await res.json();
            } catch (err) {
                console.warn('Failed to fetch rich profile from API, falling back to basic profile');
            }

            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single();

            const finalProfile = responseData || profile || {};

            if (error) {
                console.warn('Error fetching profile:', error);
            }

            setUser({
                ...authUser,
                ...finalProfile,
                credits: finalProfile?.credits !== undefined ? finalProfile.credits : 0,
                hasPurchased: finalProfile?.has_purchased || false
            });
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error in fetchProfile:', error);
        } finally {
            setLoading(false);
        }
    };

    // Login function
    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password.trim(),
        });

        if (error) throw error;
        return data; // Auth state change listener will handle state update
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
            console.error('Supabase signUp error details:', error);
            throw error;
        }

        // Create profile
        if (data?.user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([
                    {
                        id: data.user.id,
                        full_name: fullName,
                        credits: 10,
                        updated_at: new Date(),
                    },
                ]);

            if (profileError) {
                console.error('Error creating profile:', profileError);
                // Non-fatal, auth still worked
            }
        }

        return data;
    };

    // Logout function
    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        // State cleanup handled by onAuthStateChange
    };

    // Update user data (profile)
    const updateUser = async (updates) => {
        if (!user) return;

        const { error } = await supabase
            .from('profiles')
            .update({
                ...updates,
                updated_at: new Date(),
            })
            .eq('id', user.id);

        if (error) throw error;

        // Optimistic update
        setUser({ ...user, ...updates });
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
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
