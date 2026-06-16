import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiBarChart2, FiEye, FiDownload } from 'react-icons/fi';

const StatisticsPage = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-[32px] font-black text-gray-900 tracking-tight">{t('nav.statistics', 'Statistiche')}</h1>
                <p className="text-gray-500 font-medium text-sm mt-1">{t('statistics.subtitle', 'Monitora le performance dei tuoi CV')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-xl bg-green-50 text-green-500 flex items-center justify-center">
                            <FiEye size={20} />
                        </div>
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{t('dashboard.views', 'VISUALIZZAZIONI')}</span>
                    </div>
                    <div className="mt-4">
                        <div className="text-3xl font-black text-gray-900">245</div>
                        <div className="text-xs text-green-500 font-bold mt-1">+18% {t('dashboard.fromLastWeek', 'da settimana scorsa')}</div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
                            <FiDownload size={20} />
                        </div>
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{t('dashboard.downloads', 'DOWNLOAD')}</span>
                    </div>
                    <div className="mt-4">
                        <div className="text-3xl font-black text-gray-900">89</div>
                        <div className="text-xs text-green-500 font-bold mt-1">+11% {t('dashboard.fromLastWeek', 'da settimana scorsa')}</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <FiBarChart2 className="text-gray-400" size={24} />
                    <h3 className="text-lg font-bold text-gray-900">{t('statistics.chartTitle', 'Andamento nel tempo')}</h3>
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-100 border-dashed">
                    <p className="text-gray-500 font-medium">{t('statistics.noData', 'Dati insufficienti per generare il grafico completo')}</p>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;
