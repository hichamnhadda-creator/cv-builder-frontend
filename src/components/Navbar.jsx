import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from './LanguageSelector';
import { ROUTES } from '../utils/constants';
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ isTransparent = false }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isAuthenticated, logout, credits } = useAuth();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: t('nav.templates', 'Templates'), path: ROUTES.TEMPLATES },
        { name: t('nav.pricing', 'Pricing'), path: ROUTES.PRICING },
        ...(isAuthenticated
            ? [{ name: t('nav.dashboard', 'Dashboard'), path: ROUTES.DASHBOARD }]
            : [{ name: t('nav.login', 'Login'), path: ROUTES.LOGIN }]),
    ];

    // Determine background class
    const navbarClasses = scrolled 
        ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-2' 
        : isTransparent 
            ? 'bg-transparent py-4' 
            : 'bg-white/90 backdrop-blur-xl border-b border-gray-100 py-3';

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${navbarClasses}`}
        >
            <nav className="max-w-[1400px] mx-auto px-6 flex items-center justify-between gap-4">
                {/* Logo Section */}
                <div
                    className="group flex items-center gap-3 cursor-pointer shrink-0"
                    onClick={() => navigate(ROUTES.HOME)}
                >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#2563eb] to-[#4f46e5] rounded-[12px] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)] group-hover:scale-105 transition-transform duration-300">
                        <span className="text-xl font-black italic">C</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors hidden sm:block">
                        {t('common.appName')}
                    </span>
                </div>

                {/* Main Navigation & CTA Section */}
                <div className="flex items-center gap-3 lg:gap-6">
                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center bg-gray-50/50 p-1 rounded-[16px] border border-gray-100">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 h-9 flex items-center rounded-[12px] text-[13px] font-bold whitespace-nowrap transition-all duration-300 ${
                                    location.pathname === link.path
                                        ? 'bg-white text-blue-600 shadow-sm border border-gray-100'
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden lg:block h-8 w-px bg-gray-200/60 mx-1"></div>

                    {/* Language & Actions */}
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block">
                            <LanguageSelector />
                        </div>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                <Link 
                                    to={ROUTES.PRICING}
                                    className="flex items-center gap-1.5 h-8 px-3 bg-blue-50/50 hover:bg-blue-50 border border-blue-100/50 rounded-full shadow-[0_2px_10px_rgba(37,99,235,0.05)] hover:shadow-[0_4px_12px_rgba(37,99,235,0.1)] transition-all duration-300"
                                >
                                    <span className="text-[10px]">💎</span>
                                    <span className="text-xs font-bold text-blue-700">{credits}</span>
                                </Link>
                                
                                <Button
                                    variant="outline"
                                    className="h-[42px] px-5 rounded-[14px] border-gray-200 text-gray-600 hover:border-blue-600 hover:text-white hover:bg-gradient-to-br hover:from-[#2563eb] hover:to-[#4f46e5] text-[13px] font-bold shadow-sm whitespace-nowrap"
                                    onClick={async () => {
                                        await logout();
                                        navigate(ROUTES.HOME);
                                    }}
                                >
                                    {t('common.logout', 'Logout')}
                                </Button>
                            </div>
                        ) : (
                            <Link to={ROUTES.REGISTER} className="shrink-0">
                                <Button
                                    variant="primary"
                                    className="h-[42px] px-7 shadow-[0_8px_20px_rgba(37,99,235,0.2)] text-[13px] font-bold rounded-[14px] whitespace-nowrap"
                                >
                                    {t('nav.register', 'Get Started')}
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700 p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b shadow-lg overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="block w-full text-left py-3 px-4 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <hr className="border-gray-100 my-2" />

                            <div className="flex flex-col gap-2 px-4">
                                <span className="text-gray-500 text-sm">Language</span>
                                <LanguageSelector mobile={true} />
                            </div>

                            {isAuthenticated ? (
                                <Button
                                    variant="outline"
                                    fullWidth
                                    className="mt-4 text-gray-600 hover:text-red-600 border-gray-200 hover:border-red-600 hover:bg-red-50"
                                    onClick={async () => {
                                        await logout();
                                        setMobileMenuOpen(false);
                                        navigate(ROUTES.HOME);
                                    }}
                                    tabIndex={-1}
                                >
                                    {t('nav.logout', 'Logout')}
                                </Button>
                            ) : (
                                <Link to={ROUTES.REGISTER} className="block mt-4">
                                    <Button
                                        variant="primary"
                                        fullWidth
                                        tabIndex={-1}
                                    >
                                        {t('nav.register', 'Register')}
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
