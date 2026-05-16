import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSave, FiDownload, FiArrowLeft, FiCheck, FiLock, FiUploadCloud, FiStar, FiFileText } from 'react-icons/fi';
import { useCV } from '../contexts/CVContext';
import { ROUTES } from '../utils/constants';
import { exportToPDF } from '../utils/exportHelpers';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

// Import editor components
import PersonalInfoSection from '../components/editor/PersonalInfoSection';
import SkillsSection from '../components/editor/SkillsSection';
import ProjectsSection from '../components/editor/ProjectsSection';
import ExperienceSection from '../components/editor/ExperienceSection';
import EducationSection from '../components/editor/EducationSection';
import CertificationsSection from '../components/editor/CertificationsSection';
import LanguagesSection from '../components/editor/LanguagesSection';

import DesignSection from '../components/editor/DesignSection';
import CVPreview from '../components/editor/CVPreview';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import ErrorBoundary from '../components/ErrorBoundary';

import PaymentModal from '../components/PaymentModal';
import CoverLetterModal from '../components/CoverLetterModal';
import ImportCVModal from '../components/ImportCVModal';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { canUseTemplate } from '../utils/planHelper';
import { TEMPLATES } from '../utils/templateData';
import api from '../lib/api';

const EditorPage = () => {
    const { t } = useTranslation();
    const { cvId } = useParams();
    const navigate = useNavigate();
    const { currentCV, cvList, loading, loadCV, updateSection, updateCV, updateCustomization, saveCV, hasUnsavedChanges } = useCV();
    const { credits, updateUser, syncUserLocal, user, hasPurchased } = useAuth();

    const [isSaving, setIsSaving] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isCoverLetterModalOpen, setIsCoverLetterModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);

    const template = currentCV ? TEMPLATES.find(t => t.id === currentCV.templateId) : null;

    useEffect(() => {
        if (!loading) {
            if (!currentCV || currentCV.id !== cvId) {
                if (cvId) {
                    const found = cvList.find(c => c.id === cvId);
                    if (found) {
                        // Verification: Can free user use this template?
                        const canAccess = canUseTemplate(user, found.templateId, TEMPLATES, credits, hasPurchased);
                        if (!canAccess) {
                            toast.error('This CV uses a premium template. Please upgrade to access it.');
                            navigate(ROUTES.DASHBOARD);
                            return;
                        }
                        loadCV(cvId);
                    } else {
                        // Not found in list, safely return to dashboard
                        navigate(ROUTES.DASHBOARD);
                    }
                } else {
                    navigate(ROUTES.DASHBOARD);
                }
            } else {
                // If currentCV is already loaded, verify it too (safety)
                const canAccess = canUseTemplate(user, currentCV.templateId, TEMPLATES, credits, hasPurchased);
                if (!canAccess) {
                    toast.error('This CV uses a premium template. Please upgrade to access it.');
                    navigate(ROUTES.DASHBOARD);
                }
            }
        }
    }, [cvId, currentCV, loading, cvList, navigate, loadCV, user, credits, hasPurchased]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await saveCV();
            toast.success('CV saved successfully!');
        } catch (error) {

            toast.error('Failed to save CV');
        } finally {
            setIsSaving(false);
        }
    };

    const proceedWithExport = async () => {
        setIsExporting(true);
        try {
            const template = TEMPLATES.find(t => t.id === currentCV.templateId) || TEMPLATES[0];
            const isFreeTemplate = template.id === 'modern-1';
            
            console.log(`[Export] START: template=${template.id}, isFree=${isFreeTemplate}`);

            // Always call backend to either deduct credits OR increment free export count
            const res = await api.post('/cvs/deduct-credit', 
                { templateId: currentCV.templateId },
                { withCredentials: true }
            );
            
            if (res.status !== 200) {
                throw new Error(res.data.error || 'Export verification failed');
            }
            
            const data = res.data;
            if (isFreeTemplate) {
                console.log(`[Export] FREE SUCCESS: newCount=${data.freeExportCount}`);
                syncUserLocal({ freeExportCount: data.freeExportCount });
            } else {
                console.log(`[Export] PREMIUM DEDUCT SUCCESS: remaining=${data.remainingCredits}`);
                syncUserLocal({ credits: data.remainingCredits });
            }
            
            // Generate PDF
            console.log(`[Export] PDF: Generating...`);
            const result = await exportToPDF(currentCV, 'cv-preview-container');
            if (result.success) {
                console.log(`[Export] PDF SUCCESS: ${result.fileName}`);
                if (isFreeTemplate) {
                    toast.success(`CV exported as ${result.fileName} (Free limit used)`);
                } else {
                    toast.success(`CV exported as ${result.fileName} (5 credits deducted)`);
                }
            } else {
                console.error(`[Export] PDF FAILED`);
                toast.error('Failed to generate PDF');
            }
        } catch (error) {
            console.error('[Export] FATAL ERROR:', error);
            const errorMsg = error.response?.data?.error || error.message || 'Failed to export CV';
            
            if (error.response?.status === 403) {
                if (error.response?.data?.limitReached) {
                    setIsPaymentModalOpen(true);
                } else if (error.response?.data?.insufficientCredits) {
                    setIsPaymentModalOpen(true);
                }
            }
            
            toast.error(errorMsg);
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportClick = () => {
        const template = TEMPLATES.find(t => t.id === currentCV.templateId) || TEMPLATES[0];
        const isFree = template.id === 'modern-1';
        
        const numericCredits = Number(credits || 0);
        const freeUsed = Number(user?.freeExportCount || 0);
        
        console.log(`[Editor] Export Clicked. Template: ${template.id}, isFree: ${isFree}, Credits: ${numericCredits}, FreeUsed: ${freeUsed}`);
        
        if (isFree) {
            // STRICT BLOCK: If 1 or more exports used and NOT a pro user
            if (freeUsed >= 1 && !hasPurchased) {
                setIsPaymentModalOpen(true);
                return;
            }
            proceedWithExport();
        } else if (numericCredits >= 5 || user?.hasPurchased) {
            proceedWithExport();
        } else {
            setIsPaymentModalOpen(true);
        }
    };

    const handleTitleChange = (e) => {
        updateCV({ title: e.target.value });
    };

    const handleImportSuccess = (importedData) => {
        updateCV(importedData);
        toast.success('CV imported successfully!');
    };

    if (loading || !currentCV) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-off-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-800"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-off-white">

            {/* Top Bar */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="w-full px-4 md:px-6 py-3 md:py-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                            <Button
                                variant="ghost"
                                onClick={() => navigate(ROUTES.DASHBOARD)}
                                icon={<FiArrowLeft />}
                                className="h-9 w-9 p-0 flex-shrink-0"
                            />
                            
                            <div className="h-6 w-[1px] bg-gray-200 flex-shrink-0"></div>

                            <div className="flex items-center gap-2 min-w-0">
                                <input
                                    type="text"
                                    value={currentCV.title === 'Untitled CV' ? '' : currentCV.title}
                                    onChange={handleTitleChange}
                                    className="text-base font-bold text-primary-800 border-none focus:outline-none bg-transparent rounded w-[120px] md:w-[180px] truncate"
                                    placeholder={t('common.untitledCV')}
                                />

                                {hasUnsavedChanges ? (
                                    <span className="text-[9px] font-black text-amber-500 uppercase tracking-tighter bg-amber-50 px-2 py-1 rounded-md border border-amber-100 flex-shrink-0 hidden sm:inline-block">
                                        {t('common.changesUnsaved')}
                                    </span>
                                ) : (
                                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 flex-shrink-0 hidden sm:inline-block">
                                        {t('common.allSaved')}
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3 flex-shrink-0">
                            {/* Free/Premium Info */}
                            {!hasPurchased && currentCV?.templateId === 'modern-1' ? (
                                <div 
                                    className="hidden sm:flex items-center gap-3 h-[44px] px-4 bg-white rounded-xl border border-blue-100 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300 group"
                                    onClick={() => setIsPaymentModalOpen(true)}
                                >
                                    <div className="flex flex-col items-start leading-none gap-1">
                                        <span className="text-[9px] font-black uppercase tracking-tighter text-blue-400 group-hover:text-blue-600 transition-colors">
                                            {t('common.free')}
                                        </span>
                                        <span className={`text-[14px] font-black ${user?.freeExportCount >= 1 ? 'text-red-500' : 'text-blue-800'}`}>
                                            {user?.freeExportCount || 0}/1
                                        </span>
                                    </div>
                                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-[14px] shadow-inner group-hover:scale-110 transition-transform">
                                        ⭐
                                    </div>
                                </div>
                            ) : (
                                <div className="hidden sm:flex items-center gap-3 h-[44px] px-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                    <div className="flex flex-col items-start leading-none gap-1">
                                        <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400">
                                            {t('pricing.header.yourCredits')}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-[14px] font-black text-gray-800">{credits}</span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{t('pricing.credits')}</span>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center text-[14px] shadow-inner">
                                        💳
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4 items-center">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsImportModalOpen(true)}
                                    icon={<FiUploadCloud />}
                                    className="h-10 min-w-[130px] px-3 border-2 border-gray-100 text-[13px] text-gray-700 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/30 rounded-xl shadow-sm"
                                >
                                    {t('common.importCV')}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsCoverLetterModalOpen(true)}
                                    icon={<FiFileText />}
                                    className="h-10 min-w-[130px] px-3 border-2 border-gray-100 text-[13px] text-gray-700 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50/30 rounded-xl shadow-sm"
                                >
                                    {t('common.generateLetter')}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleSave}
                                    disabled={isSaving || !hasUnsavedChanges}
                                    icon={<FiSave />}
                                    className="h-10 min-w-[130px] px-3 border-2 border-gray-100 text-[13px] text-gray-700 hover:border-amber-600 hover:text-amber-600 hover:bg-amber-50/30 rounded-xl shadow-sm"
                                >
                                    {isSaving ? t('common.saving') : t('common.save')}
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={handleExportClick}
                                    disabled={isExporting}
                                    icon={<FiDownload />}
                                    className="h-10 min-w-[130px] px-4 border-2 border-blue-700 text-[13px] shadow-lg shadow-blue-100 rounded-xl"
                                >
                                    {isExporting ? t('common.exporting') : t('editor.export.pdf')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
            />

            <ImportCVModal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onImportSuccess={handleImportSuccess}
            />

            <CoverLetterModal
                isOpen={isCoverLetterModalOpen}
                onClose={() => setIsCoverLetterModalOpen(false)}
                cvData={currentCV}
                cvId={cvId}
            />

            {/* Premium Upgrade Banner for Free Users who reached limit */}
            {!hasPurchased && user?.freeExportCount >= 1 && (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100 py-3 px-6"
                >
                    <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                                <FiStar size={16} fill="currentColor" />
                            </div>
                            <div>
                                <p className="text-amber-900 font-bold text-sm">{t('editor.freeLimitBanner.title')}</p>
                                <p className="text-amber-700 text-xs font-medium">{t('editor.freeLimitBanner.subtitle')}</p>
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            size="sm"
                            className="h-9 px-6 bg-amber-600 hover:bg-amber-700 shadow-amber-200 rounded-xl text-xs font-black whitespace-nowrap"
                            onClick={() => setIsPaymentModalOpen(true)}
                        >
                            {t('common.upgradeToPremium')}
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Main Content */}
            <div className="w-full py-4 md:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-start">
                    {/* Editor Sidebar */}
                    <div className="lg:col-span-5 space-y-8 overflow-y-auto px-4 md:px-6 lg:px-8 pr-2 relative" style={{ maxHeight: 'calc(100vh - 160px)' }}>
                        <DesignSection
                            customization={currentCV.customization}
                            updateCustomization={updateCustomization}
                        />

                        <PersonalInfoSection
                            data={currentCV.personalInfo}
                            onChange={(data) => updateSection('personalInfo', data)}
                        />

                        <SkillsSection
                            data={currentCV.skills}
                            onChange={(data) => updateSection('skills', data)}
                        />

                        <ProjectsSection
                            data={currentCV.projects}
                            onChange={(data) => updateSection('projects', data)}
                        />

                        <ExperienceSection
                            data={currentCV.experience}
                            onChange={(data) => updateSection('experience', data)}
                        />

                        <EducationSection
                            data={currentCV.education}
                            onChange={(data) => updateSection('education', data)}
                        />

                        <CertificationsSection
                            data={currentCV.certifications}
                            onChange={(data) => updateSection('certifications', data)}
                        />

                        <LanguagesSection
                            data={currentCV.languages}
                            onChange={(data) => updateSection('languages', data)}
                        />
                    </div>

                    {/* Preview Pane */}
                    <div className="lg:col-span-7 lg:sticky lg:top-28">
                        <div className="bg-gray-200/50 rounded-3xl overflow-hidden min-h-[calc(100vh-140px)]">
                            <div id="cv-preview-container" className="h-full w-full">
                                <ErrorBoundary>
                                    <CVPreview cvData={currentCV} />
                                </ErrorBoundary>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorPage;
