import axios from 'axios';
import { supabase } from './supabase';

// Create axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://cv-builder-backend-qv79.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the Token
api.interceptors.request.use(
    async (config) => {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.access_token) {
            config.headers.Authorization = `Bearer ${session.access_token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access (e.g., logout user)
            const { error: signOutError } = await supabase.auth.signOut();
            if (signOutError) console.error('Error signing out:', signOutError);
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
