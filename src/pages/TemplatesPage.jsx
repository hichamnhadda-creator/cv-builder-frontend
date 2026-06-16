import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { FiLock, FiInfo, FiStar, FiFileText, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { TEMPLATES, INDUSTRY_CATEGORIES, getTemplatesByIndustry } from '../utils/templateData';
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
    
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [selectedTemplateForImport, setSelectedTemplateForImport] = useState(null);

    const filteredTemplates = selectedIndustry ? getTemplatesByIndustry(selectedIndustry, selectedCategory) : [];
    const plan = getUserPlan(user);

    const styleCategories = [
        { id: 'all', label: t('templates.all', 'All Styles') },
        { id: 'modern', label: t('templates.modern', 'Modern') },
        { id: 'professional', label: t('templates.professional', 'Professional') },
        { id: 'creative', label: t('templates.creative', 'Creative') },
        { id: 'minimal', label: t('templates.minimal', 'Minimalist') },
        { id: 'dark', label: t('templates.dark', 'Dark') },
        { id: 'ats', label: t('templates.ats', 'ATS Friendly') },
        { id: 'designer', label: t('templates.designer', 'Designer') },
        { id: 'tech', label: t('templates.tech', 'Tech') },
        { id: 'executive', label: t('templates.executive', 'Executive') }
    ];

    const handleUseTemplate = async (templateId) => {
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

    const getTemplatesCountForIndustry = (indId) => {
        if (indId === 'all') return TEMPLATES.length;
        return TEMPLATES.filter(t => t.industries && t.industries.includes(indId)).length;
    };

    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="w-full px-4 md:px-8 py-8">
                    {!selectedIndustry ? (
                        <>
                            <h1 className="text-3xl font-bold text-gray-900">{t('templates.chooseProfession', 'Choose Your Profession')}</h1>
                            <p className="text-gray-500 mt-2">{t('templates.professionSubtitle', 'Select your field to find templates tailored specifically for your career path.')}</p>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => {
                                    setSelectedIndustry(null);
                                    setSelectedCategory('all');
                                }}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            >
                                <FiArrowLeft size={20} />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {t(`templates.categories.${selectedIndustry}.title`, INDUSTRY_CATEGORIES.find(c => c.id === selectedIndustry)?.title)} {t('templates.templates', 'Templates')}
                                </h1>
                                <p className="text-gray-500 mt-2">{t('templates.subtitle', 'Pick a professional template and start building your resume')}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full px-4 md:px-8 py-8">
                
                {!selectedIndustry ? (
                    <>
                        {/* Start for Free Banner */}
                        <div className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
                            <div className="absolute right-40 -bottom-20 w-80 h-80 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
                            
                            <div className="max-w-xl relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm border border-white/10">
                                    <FiStar className="text-yellow-300" /> {t('templates.freePlan', 'Plan Gratuit')}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('templates.startForFree', 'Commencer gratuitement')}</h2>
                                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                                    {t('templates.freeDesc', 'Créez votre premier CV professionnel sans rien payer. Notre modèle standard est optimisé pour passer les systèmes ATS et impressionner les recruteurs.')}
                                </p>
                                <Button 
                                    onClick={() => handleUseTemplate('modern-1')}
                                    className="bg-white text-blue-600 hover:bg-gray-50 border-none px-8 py-4 text-lg font-bold rounded-xl shadow-lg transition-transform hover:-translate-y-1 flex items-center justify-center w-full md:w-auto"
                                >
                                    {t('templates.useFreeTemplate', 'Créer mon CV Gratuit')} <FiArrowRight className="ml-2" />
                                </Button>
                            </div>
                            
                            <div className="w-full md:w-1/3 lg:w-1/4 max-w-[280px] relative z-10 hidden md:block">
                                <motion.div 
                                    whileHover={{ scale: 1.05, rotate: 2 }}
                                    className="bg-white rounded-2xl p-2 shadow-2xl transform rotate-3 transition-transform cursor-pointer"
                                    onClick={() => handleUseTemplate('modern-1')}
                                >
                                    <div className="aspect-[3/4.2] relative overflow-hidden rounded-xl border border-gray-100">
                                        <div className="w-full h-full pointer-events-none">
                                            <TemplateThumbnail templateId="modern-1" categoryId="general" />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Step 1: Industry Categories Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
                        {INDUSTRY_CATEGORIES.map((cat) => {
                            const count = getTemplatesCountForIndustry(cat.id);
                            return (
                                <motion.div
                                    key={cat.id}
                                    whileHover={{ y: -5 }}
                                    onClick={() => setSelectedIndustry(cat.id)}
                                    className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-blue-500 cursor-pointer transition-all duration-300 flex flex-col h-full group"
                                >
                                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 transform origin-left">
                                        {cat.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{t(`templates.categories.${cat.id}.title`, cat.title)}</h3>
                                    <p className="text-sm text-gray-500 flex-grow mb-6 leading-relaxed">
                                        {t(`templates.categories.${cat.id}.desc`, cat.description)}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                            {t('templates.count', { count, defaultValue: `${count} Templates` })}
                                        </span>
                                        <FiArrowRight className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                    </>
                ) : (
                    /* Step 2: Templates for selected industry */
                    <>
                        {/* Tabs & Banner */}
                        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8">
                            {/* Category Filters */}
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                                {styleCategories.map((category) => (
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
                                        className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-500 transition-all duration-500 overflow-hidden cursor-pointer"
                                        onClick={() => handleUseTemplate(template.id)}
                                    >
                                        {/* Template Preview area */}
                                        <div className="aspect-[3/4.2] bg-gray-50 flex items-center justify-center relative overflow-hidden">
                                            <div className="w-full h-full pointer-events-none transition-all duration-700 ease-out group-hover:scale-105">
                                                <TemplateThumbnail templateId={template.id} categoryId={selectedIndustry || 'general'} />
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
                                                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/60 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                    <div className="text-center w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                        <Button
                                                            variant="primary"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleUseTemplate(template.id);
                                                            }}
                                                            className="bg-white text-blue-900 hover:bg-gray-100 border-none shadow-xl"
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
                                                <h3 className="font-bold text-gray-900 tracking-tight">{template.name}</h3>
                                                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mt-1">
                                                    {t(`templates.styles.${template.category}`, template.category)} Style
                                                </p>
                                            </div>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${canUse ? 'bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600' : 'bg-amber-50 text-amber-500'}`}>
                                                {canUse ? <FiArrowRight /> : <FiLock size={14} />}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Empty State */}
                        {filteredTemplates.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-2xl mx-auto mt-10">
                                <div className="text-5xl mb-6">🔍</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('templates.noTemplatesFound', 'No templates found for this style')}</h3>
                                <p className="text-gray-500 max-w-md mx-auto">{t('templates.tryDifferentCategory', 'Try selecting a different style like Modern or Creative, or choose "All Styles" to see more options.')}</p>
                                <Button 
                                    className="mt-6"
                                    onClick={() => setSelectedCategory('all')}
                                >
                                    View All Styles
                                </Button>
                            </div>
                        )}
                    </>
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
