// App Constants
export const APP_NAME = 'CV Builder';
export const APP_VERSION = '1.0.0';

// API Endpoints
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://cv-builder-backend-b2ga.onrender.com/api';

// Credit System Packs
export const CREDIT_PACKS = [
    { id: 'pack_40', name: 'Testing', credits: 40, priceMad: 30, popular: false, subtitle: 'Perfect for a single polished CV' },
    { id: 'pack_100', name: 'Most Popular', credits: 100, priceMad: 60, popular: true, subtitle: 'Best value for job seekers' },
    { id: 'pack_200', name: 'Heavy Users', credits: 200, priceMad: 100, popular: false, subtitle: 'For power users and multiple versions' },
];
export const DOWNLOAD_COST = 5;

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
