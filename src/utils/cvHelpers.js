/**
 * Format date to readable string
 */
export const formatDate = (date, locale = 'en') => {
    if (!date) return '';

    const d = new Date(date);
    const options = { year: 'numeric', month: 'long' };

    return d.toLocaleDateString(locale, options);
};

/**
 * Format date range
 */
export const formatDateRange = (startDate, endDate, current = false, locale = 'en') => {
    const start = formatDate(startDate, locale);
    const end = current ? 'Present' : formatDate(endDate, locale);

    return `${start} - ${end}`;
};

/**
 * Format currency
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(amount);
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Truncate text
 */
export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

/**
 * Capitalize first letter
 */
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Generate initials from name
 */
export const getInitials = (name) => {
    if (!name) return '';

    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Generate random ID
 */
export const generateId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

/**
 * Debounce function
 */
export const debounce = (func, wait = 300) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Deep clone object
 */
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if object is empty
 */
export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};

/**
 * Remove empty fields from object
 */
export const removeEmptyFields = (obj) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v != null && v !== '')
    );
};
