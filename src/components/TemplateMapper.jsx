import React, { lazy, Suspense } from 'react';

const ClassicTemplate = lazy(() => import('./cv-templates/ClassicTemplate'));
const SidebarTemplate = lazy(() => import('./cv-templates/SidebarTemplate'));
const ModernTemplate = lazy(() => import('./cv-templates/ModernTemplate'));
const MinimalTemplate = lazy(() => import('./cv-templates/MinimalTemplate'));
const CreativeTemplate = lazy(() => import('./cv-templates/CreativeTemplate'));

// Flagship mapping
export const COMPONENT_MAP = {
    'classic': ClassicTemplate,
    'sidebar': SidebarTemplate,
    'modern': ModernTemplate,
    'minimal': MinimalTemplate,
    'creative': CreativeTemplate,
    
    // Legacy support for numbered IDs
    'modern-1': ModernTemplate,
    'modern-2': ModernTemplate,
    'modern-3': ModernTemplate,
    'modern-4': ModernTemplate,
    'modern-5': ModernTemplate,
    'modern-6': ModernTemplate,
    'modern-7': ModernTemplate,
    'professional-1': SidebarTemplate,
    'professional-2': SidebarTemplate,
    'professional-3': SidebarTemplate,
    'professional-4': SidebarTemplate,
    'professional-5': SidebarTemplate,
    'professional-6': SidebarTemplate,
    'professional-7': SidebarTemplate,
    'creative-1': CreativeTemplate,
    'creative-2': CreativeTemplate,
    'creative-3': CreativeTemplate,
    'creative-4': CreativeTemplate,
    'creative-5': CreativeTemplate,
    'creative-6': CreativeTemplate,
    'creative-7': CreativeTemplate,
    'minimal-1': MinimalTemplate,
    'minimal-2': MinimalTemplate,
    'minimal-3': MinimalTemplate,
    'minimal-4': MinimalTemplate,
    'minimal-5': MinimalTemplate,
    'minimal-6': MinimalTemplate,
    'minimal-7': MinimalTemplate,
    'dark-1': CreativeTemplate,
    'dark-2': CreativeTemplate,
    'dark-3': CreativeTemplate,
    'dark-4': CreativeTemplate,
    'dark-5': CreativeTemplate,
    'dark-6': CreativeTemplate,
    'dark-7': CreativeTemplate,
};

export const TemplateRenderer = ({ templateId, data, customization }) => {
    // If it's one of our flagship IDs or a legacy ID, find the component
    const Component = COMPONENT_MAP[templateId] || COMPONENT_MAP['modern'];

    return (
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">Loading Layout...</div>}>
            <Component data={data} customization={customization} />
        </Suspense>
    );
};
