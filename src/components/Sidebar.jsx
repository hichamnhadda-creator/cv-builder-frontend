import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
    FiHome, FiFileText, FiGrid, FiMail, 
    FiUpload, FiBarChart2, FiShield, 
    FiSettings, FiHelpCircle 
} from 'react-icons/fi';
import { ROUTES, APP_NAME } from '../utils/constants';

const Sidebar = () => {
    const { t } = useTranslation();
    const location = useLocation();

    const navItems = [
        { name: t('nav.dashboard', 'Dashboard'), icon: FiHome, path: ROUTES.DASHBOARD },
        { name: t('nav.myCVs', 'I miei CV'), icon: FiFileText, path: ROUTES.DASHBOARD }, // Currently points to Dashboard
        { name: t('nav.templates', 'Modelli'), icon: FiGrid, path: ROUTES.TEMPLATES },
        { name: t('nav.coverLetters', 'Lettere di Presentazione'), icon: FiMail, path: ROUTES.COVER_LETTERS },
        { name: t('nav.importCV', 'Importa CV'), icon: FiUpload, path: ROUTES.IMPORT_CV },
        { name: t('nav.statistics', 'Statistiche'), icon: FiBarChart2, path: ROUTES.STATISTICS },
        { name: t('nav.credits', 'Crediti'), icon: FiShield, path: ROUTES.PRICING },
        { name: t('nav.settings', 'Impostazioni'), icon: FiSettings, path: ROUTES.SETTINGS },
        { name: t('nav.support', 'Supporto'), icon: FiHelpCircle, path: ROUTES.SUPPORT },
    ];

    return (
        <aside className="w-[280px] h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 overflow-y-auto">
            {/* Logo area */}
            <div className="p-6">
                <Link to={ROUTES.HOME} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                        <span className="text-xl font-black italic">C</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900">
                        {APP_NAME}
                    </span>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 pb-6 space-y-1">
                {navItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={index}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 font-semibold text-sm ${
                                isActive 
                                    ? 'bg-blue-50 text-blue-600' 
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            <item.icon size={18} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Premium Banner */}
            <div className="p-4 mb-4">
                <div className="bg-gradient-to-b from-indigo-50 to-white border border-indigo-100 rounded-3xl p-5 text-center shadow-sm relative overflow-hidden">
                    <div className="text-4xl mb-3 text-purple-500">👑</div>
                    <h4 className="text-sm font-black text-gray-900 mb-2">{t('sidebar.premiumTitle', 'Passa a Premium')}</h4>
                    <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                        {t('sidebar.premiumDesc', 'Sblocca tutti i modelli e funzionalità premium.')}
                    </p>
                    <Link to={ROUTES.PRICING}>
                        <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md transition-colors">
                            {t('sidebar.discoverMore', 'Scopri di più')}
                        </button>
                    </Link>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
