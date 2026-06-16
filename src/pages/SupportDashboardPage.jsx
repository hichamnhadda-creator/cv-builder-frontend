import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiHelpCircle, FiMessageCircle, FiBookOpen } from 'react-icons/fi';

const SupportDashboardPage = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-[32px] font-black text-gray-900 tracking-tight">{t('nav.support', 'Supporto')}</h1>
                <p className="text-gray-500 font-medium text-sm mt-1">{t('support.subtitle', 'Siamo qui per aiutarti a creare il tuo CV perfetto')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm text-center hover:border-blue-200 hover:shadow-md transition-all cursor-pointer">
                    <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <FiMessageCircle size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{t('support.contactTitle', 'Contattaci')}</h3>
                    <p className="text-gray-500 text-sm mb-4">
                        {t('support.contactDesc', 'Hai un problema tecnico o una domanda sui pagamenti? Il nostro team è a tua disposizione.')}
                    </p>
                    <a href="mailto:support@fastcvbuilder.com" className="text-blue-600 font-bold text-sm hover:underline">
                        support@fastcvbuilder.com
                    </a>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm text-center hover:border-orange-200 hover:shadow-md transition-all cursor-pointer">
                    <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <FiBookOpen size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{t('support.faqTitle', 'Domande Frequenti')}</h3>
                    <p className="text-gray-500 text-sm mb-4">
                        {t('support.faqDesc', 'Trova risposte rapide su come esportare, formattare il tuo CV o gestire il tuo abbonamento.')}
                    </p>
                    <span className="text-orange-600 font-bold text-sm hover:underline">
                        {t('support.readFaq', 'Leggi le FAQ')}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SupportDashboardPage;
