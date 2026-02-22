import React from 'react';
import { TEMPLATES } from '../../utils/templateData';
import ModernTemplate from '../cv-templates/ModernTemplate';
import ClassicTemplate from '../cv-templates/ClassicTemplate';
import CreativeTemplate from '../cv-templates/CreativeTemplate';
import MinimalTemplate from '../cv-templates/MinimalTemplate';

const CVPreview = ({ cvData }) => {
    if (!cvData) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-8 h-full flex items-center justify-center">
                <p className="text-gray-500">No CV data to preview</p>
            </div>
        );
    }

    // Determine which template component to use based on templateId
    const getTemplateComponent = () => {
        // You might store just 'modern-1', 'classic-1' etc. 
        // We can check the category or specific ID
        const templateId = cvData.templateId || 'modern-1';

        // Simple mapping based on ID prefix or category
        if (templateId.includes('modern')) return ModernTemplate;
        if (templateId.includes('classic')) return ClassicTemplate;
        if (templateId.includes('creative')) return CreativeTemplate;
        if (templateId.includes('minimal')) return MinimalTemplate;

        return ModernTemplate; // Default
    };

    const TemplateComponent = getTemplateComponent();

    return (
        <div className="w-full bg-white break-words">
            <TemplateComponent
                data={cvData}
                customization={cvData.customization}
            />
        </div>
    );
};

export default CVPreview;
