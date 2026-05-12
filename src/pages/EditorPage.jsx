import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSave, FiDownload, FiArrowLeft, FiCheck, FiLock } from 'react-icons/fi';
import { useCV } from '../contexts/CVContext';
import { ROUTES } from '../utils/constants';
import { exportToPDF } from '../utils/exportHelpers';
import toast from 'react-hot-toast';

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
import Button from '../components/Button';

import PaymentModal from '../components/PaymentModal';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { canUseTemplate } from '../utils/planHelper';
import { TEMPLATES } from '../utils/templateData';
import api from '../lib/api';

const EditorPage = () => {
    const { cvId } = useParams();
    const navigate = useNavigate();
    const { currentCV, cvList, loading, loadCV, updateSection, updateCV, updateCustomization, saveCV, hasUnsavedChanges } = useCV();
    const { credits, updateUser, user } = useAuth();

    const [isSaving, setIsSaving] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const template = currentCV ? TEMPLATES.find(t => t.id === currentCV.templateId) : null;

    useEffect(() => {
        if (!loading) {
            if (!currentCV || currentCV.id !== cvId) {
                if (cvId) {
                    const found = cvList.find(c => c.id === cvId);
                    if (found) {
                        loadCV(cvId);
                    } else {
                        // Not found in list, safely return to dashboard
                        navigate(ROUTES.DASHBOARD);
                    }
                } else {
                    navigate(ROUTES.DASHBOARD);
                }
            }
        }
    }, [cvId, currentCV, loading, cvList, navigate, loadCV]);

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
            const isFreeTemplate = template.isFree || template.access === 'free' || template.isPremium === false;
            
            console.log(`[Export] START: template=${template.id}, isFree=${isFreeTemplate}`);

            if (!isFreeTemplate) {
                console.log(`[Export] PREMIUM: Calling backend deduct endpoint...`);
                const res = await api.post('/cvs/deduct-credit', 
                    { templateId: currentCV.templateId },
                    { withCredentials: true }
                );
                
                if (res.status !== 200) {
                    throw new Error(res.data.error || 'Credit deduction failed');
                }
                
                const data = res.data;
                console.log(`[Export] DEDUCT SUCCESS: remaining=${data.remainingCredits}`);
                
                // Update local state with the exact balance from backend
                updateUser({ credits: data.remainingCredits });
            } else {
                console.log(`[Export] FREE: Bypassing credit deduction.`);
            }
            
            // Generate PDF
            console.log(`[Export] PDF: Generating...`);
            const result = await exportToPDF(currentCV, 'cv-preview-container');
            if (result.success) {
                console.log(`[Export] PDF SUCCESS: ${result.fileName}`);
                if (isFreeTemplate) {
                    toast.success(`CV exported as ${result.fileName}`);
                } else {
                    toast.success(`CV exported as ${result.fileName} (5 credits deducted)`);
                }
            } else {
                console.error(`[Export] PDF FAILED`);
                toast.error('Failed to generate PDF');
            }
        } catch (error) {
            console.error('[Export] FATAL ERROR:', error.message);
            toast.error(error.message || 'Failed to export CV');
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportClick = () => {
        const template = TEMPLATES.find(t => t.id === currentCV.templateId) || TEMPLATES[0];
        const isFree = template.isFree || template.access === 'free' || template.isPremium === false;
        
        const numericCredits = Number(credits || 0);
        console.log(`[Editor] Export Clicked. Template: ${template.id}, isFree: ${isFree}, Current Credits: ${numericCredits}`);
        
        if (isFree) {
            console.log(`[Editor] Proceeding with free export.`);
            proceedWithExport();
        } else if (numericCredits >= 5) {
            console.log(`[Editor] Proceeding with premium export (balance check passed).`);
            proceedWithExport();
        } else {
            console.warn(`[Editor] Premium template & insufficient credits (${numericCredits}). Showing modal.`);
            setIsPaymentModalOpen(true);
        }
    };

    const handleTitleChange = (e) => {
        updateCV({ title: e.target.value });
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
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 flex-1">
                            <Button
                                variant="ghost"
                                onClick={() => navigate(ROUTES.DASHBOARD)}
                                icon={<FiArrowLeft />}
                            >
                                Dashboard
                            </Button>

                            <div className="h-6 w-[1px] bg-gray-200"></div>

                            <input
                                type="text"
                                value={currentCV.title}
                                onChange={handleTitleChange}
                                className="text-lg font-medium text-primary-800 border-none focus:outline-none bg-transparent rounded"
                                placeholder="Untitled CV"
                            />

                            {hasUnsavedChanges ? (
                                <span className="text-xs font-medium text-amber-500 uppercase tracking-wider">
                                    Changes Unsaved
                                </span>
                            ) : (
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    All Saved
                                </span>
                            )}
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-xl text-sm font-bold border border-primary-100 shadow-sm">
                                <span className="opacity-50 uppercase tracking-tighter text-[10px]">Your Balance</span>
                                <span>{credits} CR</span>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={handleSave}
                                    disabled={isSaving || !hasUnsavedChanges}
                                    icon={<FiSave />}
                                >
                                    {isSaving ? 'Saving...' : 'Save'}
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={handleExportClick}
                                    disabled={isExporting}
                                    icon={<FiDownload />}
                                >
                                    {isExporting ? 'Exporting...' : 'Export PDF'}
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
                                <CVPreview cvData={currentCV} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorPage;
