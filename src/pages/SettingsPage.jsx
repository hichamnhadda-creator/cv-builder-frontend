import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiSettings, FiUser, FiGlobe, FiBell } from 'react-icons/fi';
import LanguageSelector from '../components/LanguageSelector';

const SettingsPage = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-[32px] font-black text-gray-900 tracking-tight">{t('nav.settings', 'Impostazioni')}</h1>
                <p className="text-gray-500 font-medium text-sm mt-1">{t('settings.subtitle', 'Gestisci le preferenze del tuo account')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Language Settings */}
                <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm col-span-1 md:col-span-2">
                    <div className="flex items-center gap-3 mb-6">
                        <FiGlobe className="text-gray-400" size={24} />
                        <h3 className="text-lg font-bold text-gray-900">{t('settings.language', 'Lingua e Regione')}</h3>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-gray-900">{t('settings.appLanguage', 'Lingua dell\'applicazione')}</p>
                            <p className="text-xs text-gray-500 mt-1">{t('settings.languageDesc', 'Scegli la lingua in cui vuoi usare CV Builder')}</p>
                        </div>
                        <LanguageSelector />
                    </div>
                </div>

                {/* Profile Placeholder */}
                <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <FiUser className="text-gray-400" size={24} />
                        <h3 className="text-lg font-bold text-gray-900">{t('nav.profile', 'Profilo')}</h3>
                    </div>
                    <div className="text-center py-4">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                            U
                        </div>
                        <button className="text-sm text-blue-600 font-bold hover:underline">
                            {t('settings.editProfile', 'Modifica Profilo')}
                        </button>
                    </div>
                </div>

                {/* Notifications Placeholder */}
                <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm col-span-1 md:col-span-3">
                    <div className="flex items-center gap-3 mb-6">
                        <FiBell className="text-gray-400" size={24} />
                        <h3 className="text-lg font-bold text-gray-900">{t('settings.notifications', 'Notifiche')}</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <p className="text-sm font-bold text-gray-900">{t('settings.emailNotif', 'Notifiche Email')}</p>
                                <p className="text-xs text-gray-500 mt-1">{t('settings.emailNotifDesc', 'Ricevi aggiornamenti su nuovi modelli e funzionalità')}</p>
                            </div>
                            <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
