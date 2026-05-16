import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { FiLock, FiInfo, FiStar, FiFileText, FiArrowRight } from 'react-icons/fi';
import { TEMPLATES, getTemplatesByCategory } from '../utils/templateData';
import { ROUTES } from '../utils/constants';
import { useCV } from '../contexts/CVContext';
import { useAuth } from '../contexts/AuthContext';
import { getUserPlan, canUseTemplate } from '../utils/planHelper';
import Button from '../components/Button';
import TemplateThumbnail from '../components/TemplateThumbnail';
import PaymentModal from '../components/PaymentModal';
import ImportCVModal from '../components/ImportCVModal';
import toast from 'react-hot-toast';
import api from '../lib/api';


const TemplatesPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { createCV, setCurrentCV } = useCV();
    const { user, hasPurchased, credits } = useAuth();
    
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [selectedTemplateForImport, setSelectedTemplateForImport] = useState(null);

    const filteredTemplates = getTemplatesByCategory(selectedCategory);
    const plan = getUserPlan(user);

    const categories = [
        { id: 'all', label: t('templates.all', 'All') },
        { id: 'modern', label: t('templates.modern', 'Modern') },
        { id: 'professional', label: t('templates.professional', 'Professional') },
        { id: 'creative', label: t('templates.creative', 'Creative') },
        { id: 'minimal', label: t('templates.minimal', 'Minimal') },
        { id: 'dark', label: t('templates.dark', 'Dark') },
        { id: 'ats', label: t('templates.ats', 'ATS') },
        { id: 'designer', label: t('templates.designer', 'Designer') },
        { id: 'tech', label: t('templates.tech', 'Tech') },
        { id: 'executive', label: t('templates.executive', 'Executive') }
    ];

    const handleUseTemplate = async (templateId) => {
        // Enforce plan restrictions
        const canUse = canUseTemplate(user, templateId, TEMPLATES, credits, hasPurchased);
        
        if (!canUse) {
            toast.error('This is a premium template. Please upgrade to use it.');
            setIsPaymentModalOpen(true);
            return;
        }

        try {
            const newCV = await createCV(templateId);
            if (newCV && newCV.id) {
                navigate(`${ROUTES.EDITOR}/${newCV.id}`);
            }
        } catch (error) {
            console.error('Failed to create CV:', error);
            toast.error('Failed to create CV. Please try again.');
        }
    };

    const handleImportClick = (templateId) => {
        if (!hasPurchased && (credits || 0) <= 0) {
            toast.error('Importing an existing CV is a premium feature.');
            setIsPaymentModalOpen(true);
            return;
        }
        setSelectedTemplateForImport(templateId);
        setIsImportModalOpen(true);
    };

    const handleImportSuccess = async (parsedData) => {
        try {
            const newCV = await createCV(selectedTemplateForImport);
            
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
            toast.success('CV Imported Successfully!');
        } catch (error) {
            console.error('Failed to apply imported data:', error);
            toast.error('Failed to apply imported data to the template.');
        }
    };


    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="w-full px-4 md:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900">{t('templates.title', 'Choose a Template')}</h1>
                    <p className="text-gray-500 mt-2">{t('templates.subtitle', 'Pick a professional template and start building your resume')}</p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full px-4 md:px-8 py-8">
                
                {/* Tabs & Banner */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8">
                    {/* Category Filters */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                                    selectedCategory === category.id
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    {/* Free Plan Banner */}
                    {plan === 'free' && (
                        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2.5 rounded-lg border border-blue-100 text-sm font-medium whitespace-nowrap">
                            <FiInfo className="w-4 h-4 text-blue-600" />
                            {t('templates.freeLimit', 'Free plan: You can use exactly 1 free template.')}
                        </div>
                    )}
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20">
                    {filteredTemplates.map((template) => {
                        const canUse = canUseTemplate(user, template.id, TEMPLATES, credits, hasPurchased);
                        
                        return (
                            <motion.div
                                key={template.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -8 }}
                                className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-primary-800 transition-all duration-500 overflow-hidden cursor-pointer"
                                onClick={() => handleUseTemplate(template.id)}
                            >
                                {/* Template Preview area */}
                                <div className="aspect-[3/4.2] bg-gray-50 flex items-center justify-center relative overflow-hidden">
                                    <div className="w-full h-full pointer-events-none transition-all duration-700 ease-out group-hover:scale-105">
                                        <TemplateThumbnail templateId={template.id} />
                                    </div>

                                    {/* Status Badges */}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        {template.id === 'modern-1' ? (
                                            <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-tighter flex items-center gap-1 shadow-sm border border-green-200">
                                                {t('templates.free', 'Free Template')}
                                            </span>
                                        ) : template.isPremium && (
                                            <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-tighter flex items-center gap-1 shadow-sm border border-amber-200">
                                                <FiStar size={10} /> {t('templates.premium')}
                                            </span>
                                        )}
                                    </div>

                                    {/* Lock Overlay for non-accessible templates */}
                                    {!canUse && (
                                        <div className="absolute inset-0 bg-gray-900/20 flex flex-col items-center justify-center p-6 opacity-100 transition-all duration-500">
                                            <div className="w-12 h-12 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 mb-4 shadow-xl">
                                                <FiLock size={20} />
                                            </div>
                                            <span className="text-white font-bold text-xs uppercase tracking-widest bg-blue-600 px-3 py-1.5 rounded-lg shadow-lg">
                                                {t('templates.upgradeToUnlock') || 'Upgrade to Unlock'}
                                            </span>
                                        </div>
                                    )}

                                    {/* Hover Overlay for accessible templates */}
                                    {canUse && (
                                        <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/60 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <div className="text-center w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <Button
                                                    variant="primary"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleUseTemplate(template.id);
                                                    }}
                                                    className="bg-white text-primary-900 hover:bg-gray-100 border-none shadow-xl"
                                                >
                                                    {t('templates.useTemplate')}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Template Info */}
                                <div className="p-5 flex items-center justify-between bg-white border-t border-gray-50">
                                    <div>
                                        <h3 className="font-bold text-primary-900 tracking-tight">{template.name}</h3>
                                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">
                                            {t(`templates.${template.category.toLowerCase()}`, template.category)}
                                        </p>
                                    </div>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${canUse ? 'bg-gray-50 text-gray-300 group-hover:bg-primary-50 group-hover:text-primary-500' : 'bg-amber-50 text-amber-300'}`}>
                                        {canUse ? <FiArrowRight /> : <FiLock size={14} />}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredTemplates.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{t('templates.noTemplatesFound', 'No templates found')}</h3>
                        <p className="text-gray-500">{t('templates.tryDifferentCategory', 'Try selecting a different category.')}</p>
                    </div>
                )}
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
        </div>
    );
};

export default TemplatesPage;
