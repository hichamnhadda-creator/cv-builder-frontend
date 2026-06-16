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
                            toast.error(t('errors.premiumTemplateError', 'This CV uses a premium template. Please upgrade to access it.'));
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
                    toast.error(t('errors.premiumTemplateError', 'This CV uses a premium template. Please upgrade to access it.'));
                    navigate(ROUTES.DASHBOARD);
                }
            }
        }
    }, [cvId, currentCV, loading, cvList, navigate, loadCV, user, credits, hasPurchased]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await saveCV();
            toast.success(t('success.saved', 'CV saved successfully!'));
        } catch (error) {
            const errorMsg = error.response?.data?.error || error.message || 'Failed to save CV';
            toast.error(errorMsg);
            if (error.response?.status === 403 && error.response?.data?.premiumRequired) {
                setIsPaymentModalOpen(true);
            }
        } finally {
            setIsSaving(false);
        }
    };

    const proceedWithExport = async () => {
        if (isExporting) return;
        setIsExporting(true);

        try {
            console.log(`[Export] Starting client-side PDF generation...`);
            
            // 1. Generate the PDF client-side first (do NOT trigger download yet)
            const result = await exportToPDF(currentCV, 'cv-export-container', { triggerDownload: false });
            
            if (!result || !result.success || !result.pdf) {
                throw new Error(result?.error || 'PDF rendering failed. Please try again.');
            }
            
            console.log(`[Export] PDF successfully rendered client-side. Deducting credits...`);

            // 2. Call backend to atomically deduct credits using PostgreSQL RPC deduct_credits
            const res = await api.post('/cvs/deduct-credit', 
                { templateId: currentCV.templateId },
                { withCredentials: true }
            );
            
            if (res.status !== 200) {
                throw new Error(res.data.error || 'Credit deduction failed. Download cancelled.');
            }
            
            const data = res.data;
            console.log(`[Export] Credit deduction successful. Remaining credits: ${data.remainingCredits}`);
            
            // 3. Sync credits balance in client state
            syncUserLocal({ credits: data.remainingCredits });
            
            // 4. Trigger file download now that credit is securely deducted
            result.pdf.save(result.fileName);
            toast.success(`CV exported as ${result.fileName} (5 credits deducted)`);
            
        } catch (error) {
            console.error('[Export] Fatal error during export:', error);
            const errorMsg = error.response?.data?.error || error.message || 'Failed to export CV';
            
            if (error.response?.status === 403 && error.response?.data?.insufficientCredits) {
                setIsPaymentModalOpen(true);
            }
            
            toast.error(errorMsg);
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportClick = () => {
        // Prevent duplicate calls if clicked rapidly
        if (isExporting) {
            console.log('[Editor] Export in progress. Duplicate click blocked.');
            return;
        }

        const numericCredits = Number(credits || 0);
        console.log(`[Editor] Export Clicked. Available Credits: ${numericCredits}`);
        
        // Strict protection check: each export costs exactly 5 credits
        if (numericCredits >= 5) {
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
        toast.success(t('success.cvImported', 'CV imported successfully!'));
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
            <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
                <div className="w-full px-2 sm:px-4 lg:px-6 py-2.5">
                    <div className="flex items-center justify-between gap-3">
                        
                        {/* Left Section (Navigation & Title) */}
                        <div className="flex items-center gap-1 sm:gap-3 min-w-0">
                            <Button
                                variant="ghost"
                                onClick={() => navigate(ROUTES.DASHBOARD)}
                                icon={<FiArrowLeft className="text-gray-700" size={18} />}
                                className="h-8 w-8 p-0 flex-shrink-0 hover:bg-gray-100 rounded-lg"
                            />
                            
                            <div className="h-5 w-[1px] bg-gray-200 flex-shrink-0 hidden sm:block"></div>

                            <div className="flex items-center gap-2 min-w-0">
                                <input
                                    type="text"
                                    value={currentCV.title === 'Untitled CV' ? '' : currentCV.title}
                                    onChange={handleTitleChange}
                                    className="text-sm sm:text-base font-bold text-gray-800 border-none focus:ring-0 focus:outline-none bg-transparent rounded w-[110px] sm:w-[150px] lg:w-[220px] truncate p-0 placeholder-gray-400 hover:bg-gray-50 transition-colors"
                                    placeholder={t('common.untitledCV')}
                                />

                                {hasUnsavedChanges ? (
                                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100 flex-shrink-0 hidden md:inline-flex items-center gap-1.5 max-w-[140px] lg:max-w-none">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse flex-shrink-0"></div>
                                        <span className="truncate">{t('common.changesUnsaved')}</span>
                                    </span>
                                ) : (
                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 flex-shrink-0 hidden md:inline-flex items-center gap-1 max-w-[140px] lg:max-w-none">
                                        <FiCheck size={12} className="flex-shrink-0" />
                                        <span className="truncate">{t('common.allSaved')}</span>
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        {/* Right Section (Actions) */}
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                            {/* Free/Premium Info */}
                            {!hasPurchased && currentCV?.templateId === 'modern-1' ? (
                                <div 
                                    className="hidden md:flex items-center gap-2 h-9 px-3 bg-white rounded-lg border border-blue-100 shadow-sm cursor-pointer hover:shadow hover:border-blue-200 transition-all group"
                                    onClick={() => setIsPaymentModalOpen(true)}
                                >
                                    <div className="flex flex-col items-end leading-none gap-0.5">
                                        <span className="text-[9px] font-black uppercase text-blue-500 group-hover:text-blue-600">
                                            {t('common.free')}
                                        </span>
                                        <span className={`text-[12px] font-black ${user?.freeExportCount >= 1 ? 'text-red-500' : 'text-blue-800'}`}>
                                            {user?.freeExportCount || 0}/1
                                        </span>
                                    </div>
                                    <div className="w-6 h-6 bg-blue-50 rounded flex items-center justify-center text-[12px]">
                                        ⭐
                                    </div>
                                </div>
                            ) : (
                                <div className="hidden sm:flex items-center gap-2 h-9 px-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight hidden lg:inline">{t('pricing.header.yourCredits')}</span>
                                    <div className="flex items-center bg-white px-2 py-0.5 rounded shadow-sm border border-gray-50">
                                        <span className="text-xs font-black text-blue-600">{credits}</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-2 items-center">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsImportModalOpen(true)}
                                    icon={<FiUploadCloud size={15} />}
                                    className="h-9 px-2.5 sm:px-3 border border-gray-200 text-[13px] font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg shadow-sm whitespace-nowrap hidden sm:flex"
                                >
                                    <span className="hidden xl:inline">{t('common.importCV')}</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsCoverLetterModalOpen(true)}
                                    icon={<FiFileText size={15} />}
                                    className="h-9 px-2.5 sm:px-3 border border-gray-200 text-[13px] font-medium text-gray-700 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg shadow-sm whitespace-nowrap hidden sm:flex"
                                >
                                    <span className="hidden xl:inline">{t('common.generateLetter')}</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleSave}
                                    disabled={isSaving || !hasUnsavedChanges}
                                    icon={<FiSave size={15} />}
                                    className="h-9 px-2.5 sm:px-3 border border-gray-200 text-[13px] font-medium text-gray-700 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg shadow-sm whitespace-nowrap"
                                >
                                    <span className="hidden lg:inline">{isSaving ? t('common.saving') : t('common.save')}</span>
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={handleExportClick}
                                    disabled={isExporting}
                                    icon={<FiDownload size={15} />}
                                    className="h-9 px-3 sm:px-4 border border-blue-600 bg-blue-600 text-white text-[13px] font-semibold hover:bg-blue-700 hover:border-blue-700 rounded-lg shadow-md whitespace-nowrap"
                                >
                                    <span className="hidden sm:inline">{isExporting ? t('common.exporting') : t('editor.export.pdf')}</span>
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
