import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSave, FiDownload, FiArrowLeft, FiCheck } from 'react-icons/fi';
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
import { useSubscription } from '../contexts/SubscriptionContext';

const EditorPage = () => {
    const { cvId } = useParams();
    const navigate = useNavigate();
    const { currentCV, cvList, loading, loadCV, updateSection, updateCV, updateCustomization, saveCV, hasUnsavedChanges } = useCV();
    const { isPremium, downloadCount, incrementDownloadCount } = useSubscription();

    const [isSaving, setIsSaving] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    useEffect(() => {
        if (!currentCV && !loading && cvId) {
            loadCV(cvId);
        }
    }, [cvId, loading, cvList]);

    useEffect(() => {
        if (!loading && !currentCV) {
            navigate(ROUTES.DASHBOARD);
        }
    }, [currentCV, loading, navigate]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            saveCV();
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
            const result = await exportToPDF(currentCV, 'cv-preview-container');
            if (result.success) {
                incrementDownloadCount();
                toast.success(`CV exported as ${result.fileName}`);
            } else {
                toast.error('Failed to export CV');
            }
        } catch (error) {
            toast.error('Failed to export CV');
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportClick = () => {
        if (isPremium) {
            proceedWithExport();
            return;
        }

        // Check download count
        if (downloadCount >= 1) {
            setIsPaymentModalOpen(true);
            toast('Free download limit reached. Please upgrade to continue.', { icon: '⭐' });
        } else {
            proceedWithExport();
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
                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4">
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

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
            />

            {/* Main Content */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-start">
                    {/* Editor Sidebar */}
                    <div className="lg:col-span-5 space-y-8 overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 160px)' }}>
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
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 md:p-4 shadow-sm overflow-x-auto">
                            <div
                                id="cv-preview-container"
                                className="bg-white shadow-2xl mx-auto w-full max-w-[210mm] min-h-[297mm] p-2 md:p-4"
                            >
                                <CVPreview cvData={currentCV} />
                            </div>

                            <div className="mt-4 flex justify-center">
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
                                    Live Print Preview (A4)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorPage;
