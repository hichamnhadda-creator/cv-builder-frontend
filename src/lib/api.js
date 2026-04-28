import axios from 'axios';
import { supabase } from './supabase';

// Create axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : 'https://cv-builder-backend-b2ga.onrender.com/api'),
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
        
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
    (response) => {
        console.log(`[API Response] ${response.status} ${response.config.url}`);
        return response;
    },
    async (error) => {
        const status = error.response?.status;
        const url = error.config?.url;
        console.error(`[API Response Error] ${status || 'Network Error'} ${url}`, error.response?.data || error.message);

        if (status === 401) {
            console.warn('[Auth] Unauthorized access detected, signing out...');
            await supabase.auth.signOut();
            // Optional: redirect to login if not already there
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
