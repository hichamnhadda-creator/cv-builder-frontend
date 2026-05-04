import React from 'react';
import { TemplateRenderer } from '../TemplateMapper';

const CVPreview = ({ cvData }) => {
    if (!cvData) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-8 h-full flex items-center justify-center">
                <p className="text-gray-500">No CV data to preview</p>
            </div>
        );
    }

    const headingFont = cvData.customization?.fonts?.heading || 'Poppins';
    const bodyFont = cvData.customization?.fonts?.body || 'Inter';

    return (
        <div 
            className="w-full bg-white break-words cv-template-wrapper"
            style={{ 
                '--cv-heading-font': headingFont,
                '--cv-body-font': bodyFont,
                fontFamily: bodyFont
            }}
        >
            <TemplateRenderer
                templateId={cvData.templateId || 'modern-1'}
                data={cvData}
                customization={cvData.customization}
            />
        </div>
    );
};

export default CVPreview;
