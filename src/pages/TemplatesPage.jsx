import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FiLock, FiInfo } from 'react-icons/fi';
import { TEMPLATES, getTemplatesByCategory } from '../utils/templateData';
import { ROUTES } from '../utils/constants';
import { useCV } from '../contexts/CVContext';
import { useAuth } from '../contexts/AuthContext';
import { getUserPlan, canUseTemplate, getLockedMessage } from '../utils/planHelper';
import Button from '../components/Button';
import TemplateThumbnail from '../components/TemplateThumbnail';
import PaymentModal from '../components/PaymentModal';

const TemplatesPage = () => {
    // We try to use useTranslation, if the user had it. I will keep it for compatibility.
    // Wait, the original code used: import { useTranslation } from 'react-i18next';
    const navigate = useNavigate();
    const { createCV } = useCV();
    const { user } = useAuth();
    
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const filteredTemplates = getTemplatesByCategory(selectedCategory);
    const plan = getUserPlan(user);

    const categories = [
        { id: 'all', label: 'All' },
        { id: 'modern', label: 'Modern' },
        { id: 'professional', label: 'Professional' },
        { id: 'creative', label: 'Creative' },
        { id: 'minimal', label: 'Minimal' },
        { id: 'dark', label: 'Dark' }
    ];

    const handleUseTemplate = (templateId, isLocked) => {
        console.log('Clicked template.id:', templateId);
        if (isLocked) {
            setIsPaymentModalOpen(true);
            return;
        }
        const newCV = createCV(templateId);
        navigate(`${ROUTES.EDITOR}/${newCV.id}`);
    };

    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900">Choose a Template</h1>
                    <p className="text-gray-500 mt-2">Pick a professional template and start building your resume</p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
                
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
                            Free plan: You can use 1 template.
                        </div>
                    )}
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                    {filteredTemplates.map((template) => {
                        const isLocked = !canUseTemplate(user, template.id, TEMPLATES);
                        
                        return (
                            <div
                                key={template.id}
                                className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-200 flex flex-col relative cursor-pointer hover:-translate-y-2`}
                                onClick={() => handleUseTemplate(template.id, isLocked)}
                            >
                                {/* Premium Badge */}
                                {template.isPremium && (
                                    <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-md transform transition-transform group-hover:scale-110">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        PRO
                                    </div>
                                )}
                                {/* Preview Image Area */}
                                <div className="relative w-full aspect-[1/1.414] bg-gray-50 overflow-hidden">
                                    <div className={`w-full h-full pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105 ${isLocked ? 'blur-md grayscale opacity-50' : ''}`}>
                                        <TemplateThumbnail templateId={template.id} />
                                    </div>

                                    {/* Lock Overlay */}
                                    {isLocked && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/30 backdrop-blur-sm z-10 transition-opacity duration-300">
                                            <div className="bg-white/90 p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] mb-4 border border-white">
                                                <FiLock className="w-8 h-8 text-slate-800" />
                                            </div>
                                            <span className="bg-slate-900/90 backdrop-blur text-white px-5 py-2 rounded-full text-sm font-semibold shadow-xl border border-slate-700">
                                                {getLockedMessage()}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Card Details */}
                                <div className="p-5 flex flex-col gap-4 border-t border-gray-100 bg-white relative z-20">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-gray-900 text-lg tracking-tight">
                                            {template.name}
                                        </h3>
                                    </div>
                                    
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold uppercase tracking-wider">
                                            {template.category}
                                        </span>
                                        <button
                                            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 \${
                                                isLocked 
                                                    ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' 
                                                    : 'bg-blue-50 text-blue-600 hover:bg-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30'
                                            }`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUseTemplate(template.id, isLocked);
                                            }}
                                        >
                                            {isLocked ? 'Unlock Template' : 'Use Template'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredTemplates.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">No templates found</h3>
                        <p className="text-gray-500">Try selecting a different category.</p>
                    </div>
                )}
            </div>

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
            />
        </div>
    );
};

export default TemplatesPage;
