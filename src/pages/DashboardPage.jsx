import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FiPlus, FiUpload, FiFileText, FiEye, 
    FiDownload, FiArrowUpRight, FiChevronRight, 
    FiCheck, FiGrid, FiMail, FiHelpCircle, FiLock, FiStar
} from 'react-icons/fi';
import { useCV } from '../contexts/CVContext';
import { ROUTES } from '../utils/constants';
import Button from '../components/Button';
import Modal from '../components/Modal';
import api from '../lib/api';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import ImportCVModal from '../components/ImportCVModal';
import LanguageSelector from '../components/LanguageSelector';
import { useTranslation } from 'react-i18next';

const DashboardPage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { cvList, deleteCV, duplicateCV, loadCV, loading, createCV, setCurrentCV } = useCV();
    const { hasPurchased, isAuthenticated, credits, refreshProfile } = useAuth();
    
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [cvToDelete, setCvToDelete] = useState(null);
    const [backendStatus, setBackendStatus] = useState('');
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);

    // [All the useEffects and handlers from original]
    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const shouldStartFree = urlParams.get('start_free') === 'true';
        if (shouldStartFree && isAuthenticated && !loading) {
            window.history.replaceState({}, document.title, window.location.pathname);
            const startFreeFlow = async () => {
                try {
                    const newCV = await createCV('modern-1');
                    navigate(`${ROUTES.EDITOR}/${newCV.id}`);
                } catch (error) {
                    console.error('Auto-creation failed:', error);
                }
            };
            startFreeFlow();
        }
    }, [isAuthenticated, loading, createCV, navigate]);

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const isPaymentSuccess = urlParams.get('payment') === 'success';
        if (isPaymentSuccess && isAuthenticated) {
            window.history.replaceState({}, document.title, window.location.pathname);
            toast.success(t('pricing.checkout.successTitle') || 'Payment successful!');
            refreshProfile();
        }
    }, [isAuthenticated, refreshProfile, t]);

    const testBackend = async () => {
        try {
            const response = await api.get('/test');
            setBackendStatus('Success');
            toast.success('Backend Connected!');
        } catch (error) {
            setBackendStatus('Error');
            toast.error('Backend Connection Failed');
        }
    };

    const handleCreateNew = () => navigate(ROUTES.TEMPLATES);
    const handleImportClick = () => {
        if (!hasPurchased) {
            toast.error(t('errors.importPremium', 'Importing is a premium feature.'));
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
            toast.success('CV Imported!');
        } catch (error) {
            toast.error('Import Failed');
        }
    };

    const handleEdit = (cvId) => {
        loadCV(cvId);
        navigate(`${ROUTES.EDITOR}/${cvId}`);
    };

    // [New Dashboard UI Elements]
    const renderStatChart = (color) => (
        <svg className={`w-16 h-8 text-${color}-500`} viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 35C10 35 15 15 25 15C35 15 40 25 50 25C60 25 65 5 75 5C85 5 90 20 100 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    const renderAreaChart = () => (
        <svg className="w-16 h-8 text-orange-400" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 35C10 35 15 20 25 20C35 20 40 25 50 25C60 25 65 10 75 10C85 10 90 15 100 15L100 40L0 40Z" fill="currentColor" fillOpacity="0.2"/>
            <path d="M0 35C10 35 15 20 25 20C35 20 40 25 50 25C60 25 65 10 75 10C85 10 90 15 100 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    const recentCVs = cvList.slice(0, 3);

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="text-[32px] font-black text-gray-900 tracking-tight">{t('dashboard.workspaceTitle', 'Il Mio Spazio di Lavoro')}</h1>
                    <p className="text-gray-500 font-medium text-sm mt-1">{t('dashboard.workspaceSubtitle', 'Crea e perfeziona il tuo percorso professionale 👋')}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <LanguageSelector />
                    {import.meta.env.DEV && (
                        <button onClick={testBackend} className="px-4 py-2 border border-blue-200 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors flex items-center gap-2">
                            <span className="font-mono text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">{'</>'}</span>
                            {t('dashboard.testBackend', 'Test Backend')}
                        </button>
                    )}
                    <div onClick={() => navigate(ROUTES.PRICING)} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors cursor-pointer flex items-center gap-2">
                        <span className="text-[10px]">💎</span>
                        {t('dashboard.yourCredits', 'I TUOI CREDITI:')} {credits}
                    </div>
                    <button onClick={handleImportClick} className="px-4 py-2 border border-blue-200 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors flex items-center gap-2">
                        <FiUpload />
                        {t('common.importCV', 'Importa CV')}
                    </button>
                    <button onClick={handleCreateNew} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/30">
                        <FiPlus />
                        {t('dashboard.newCV', 'Nuovo CV')}
                    </button>
                </div>
            </div>

            {/* Onboarding Cards */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t('dashboard.getStarted', 'Commencer')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group flex flex-col items-center text-center" onClick={handleCreateNew}>
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <FiPlus size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">1. {t('dashboard.onboarding.create', 'Créer votre CV')}</h3>
                        <p className="text-xs text-gray-500">{t('dashboard.onboarding.createDesc', "Partez de zéro ou utilisez l'IA")}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-purple-200 transition-all cursor-pointer group flex flex-col items-center text-center" onClick={() => navigate(ROUTES.TEMPLATES)}>
                        <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <FiGrid size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">2. {t('dashboard.onboarding.choose', 'Choisir un modèle')}</h3>
                        <p className="text-xs text-gray-500">{t('dashboard.onboarding.chooseDesc', 'Découvrez 50+ designs premium')}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-green-200 transition-all cursor-pointer group flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <FiDownload size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">3. {t('dashboard.onboarding.download', 'Télécharger en PDF')}</h3>
                        <p className="text-xs text-gray-500">{t('dashboard.onboarding.downloadDesc', "Prêt pour l'envoi aux recruteurs")}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Recent CVs & New Sections (2/3 width) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Recent CVs */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900">{t('dashboard.yourRecentCVs', 'Vos CV récents')}</h3>
                            <button onClick={handleCreateNew} className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                <FiPlus /> {t('dashboard.newCV', 'Nouveau')}
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {recentCVs.map((cv, i) => (
                                <div key={cv.id} className="group relative bg-gray-50/50 rounded-2xl p-4 border border-gray-100 hover:border-blue-200 hover:bg-white hover:shadow-md transition-all cursor-pointer" onClick={() => handleEdit(cv.id)}>
                                    <div className="flex gap-4 items-start">
                                        <div className="w-12 h-16 bg-white rounded shadow-sm border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-blue-500 group-hover:border-blue-200 transition-colors">
                                            <FiFileText size={20} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-gray-900 truncate">{cv.title === 'Untitled CV' ? t('dashboard.untitledCV', 'Untitled CV') : cv.title}</p>
                                            <p className="text-[11px] text-gray-500 mt-0.5">{t('dashboard.recentlyUpdated', 'Mis à jour récemment')}</p>
                                            <div className="mt-3 flex gap-2">
                                                <button className="text-[11px] font-bold px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 text-gray-600 transition-colors">{t('dashboard.edit', 'Éditer')}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {recentCVs.length === 0 && (
                                <div className="col-span-1 sm:col-span-2 text-center py-10 text-gray-400">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <FiFileText size={24} className="text-gray-300" />
                                    </div>
                                    <p className="font-medium text-gray-600">{t('dashboard.noRecentActivity', "Vous n'avez pas encore de CV.")}</p>
                                    <p className="text-sm mt-1">{t('dashboard.startCreating', 'Commencez par en créer un !')}</p>
                                    <button onClick={handleCreateNew} className="mt-4 px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors">
                                        {t('dashboard.createFirstCV', 'Créer mon premier CV')}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Lower Left Grid: Import Zone & Getting Started */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* CV Import Drop Zone */}
                        <div onClick={handleImportClick} className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-8 shadow-sm hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FiUpload size={28} />
                            </div>
                            <h3 className="text-base font-bold text-gray-900 mb-2">{t('dashboard.dragDropCV', 'Glissez-déposez votre CV ici')}</h3>
                            <p className="text-sm text-gray-500 mb-6">{t('dashboard.acceptedFormats', 'Formats acceptés : PDF, DOCX, DOC')}</p>
                            <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl group-hover:border-blue-300 group-hover:text-blue-600 transition-colors shadow-sm">
                                {t('dashboard.browseFiles', 'Parcourir les fichiers')}
                            </button>
                        </div>

                        {/* Getting Started Card */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-5">{t('dashboard.gettingStartedGuide', 'Guide de démarrage')}</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm shrink-0"><FiCheck /></div>
                                        <span className="text-sm font-medium text-gray-500 line-through">{t('dashboard.guideCreate', 'Créer votre CV')}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm shrink-0"><FiCheck /></div>
                                        <span className="text-sm font-medium text-gray-500 line-through">{t('dashboard.guideChoose', 'Choisir un modèle')}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center shrink-0"></div>
                                        <span className="text-sm font-medium text-gray-500">{t('dashboard.guideDownload', 'Télécharger votre CV PDF')}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center shrink-0"></div>
                                        <span className="text-sm font-medium text-gray-500">{t('dashboard.guideCustomize', 'Personnaliser votre CV')}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Progression context */}
                            <div className="mt-6 pt-4 border-t border-gray-50">
                                <p className="text-xs text-gray-400">{t('dashboard.completeSteps', 'Complétez ces étapes pour maximiser vos chances de réussite.')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Actions (1/3 width) */}
                <div className="space-y-6">
                    {/* Primary Actions */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-900 mb-4">{t('dashboard.quickActionsTitle', 'Actions Rapides')}</h3>
                        <div className="space-y-3">
                            <button onClick={handleCreateNew} className="w-full flex items-center justify-between p-3.5 rounded-xl border border-blue-100 bg-blue-50/50 hover:bg-blue-50 text-blue-700 font-bold text-sm transition-colors group shadow-[0_2px_10px_rgba(37,99,235,0.05)] hover:shadow-[0_4px_12px_rgba(37,99,235,0.1)]">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center"><FiPlus /></div>
                                    {t('dashboard.createNewCV', 'Créer un nouveau CV')}
                                </div>
                                <FiChevronRight className="text-blue-300 group-hover:text-blue-600" />
                            </button>
                            
                            <button onClick={() => navigate(ROUTES.TEMPLATES)} className="w-full flex items-center justify-between p-3.5 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-sm transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center"><FiGrid /></div>
                                    {t('dashboard.chooseTemplate', 'Choisir un modèle')}
                                </div>
                                <FiChevronRight className="text-gray-300 group-hover:text-gray-600" />
                            </button>

                            <button onClick={handleImportClick} className="w-full flex items-center justify-between p-3.5 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-sm transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center"><FiUpload /></div>
                                    {t('dashboard.importCV', 'Importer un CV')}
                                </div>
                                <FiChevronRight className="text-gray-300 group-hover:text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Import CV Modal */}
            <ImportCVModal 
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onImportSuccess={handleImportSuccess}
            />
        </div>
    );
};

export default DashboardPage;
