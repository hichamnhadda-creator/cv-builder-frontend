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
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                fetchProfile(session.user);
            } else {
                setLoading(false);
            }
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
                await fetchProfile(session.user);
            } else {
                setUser(null);
                setIsAuthenticated(false);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (authUser) => {
        try {
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single();

            if (error) {
                console.warn('Error fetching profile:', error);
            }

            setUser({
                ...authUser,
                ...(profile || {}),
                subscription: { // Default subscription if not in profile
                    plan: profile?.subscription_plan || 'free',
                    status: profile?.subscription_status || 'active'
                }
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
            email,
            password,
        });

        if (error) throw error;
        return data; // Auth state change listener will handle state update
    };

    // Register function
    const register = async (email, password, fullName) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) throw error;

        // Create profile
        if (data?.user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([
                    {
                        id: data.user.id,
                        full_name: fullName,
                        subscription_plan: 'free',
                        subscription_status: 'active',
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

    // Check if user has premium subscription
    const isPremium = () => {
        return user?.subscription?.plan === 'premium' &&
            user?.subscription?.status === 'active';
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
        isPremium: isPremium(),
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
