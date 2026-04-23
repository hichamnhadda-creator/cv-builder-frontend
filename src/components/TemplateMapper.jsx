import React, { lazy, Suspense } from 'react';
import ModernTemplate from './cv-templates/ModernTemplate';

// We will lazily load all components to prevent massive bundle sizes on initial load since there are 20 of them.
const Modern1 = lazy(() => import('./cv-templates/Modern1'));
const Modern2 = lazy(() => import('./cv-templates/Modern2'));
const Modern3 = lazy(() => import('./cv-templates/Modern3'));
const Modern4 = lazy(() => import('./cv-templates/Modern4'));
const Modern5 = lazy(() => import('./cv-templates/Modern5'));

const Professional1 = lazy(() => import('./cv-templates/Professional1'));
const Professional2 = lazy(() => import('./cv-templates/Professional2'));
const Professional3 = lazy(() => import('./cv-templates/Professional3'));
const Professional4 = lazy(() => import('./cv-templates/Professional4'));
const Professional5 = lazy(() => import('./cv-templates/Professional5'));

const Creative1 = lazy(() => import('./cv-templates/Creative1'));
const Creative2 = lazy(() => import('./cv-templates/Creative2'));
const Creative3 = lazy(() => import('./cv-templates/Creative3'));
const Creative4 = lazy(() => import('./cv-templates/Creative4'));
const Creative5 = lazy(() => import('./cv-templates/Creative5'));

const Minimal1 = lazy(() => import('./cv-templates/Minimal1'));
const Minimal2 = lazy(() => import('./cv-templates/Minimal2'));
const Minimal3 = lazy(() => import('./cv-templates/Minimal3'));

const Dark1 = lazy(() => import('./cv-templates/Dark1'));
const Dark2 = lazy(() => import('./cv-templates/Dark2'));

export const COMPONENT_MAP = {
    'modern-1': Modern1,
    'modern-2': Modern2,
    'modern-3': Modern3,
    'modern-4': Modern4,
    'modern-5': Modern5,
    'professional-1': Professional1,
    'professional-2': Professional2,
    'professional-3': Professional3,
    'professional-4': Professional4,
    'professional-5': Professional5,
    'creative-1': Creative1,
    'creative-2': Creative2,
    'creative-3': Creative3,
    'creative-4': Creative4,
    'creative-5': Creative5,
    'minimal-1': Minimal1,
    'minimal-2': Minimal2,
    'minimal-3': Minimal3,
    'dark-1': Dark1,
    'dark-2': Dark2,
};

export const TemplateRenderer = ({ templateId, data, customization }) => {
    // legacy fallback map
    let lookupId = templateId;
    if (templateId && templateId.includes('classic')) {
        lookupId = templateId.replace('classic', 'professional');
    }

    const Component = COMPONENT_MAP[lookupId] || Modern1;

    return (
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">Loading Layout...</div>}>
            <Component data={data} customization={customization} />
        </Suspense>
    );
};
