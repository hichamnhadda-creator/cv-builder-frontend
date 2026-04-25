import React, { lazy, Suspense } from 'react';
import ModernTemplate from './cv-templates/ModernTemplate';

const Modern1 = lazy(() => import('./cv-templates/Modern1'));
const Modern2 = lazy(() => import('./cv-templates/Modern2'));
const Modern3 = lazy(() => import('./cv-templates/Modern3'));
const Modern4 = lazy(() => import('./cv-templates/Modern4'));
const Modern5 = lazy(() => import('./cv-templates/Modern5'));
const Modern6 = lazy(() => import('./cv-templates/Modern6'));
const Modern7 = lazy(() => import('./cv-templates/Modern7'));

const Professional1 = lazy(() => import('./cv-templates/Professional1'));
const Professional2 = lazy(() => import('./cv-templates/Professional2'));
const Professional3 = lazy(() => import('./cv-templates/Professional3'));
const Professional4 = lazy(() => import('./cv-templates/Professional4'));
const Professional5 = lazy(() => import('./cv-templates/Professional5'));
const Professional6 = lazy(() => import('./cv-templates/Professional6'));
const Professional7 = lazy(() => import('./cv-templates/Professional7'));

const Creative1 = lazy(() => import('./cv-templates/Creative1'));
const Creative2 = lazy(() => import('./cv-templates/Creative2'));
const Creative3 = lazy(() => import('./cv-templates/Creative3'));
const Creative4 = lazy(() => import('./cv-templates/Creative4'));
const Creative5 = lazy(() => import('./cv-templates/Creative5'));
const Creative6 = lazy(() => import('./cv-templates/Creative6'));
const Creative7 = lazy(() => import('./cv-templates/Creative7'));

const Minimal1 = lazy(() => import('./cv-templates/Minimal1'));
const Minimal2 = lazy(() => import('./cv-templates/Minimal2'));
const Minimal3 = lazy(() => import('./cv-templates/Minimal3'));
const Minimal4 = lazy(() => import('./cv-templates/Minimal4'));
const Minimal5 = lazy(() => import('./cv-templates/Minimal5'));
const Minimal6 = lazy(() => import('./cv-templates/Minimal6'));
const Minimal7 = lazy(() => import('./cv-templates/Minimal7'));

const Dark1 = lazy(() => import('./cv-templates/Dark1'));
const Dark2 = lazy(() => import('./cv-templates/Dark2'));
const Dark3 = lazy(() => import('./cv-templates/Dark3'));
const Dark4 = lazy(() => import('./cv-templates/Dark4'));
const Dark5 = lazy(() => import('./cv-templates/Dark5'));
const Dark6 = lazy(() => import('./cv-templates/Dark6'));
const Dark7 = lazy(() => import('./cv-templates/Dark7'));

export const COMPONENT_MAP = {
    'modern-1': Modern1,
    'modern-2': Modern2,
    'modern-3': Modern3,
    'modern-4': Modern4,
    'modern-5': Modern5,
    'modern-6': Modern6,
    'modern-7': Modern7,
    'professional-1': Professional1,
    'professional-2': Professional2,
    'professional-3': Professional3,
    'professional-4': Professional4,
    'professional-5': Professional5,
    'professional-6': Professional6,
    'professional-7': Professional7,
    'creative-1': Creative1,
    'creative-2': Creative2,
    'creative-3': Creative3,
    'creative-4': Creative4,
    'creative-5': Creative5,
    'creative-6': Creative6,
    'creative-7': Creative7,
    'minimal-1': Minimal1,
    'minimal-2': Minimal2,
    'minimal-3': Minimal3,
    'minimal-4': Minimal4,
    'minimal-5': Minimal5,
    'minimal-6': Minimal6,
    'minimal-7': Minimal7,
    'dark-1': Dark1,
    'dark-2': Dark2,
    'dark-3': Dark3,
    'dark-4': Dark4,
    'dark-5': Dark5,
    'dark-6': Dark6,
    'dark-7': Dark7,
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
