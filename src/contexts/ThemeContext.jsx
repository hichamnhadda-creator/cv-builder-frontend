import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [isDark, setIsDark] = useState(false);

    // Load theme from localStorage on mount
    useEffect(() => {
        const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
        setTheme(storedTheme);
        setIsDark(storedTheme === 'dark');

        // Apply theme to document
        if (storedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    }, []);

    // Toggle theme
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        setIsDark(newTheme === 'dark');

        localStorage.setItem(STORAGE_KEYS.THEME, newTheme);

        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const value = {
        theme,
        isDark,
        toggleTheme,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
