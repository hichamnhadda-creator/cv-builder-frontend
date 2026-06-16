import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiGlobe, FiChevronDown, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸', dir: 'ltr' },
    { code: 'fr', label: 'Français', flag: '🇫🇷', dir: 'ltr' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦', dir: 'rtl' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
    { code: 'es', label: 'Español', flag: '🇪🇸', dir: 'ltr' },
    { code: 'pt', label: 'Português', flag: '🇵🇹', dir: 'ltr' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
];

const LanguageSelector = ({ mobile = false }) => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (langCode) => {
        i18n.changeLanguage(langCode);
        setIsOpen(false);
    };

    return (
        <div className={`relative ${mobile ? 'w-full' : ''}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2.5 h-[42px] px-3.5 rounded-[14px] bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 group ${mobile ? 'w-full justify-between' : ''}`}
                aria-label="Select Language"
            >
                <div className="flex items-center gap-2">
                    <span className="text-lg leading-none">{currentLanguage.flag}</span>
                    <span className={`text-[13px] font-bold text-gray-700 group-hover:text-blue-600 ${!mobile ? 'hidden sm:block' : ''}`}>
                        {currentLanguage.code.toUpperCase()}
                    </span>
                </div>
                <FiChevronDown
                    className={`text-gray-400 group-hover:text-blue-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={mobile ? { height: 0, opacity: 0 } : { opacity: 0, y: 10, scale: 0.95 }}
                        animate={mobile ? { height: 'auto', opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                        exit={mobile ? { height: 0, opacity: 0 } : { opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={
                            mobile
                                ? "w-full bg-gray-50 rounded-lg mt-2 overflow-hidden"
                                : "absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 origin-top-right rtl:origin-top-left rtl:left-0 rtl:right-auto"
                        }
                    >
                        <div className="py-1">
                            {languages.map((language) => (
                                <button
                                    key={language.code}
                                    onClick={() => handleLanguageChange(language.code)}
                                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors
                                        ${i18n.language === language.code ? 'bg-primary-50 text-primary-600' : 'text-gray-700'}
                                    `}
                                >
                                    <span className="text-xl">{language.flag}</span>
                                    <span className={`flex-1 text-start ${language.code === 'ar' ? 'font-arabic' : ''}`}>
                                        {language.label}
                                    </span>
                                    {i18n.language === language.code && (
                                        <FiCheck className="text-primary-500" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSelector;
