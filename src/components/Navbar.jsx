import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from './LanguageSelector';
import { ROUTES } from '../utils/constants';
import Button from './Button';

const Navbar = ({ isTransparent = false }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        { name: t('nav.templates'), path: ROUTES.TEMPLATES },
        { name: t('nav.pricing'), path: ROUTES.PRICING },
        { name: t('nav.login'), path: ROUTES.LOGIN },
    ];

    // Determine background class
    // If not transparent (e.g. inner pages), always white/shadowed.
    // If transparent (home), white when scrolled, transparent when top.
    const navbarClasses = !isTransparent
        ? 'bg-white shadow-md py-4' // STABLE SOLID HEADER
        : scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm py-4'
            : 'bg-transparent py-6';

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${navbarClasses}`}
        >
            <nav className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <div
                    className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent cursor-pointer"
                    onClick={() => navigate(ROUTES.HOME)}
                >
                    {t('common.appName')}
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4 md:gap-6">
                    {/* Links */}
                    <div className="flex items-center gap-4 md:gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-semibold transition-colors hover:text-primary-600 ${scrolled ? 'text-primary-900' : 'text-primary-800'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="h-6 w-px bg-gray-200"></div>

                    {/* Language Selector */}
                    <LanguageSelector />

                    {/* CTA Button */}
                    <Link to={ROUTES.REGISTER}>
                        <Button
                            variant="primary"
                            size="md"
                            className="rounded-full px-6 shadow-lg shadow-primary-500/20 font-bold"
                            tabIndex={-1} // Prevent double focus since Link is focusable
                        >
                            {t('nav.register')}
                        </Button>
                    </Link>
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

                            <Link to={ROUTES.REGISTER} className="block mt-4">
                                <Button
                                    variant="primary"
                                    fullWidth
                                    tabIndex={-1}
                                >
                                    {t('nav.register')}
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
