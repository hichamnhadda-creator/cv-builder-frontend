import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiCheck, FiStar, FiLock, FiPlayCircle } from 'react-icons/fi';
import { TEMPLATES, getTemplatesByCategory } from '../utils/templateData';
import { TEMPLATE_CATEGORIES, ROUTES } from '../utils/constants';
import { useCV } from '../contexts/CVContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import Button from '../components/Button';
import PaymentModal from '../components/PaymentModal';
import TemplateThumbnail from '../components/TemplateThumbnail';

const TemplatesPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { createCV } = useCV();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const filteredTemplates = getTemplatesByCategory(selectedCategory);

    const categories = [
        { id: 'all', label: t('templates.all') },
        { id: 'modern', label: t('templates.modern') },
        { id: 'classic', label: t('templates.classic') },
        { id: 'creative', label: t('templates.creative') },
        { id: 'minimal', label: t('templates.minimal') }
    ];

    const handleUseTemplate = (templateId) => {
        const newCV = createCV(templateId);
        navigate(`${ROUTES.EDITOR}/${newCV.id}`);
    };

    return (
        <div className="min-h-screen bg-off-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-primary-800">{t('templates.title')}</h1>
                            <p className="text-gray-500 mt-1">{t('templates.subtitle')}</p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => navigate(ROUTES.DASHBOARD)}
                        >
                            {t('templates.backToDashboard')}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Category Filters */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${selectedCategory === category.id
                                ? 'bg-primary-800 text-white border-primary-800 shadow-sm'
                                : 'bg-white text-gray-500 hover:border-gray-300 border-gray-200'
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Templates Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 pb-10 md:pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTemplates.map((template) => {
                        return (
                            <div
                                key={template.id}
                                className={`group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer ${selectedTemplate === template.id ? 'ring-2 ring-primary-800 shadow-lg' : ''
                                    }`}
                                onClick={() => handleUseTemplate(template.id)}
                            >
                                {/* Live Preview Container */}
                                <div className="relative w-full aspect-[1/1.414] bg-white overflow-hidden rounded-t-xl border-b border-gray-50">
                                    <TemplateThumbnail templateId={template.id} />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-primary-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="bg-white text-primary-900 px-6 py-2 rounded-full font-bold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                            {t('templates.chooseTemplate')}
                                        </div>
                                    </div>
                                </div>

                                {/* Template Info */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="font-bold text-gray-800 text-lg mb-1">
                                        {t(`templates.items.${template.id}.name`, { defaultValue: template.name })}
                                    </h3>
                                    <p className="text-sm text-gray-400 line-clamp-2 mb-6">
                                        {t(`templates.items.${template.id}.description`, { defaultValue: template.description })}
                                    </p>

                                    <div className="mt-auto">
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUseTemplate(template.id);
                                            }}
                                            variant="secondary"
                                            fullWidth
                                        >
                                            {t('templates.startWithThis')}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredTemplates.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-5xl mb-4 text-gray-300">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('templates.noTemplatesFound')}</h3>
                        <p className="text-gray-400">{t('templates.tryDifferentCategory')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TemplatesPage;
