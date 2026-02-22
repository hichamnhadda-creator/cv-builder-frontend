import { VALIDATION } from './constants';

/**
 * Validate email address
 */
export const validateEmail = (email) => {
    if (!email) return 'Email is required';
    if (!VALIDATION.EMAIL_REGEX.test(email)) return 'Invalid email address';
    return null;
};

/**
 * Validate password
 */
export const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
        return `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`;
    }
    return null;
};

/**
 * Validate phone number
 */
export const validatePhone = (phone) => {
    if (!phone) return null; // Phone is optional
    if (!VALIDATION.PHONE_REGEX.test(phone)) return 'Invalid phone number';
    return null;
};

/**
 * Validate URL
 */
export const validateURL = (url) => {
    if (!url) return null; // URL is optional
    if (!VALIDATION.URL_REGEX.test(url)) return 'Invalid URL';
    return null;
};

/**
 * Validate required field
 */
export const validateRequired = (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
        return `${fieldName} is required`;
    }
    return null;
};

/**
 * Validate max length
 */
export const validateMaxLength = (value, maxLength, fieldName = 'This field') => {
    if (value && value.length > maxLength) {
        return `${fieldName} must be less than ${maxLength} characters`;
    }
    return null;
};

/**
 * Validate date range
 */
export const validateDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
        return 'End date must be after start date';
    }
    return null;
};

/**
 * Validate file size
 */
export const validateFileSize = (file, maxSizeMB = 5) => {
    if (!file) return null;

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
        return `File size must be less than ${maxSizeMB}MB`;
    }
    return null;
};

/**
 * Validate file type
 */
export const validateFileType = (file, allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']) => {
    if (!file) return null;

    if (!allowedTypes.includes(file.type)) {
        return `File type must be one of: ${allowedTypes.join(', ')}`;
    }
    return null;
};

/**
 * Validate image file
 */
export const validateImage = (file) => {
    const sizeError = validateFileSize(file, 5);
    if (sizeError) return sizeError;

    const typeError = validateFileType(file, ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']);
    if (typeError) return typeError;

    return null;
};
