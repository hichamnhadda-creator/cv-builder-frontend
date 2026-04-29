import React, { lazy, Suspense } from 'react';

// MODERN
const Modern1 = lazy(() => import('./cv-templates/Modern1'));
const Modern2 = lazy(() => import('./cv-templates/Modern2'));

// PROFESSIONAL
const Professional1 = lazy(() => import('./cv-templates/Professional1'));
const Professional2 = lazy(() => import('./cv-templates/Professional2'));

// CREATIVE
const Creative1 = lazy(() => import('./cv-templates/Creative1'));
const Creative2 = lazy(() => import('./cv-templates/Creative2'));

// MINIMAL
const Minimal1 = lazy(() => import('./cv-templates/Minimal1'));
const Minimal2 = lazy(() => import('./cv-templates/Minimal2'));

// DARK
const Dark1 = lazy(() => import('./cv-templates/Dark1'));
const Dark2 = lazy(() => import('./cv-templates/Dark2'));

export const COMPONENT_MAP = {
    // MODERN
    'modern-1': Modern1,
    'modern-2': Modern2,
    
    // PROFESSIONAL
    'professional-1': Professional1,
    'professional-2': Professional2,
    
    // CREATIVE
    'creative-1': Creative1,
    'creative-2': Creative2,
    
    // MINIMAL
    'minimal-1': Minimal1,
    'minimal-2': Minimal2,
    
    // DARK
    'dark-1': Dark1,
    'dark-2': Dark2,

    // Legacy / Fallbacks
    'modern': Modern1,
    'professional': Professional1,
    'creative': Creative1,
    'minimal': Minimal1,
    'dark': Dark1,
    'classic': Professional1,
    'sidebar': Modern2
};

export const TemplateRenderer = ({ templateId, data, customization }) => {
    const Component = COMPONENT_MAP[templateId] || COMPONENT_MAP['modern-1'];

    return (
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">Loading Unique Layout...</div>}>
            <Component data={data} customization={customization} />
        </Suspense>
    );
};
