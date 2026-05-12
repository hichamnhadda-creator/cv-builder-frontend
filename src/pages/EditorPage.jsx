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

const EditorPage = () => {
    const { cvId } = useParams();
    const navigate = useNavigate();
    const { currentCV, cvList, loading, loadCV, updateSection, updateCV, updateCustomization, saveCV, hasUnsavedChanges } = useCV();
    const { credits, updateUser, user } = useAuth();

    const [isSaving, setIsSaving] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    // Precise locking logic
    const template = currentCV ? TEMPLATES.find(t => t.id === currentCV.templateId) : null;
    const isLocked = (currentCV && template) ? !canUseTemplate(user, currentCV.templateId, TEMPLATES) : false;

    useEffect(() => {
        if (currentCV && template) {
            console.log(`[Editor] Template Access Check:`, {
                id: currentCV.templateId,
                isFree: template.isFree || template.access === 'free',
                isPremium: template.isPremium,
                isLocked: isLocked
            });
        }
    }, [currentCV, template, isLocked]);

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
            const isFreeTemplate = template.isFree || template.access === 'free';
            
            console.log(`[Export] Starting export for template: ${template.id}`);
            console.log(`[Export] Template isFree: ${isFreeTemplate}`);

            if (!isFreeTemplate) {
                console.log(`[Export] Premium template detected. Deducting credits...`);
                const { data: { session } } = await supabase.auth.getSession();
                const res = await fetch(`${import.meta.env.VITE_API_URL}/cvs/deduct-credit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session?.access_token}`
                    },
                    body: JSON.stringify({ templateId: currentCV.templateId })
                });
                
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.error || 'Not enough credits');
                }
                const data = await res.json();
                updateUser({ credits: data.remainingCredits });
                console.log(`[Export] Credits deducted successfully. Remaining: ${data.remainingCredits}`);
            } else {
                console.log(`[Export] Free template detected. Bypassing credit check.`);
            }
            
            // Generate PDF
            const result = await exportToPDF(currentCV, 'cv-preview-container');
            if (result.success) {
                if (isFreeTemplate) {
                    toast.success(`CV exported as ${result.fileName}`);
                } else {
                    toast.success(`CV exported as ${result.fileName} (5 credits deducted)`);
                }
            } else {
                toast.error('Failed to export CV');
            }
        } catch (error) {
            console.error('[Export Error] Details:', error);
            toast.error(error.message || 'Failed to export CV');
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportClick = () => {
        const template = TEMPLATES.find(t => t.id === currentCV.templateId) || TEMPLATES[0];
        const isFree = template.isFree || template.access === 'free';
        
        console.log(`[Editor] Export Clicked. Template: ${template.id}, isFree: ${isFree}`);

        if (isFree) {
            proceedWithExport();
        } else if (credits >= 5) {
            proceedWithExport();
        } else {
            console.log(`[Editor] Premium template & low credits. Showing modal.`);
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
            {isLocked && (
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 px-4 text-center text-sm font-medium shadow-md relative z-20">
                    <div className="flex items-center justify-center gap-2">
                        <FiLock className="w-4 h-4" />
                        <span>You're previewing a <strong>Premium Template</strong>. Upgrade to edit and export this design.</span>
                        <button 
                            onClick={() => setIsPaymentModalOpen(true)}
                            className="ml-4 px-3 py-1 bg-white text-amber-600 rounded-full text-xs font-bold hover:bg-amber-50 transition-colors"
                        >
                            Upgrade Now
                        </button>
                    </div>
                </div>
            )}

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
                                onChange={isLocked ? undefined : handleTitleChange}
                                onClick={isLocked ? () => setIsPaymentModalOpen(true) : undefined}
                                readOnly={isLocked}
                                className={`text-lg font-medium text-primary-800 border-none focus:outline-none bg-transparent rounded ${isLocked ? 'cursor-pointer' : ''}`}
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
                                    onClick={isLocked ? () => setIsPaymentModalOpen(true) : handleSave}
                                    disabled={(!isLocked && (isSaving || !hasUnsavedChanges))}
                                    icon={<FiSave />}
                                >
                                    {isSaving ? 'Saving...' : 'Save'}
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={isLocked ? () => setIsPaymentModalOpen(true) : handleExportClick}
                                    disabled={!isLocked && isExporting}
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
                        {isLocked && (
                            <div 
                                className="absolute inset-0 z-50 bg-transparent cursor-pointer" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setIsPaymentModalOpen(true);
                                }}
                                title="Upgrade to Premium to edit this template"
                            />
                        )}
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
