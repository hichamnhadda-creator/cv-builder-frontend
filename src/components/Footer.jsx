import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, APP_NAME } from '../utils/constants';
import { FiMail, FiGithub, FiTwitter, FiLinkedin, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: 'Product',
            links: [
                { name: 'Templates', href: ROUTES.TEMPLATES },
                { name: 'Pricing', href: ROUTES.PRICING },
                { name: 'Dashboard', href: ROUTES.DASHBOARD },
            ],
        },
        {
            title: 'Support',
            links: [
                { name: 'Contact', href: ROUTES.CONTACT },
                { name: 'Refund Policy', href: ROUTES.REFUND },
            ],
        },
        {
            title: 'Legal',
            links: [
                { name: 'Privacy Policy', href: ROUTES.PRIVACY },
                { name: 'Terms of Service', href: ROUTES.TERMS },
            ],
        },
    ];

    return (
        <footer className="bg-[#f8fafc] border-t border-[#e2e8f0] pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="md:col-span-2 lg:col-span-2">
                        <Link to={ROUTES.HOME} className="flex items-center gap-3 mb-6 group">
                            <div className="w-10 h-10 bg-[#2563eb] rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-105">
                                {APP_NAME.charAt(0)}
                            </div>
                            <span className="text-2xl font-black text-[#0f172a] tracking-tight">{APP_NAME}</span>
                        </Link>
                        <p className="text-[#475569] text-lg font-medium leading-relaxed mb-8 max-w-sm">
                            The intelligent way to build your professional career. Create AI-powered resumes that get you hired at top companies.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: FiTwitter, label: 'Twitter' },
                                { icon: FiGithub, label: 'Github' },
                                { icon: FiLinkedin, label: 'LinkedIn' }
                            ].map((social) => (
                                <motion.a
                                    key={social.label}
                                    href="#"
                                    whileHover={{ y: -3 }}
                                    className="w-10 h-10 bg-white border border-[#e2e8f0] rounded-xl flex items-center justify-center text-[#475569] hover:text-[#2563eb] hover:border-[#2563eb]/30 hover:shadow-md transition-all"
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title} className="bg-white/50 border border-[#e2e8f0] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-sm font-black text-[#0f172a] uppercase tracking-[0.1em] mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#2563eb] rounded-full"></span>
                                {section.title}
                            </h3>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link 
                                            to={link.href} 
                                            className="group flex items-center text-[#475569] hover:text-[#2563eb] text-[15px] font-semibold transition-colors"
                                        >
                                            <FiChevronRight className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2 text-[#2563eb]" size={14} />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[#e2e8f0] flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-[#64748b] text-[15px] font-medium order-2 md:order-1">
                        © {currentYear} <span className="text-[#0f172a] font-bold">{APP_NAME}</span>. Crafted for modern careers.
                    </div>
                    
                    <div className="flex items-center gap-8 order-1 md:order-2">
                        <a 
                            href="mailto:support@fastcvbuilder.com" 
                            className="flex items-center gap-2 text-[#475569] hover:text-[#2563eb] font-bold text-[15px] transition-colors bg-white px-4 py-2 rounded-full border border-[#e2e8f0] shadow-sm"
                        >
                            <FiMail className="text-[#2563eb]" />
                            support@fastcvbuilder.com
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
