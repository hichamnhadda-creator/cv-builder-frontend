// App Constants
export const APP_NAME = 'CV Builder';
export const APP_VERSION = '1.0.0';

// API Endpoints
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Subscription Plans
export const PLANS = {
    FREE: 'free',
    PREMIUM: 'premium',
};

export const PLAN_FEATURES = {
    [PLANS.FREE]: {
        name: 'Free',
        price: 0,
        features: [
            'All premium templates',
            'Full customization',
            '1 Free download',
            'Unlimited CV creation',
            'Basic support',
        ],
        limitations: {
            maxDownloads: 1,
            watermark: false,
        },
    },
    [PLANS.PREMIUM]: {
        name: 'Premium',
        price: 9.99,
        features: [
            'Unlimited downloads',
            'All templates & fonts',
            'Advanced customization',
            'No download limits',
            'Premium support',
            'Cloud sync',
        ],
        limitations: {
            maxDownloads: Infinity,
            watermark: false,
        },
    },
};

// CV Sections
export const CV_SECTIONS = {
    PERSONAL_INFO: 'personalInfo',
    EXPERIENCE: 'experience',
    EDUCATION: 'education',
    DIPLOMAS: 'diplomas',
    SKILLS: 'skills',
    LANGUAGES: 'languages',
    CERTIFICATIONS: 'certifications',
    PROJECTS: 'projects',
};

// Template Categories
export const TEMPLATE_CATEGORIES = {
    ALL: 'all',
    MODERN: 'modern',
    CLASSIC: 'classic',
    CREATIVE: 'creative',
    MINIMAL: 'minimal',
};

export const SECTION_ICONS = {
    personalInfo: '👤',
    experience: '💼',
    education: '🎓',
    diplomas: '📜',
    skills: '🛠️',
    languages: '🗣️',
    certifications: '📜',
    projects: '🚀',
};

// Default Colors
export const DEFAULT_COLORS = {
    primary: '#262626',
    secondary: '#737373',
    text: '#171717',
    background: '#fdfdfd',
};

export const LANGUAGE_LEVELS = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'elementary', label: 'Elementary' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'upper_intermediate', label: 'Upper Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'proficient', label: 'Proficient' },
    { value: 'native', label: 'Native' },
];

export const SKILL_LEVELS = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' },
];
export const AVAILABLE_FONTS = [
    // Sans-serif
    { value: 'Inter', label: 'Inter', category: 'Sans-serif' },
    { value: 'Roboto', label: 'Roboto', category: 'Sans-serif' },
    { value: 'Open Sans', label: 'Open Sans', category: 'Sans-serif' },
    { value: 'Montserrat', label: 'Montserrat', category: 'Sans-serif' },
    { value: 'Poppins', label: 'Poppins', category: 'Sans-serif' },
    { value: 'Lato', label: 'Lato', category: 'Sans-serif' },

    // Serif
    { value: 'Merriweather', label: 'Merriweather', category: 'Serif' },
    { value: 'Lora', label: 'Lora', category: 'Serif' },
    { value: 'Playfair Display', label: 'Playfair Display', category: 'Serif' },
    { value: 'Roboto Slab', label: 'Roboto Slab', category: 'Serif' },

    // Modern
    { value: 'Manrope', label: 'Manrope', category: 'Modern' },
    { value: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans', category: 'Modern' },
    { value: 'Outfit', label: 'Outfit', category: 'Modern' },
    { value: 'DM Sans', label: 'DM Sans', category: 'Modern' },
];

// Premium Fonts (only for premium users)
export const PREMIUM_FONTS = [
    'Playfair Display',
    'Merriweather',
    'Crimson Text',
    'Libre Baskerville',
];

// Validation Rules
export const VALIDATION = {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
    URL_REGEX: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
    MIN_PASSWORD_LENGTH: 8,
    MAX_CV_TITLE_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
};

// Local Storage Keys
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'cv_builder_token',
    USER_DATA: 'cv_builder_user',
    LANGUAGE: 'i18nextLng',
    THEME: 'cv_builder_theme',
    CURRENT_CV: 'cv_builder_current_cv',
};

// Routes
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    EDITOR: '/editor',
    TEMPLATES: '/templates',
    PRICING: '/pricing',
    PROFILE: '/profile',
    PREVIEW: '/preview',
    ADMIN: '/admin',
};

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'Please login to continue.',
    FORBIDDEN: 'You do not have permission to access this resource.',
    NOT_FOUND: 'Resource not found.',
    SERVER_ERROR: 'Server error. Please try again later.',
    VALIDATION_ERROR: 'Please check your input and try again.',
};
