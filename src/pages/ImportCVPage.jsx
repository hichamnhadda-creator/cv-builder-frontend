import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import ImportCVModal from '../components/ImportCVModal';
import { useAuth } from '../contexts/AuthContext';
import { useCV } from '../contexts/CVContext';
import { ROUTES } from '../utils/constants';
import toast from 'react-hot-toast';
import api from '../lib/api';

const ImportCVPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { hasPurchased } = useAuth();
    const { createCV, setCurrentCV } = useCV();
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);

    const handleImportClick = () => {
        if (!hasPurchased) {
            toast.error(t('errors.importPremium', 'L\'importazione è una funzionalità premium.'));
            navigate(ROUTES.PRICING);
            return;
        }
        setIsImportModalOpen(true);
    };

    const handleImportSuccess = async (parsedData) => {
        try {
            const newCV = await createCV('modern-1');
            const mergedCV = {
                ...newCV,
                title: parsedData.personalInfo?.fullName ? `${parsedData.personalInfo.fullName}'s CV` : 'Imported CV',
                personalInfo: { ...newCV.personalInfo, ...(parsedData.personalInfo || {}) },
                experience: parsedData.experience || [],
                education: parsedData.education || [],
                skills: parsedData.skills || [],
                languages: parsedData.languages || [],
            };
            await api.put(`/cvs/${newCV.id}`, mergedCV);
            setCurrentCV(mergedCV);
            navigate(`${ROUTES.EDITOR}/${newCV.id}`);
            toast.success('CV Importato!');
        } catch (error) {
            toast.error('Importazione fallita');
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-[32px] font-black text-gray-900 tracking-tight">{t('nav.importCV', 'Importa CV')}</h1>
                <p className="text-gray-500 font-medium text-sm mt-1">{t('import.subtitle', 'Importa i tuoi dati da un CV esistente o da LinkedIn')}</p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-12 shadow-sm text-center">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiUpload size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('import.actionTitle', 'Pronto per importare il tuo CV?')}</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    {t('import.actionDesc', 'Carica il tuo file PDF. Il nostro sistema intelligente estrarrà tutte le tue informazioni e le formatterà in uno dei nostri bellissimi modelli.')}
                </p>
                <button 
                    onClick={handleImportClick}
                    className="px-6 py-3 bg-green-50 text-green-600 rounded-xl text-sm font-bold hover:bg-green-100 transition-colors inline-flex items-center gap-2"
                >
                    <FiUpload />
                    {t('dashboard.quickActions.importCV', 'Importa il tuo CV')}
                </button>
            </div>

            <ImportCVModal 
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onImportSuccess={handleImportSuccess}
            />
        </div>
    );
};

export default ImportCVPage;
