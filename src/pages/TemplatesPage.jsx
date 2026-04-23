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

const TemplatesPage = () => {
    // We try to use useTranslation, if the user had it. I will keep it for compatibility.
    // Wait, the original code used: import { useTranslation } from 'react-i18next';
    const navigate = useNavigate();
    const { createCV } = useCV();
    const { user } = useAuth();
    
    const [selectedCategory, setSelectedCategory] = useState('all');

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

    const handleUseTemplate = (templateId) => {
        if (!canUseTemplate(user, templateId, TEMPLATES)) return;
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
                                className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col relative ${
                                    isLocked ? 'cursor-not-allowed' : 'cursor-pointer hover:-translate-y-1'
                                }`}
                                onClick={() => !isLocked && handleUseTemplate(template.id)}
                            >
                                {/* Preview Image Area */}
                                <div className="relative w-full aspect-[1/1.414] bg-gray-50">
                                    <div className={`w-full h-full transition-all duration-300 \${isLocked ? 'blur-sm grayscale opacity-60' : ''}`}>
                                        <TemplateThumbnail templateId={template.id} />
                                    </div>

                                    {/* Lock Overlay */}
                                    {isLocked && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/20 backdrop-blur-[2px]">
                                            <div className="bg-white p-4 rounded-full shadow-lg mb-3">
                                                <FiLock className="w-6 h-6 text-gray-700" />
                                            </div>
                                            <span className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-md">
                                                {getLockedMessage()}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Card Details */}
                                <div className="p-5 flex flex-col gap-4 border-t border-gray-50">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-gray-900 text-base">
                                            {template.name}
                                        </h3>
                                    </div>
                                    
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium capitalize">
                                            {template.category}
                                        </span>
                                        <button
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors \${
                                                isLocked 
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100 group-hover:bg-blue-600 group-hover:text-white'
                                            }`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (!isLocked) handleUseTemplate(template.id);
                                            }}
                                            disabled={isLocked}
                                        >
                                            Use Template
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
        </div>
    );
};

export default TemplatesPage;
