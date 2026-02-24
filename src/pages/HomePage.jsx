import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { ROUTES } from '../utils/constants';
import Navbar from '../components/Navbar';

const HomePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const features = [
        {
            icon: '📝',
            title: t('features.templates.title'),
            description: t('features.templates.description'),
        },
        {
            icon: '🎨',
            title: t('features.customize.title'),
            description: t('features.customize.description'),
        },
        {
            icon: '📄',
            title: t('features.export.title'),
            description: t('features.export.description'),
        },
        {
            icon: '🌍',
            title: t('features.multilingual.title'),
            description: t('features.multilingual.description'),
        },
    ];

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            <Navbar isTransparent={true} />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 -z-10 rounded-l-[100px] transform translate-x-20"></div>

                {/* Floating Shapes */}
                <motion.div
                    initial={{ opacity: 0, rotate: -45, x: -100 }}
                    animate={{ opacity: 0.6, rotate: -45, x: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-40 -left-20 w-64 h-24 bg-primary-100 rounded-full -z-10"
                ></motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.8, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute bottom-40 left-1/4 w-12 h-12 bg-primary-400 rounded-full -z-10"
                ></motion.div>

                <motion.div
                    initial={{ opacity: 0, rotate: -45, y: 100 }}
                    animate={{ opacity: 0.4, rotate: -45, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="absolute -bottom-10 right-1/4 w-96 h-32 bg-primary-200 rounded-full -z-10"
                ></motion.div>

                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side: Visual / Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative hidden lg:block"
                    >
                        {/* Rounded Image Container as seen in design */}
                        <div className="relative z-10 rounded-tr-[200px] rounded-bl-[100px] overflow-hidden shadow-2xl border-8 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                                alt="CV Builder Professional"
                                className="w-full h-[500px] object-cover"
                            />
                        </div>
                        {/* Decorative Pills around image */}
                        <div className="absolute -top-10 -right-10 w-32 h-12 bg-primary-500 rounded-full opacity-20 rotate-45"></div>
                        <div className="absolute -bottom-10 -left-10 w-48 h-16 bg-primary-100 rounded-full -z-10 rotate-12"></div>
                    </motion.div>

                    {/* Right Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center lg:text-left z-10"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-primary-900 mb-6 leading-[1.1] tracking-tight">
                            {t('hero.title')}
                        </h1>
                        <p className="text-lg md:text-xl text-primary-800/70 mb-10 max-w-lg leading-relaxed font-medium">
                            {t('hero.subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button
                                onClick={() => navigate(ROUTES.DASHBOARD)}
                                className="px-10 py-4 bg-primary-600 text-white rounded-full font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/30 flex items-center justify-center gap-3 text-lg"
                            >
                                START NOW
                            </button>
                            <button
                                onClick={() => navigate(ROUTES.TEMPLATES)}
                                className="px-10 py-4 bg-white text-primary-800 rounded-full font-bold border-2 border-primary-100 hover:border-primary-600 transition-all flex items-center justify-center text-lg"
                            >
                                {t('hero.viewTemplates')}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-12 md:py-16 relative">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="text-center mb-10 md:mb-12">
                        <h2 className="text-4xl font-bold text-primary-900 mb-4 tracking-tight">
                            {t('features.title')}
                        </h2>
                        <div className="w-20 h-1.5 bg-primary-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="p-6 md:p-8 bg-primary-50/30 rounded-[2rem] md:rounded-[2.5rem] border border-primary-100/50 hover:bg-white hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 group"
                            >
                                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-500">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-primary-900 mb-3">{feature.title}</h3>
                                <p className="text-primary-800/60 leading-relaxed text-sm font-medium">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="bg-primary-600 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-16 text-center relative overflow-hidden shadow-2xl shadow-primary-500/40"
                >
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400 opacity-20 rounded-full -ml-32 -mb-32"></div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight relative z-10 leading-tight">
                        Ready to Create Your <br /> Perfect CV?
                    </h2>
                    <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed relative z-10 font-medium">
                        {t('hero.subtitle')}
                    </p>
                    <button
                        onClick={() => navigate(ROUTES.REGISTER)}
                        className="px-12 py-5 bg-white text-primary-600 rounded-full font-bold hover:bg-primary-50 transition shadow-xl relative z-10 text-lg"
                    >
                        GET STARTED FOR FREE
                    </button>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="py-8 md:py-12 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-2xl font-black text-primary-900 tracking-tighter">
                        {t('common.appName')}
                    </div>
                    <p className="text-gray-400 text-sm font-medium">
                        © 2026 {t('common.appName')}. One free download. Unlimited potential.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
