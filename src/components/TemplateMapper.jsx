import React, { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

/**
 * Dynamically import a template component based on its category and name.
 * We follow the naming convention: Category + Number (e.g., Modern1, Creative2)
 */
const componentCache = {};

const getTemplateComponent = (templateId) => {
    if (componentCache[templateId]) {
        return componentCache[templateId];
    }

    // Convert templateId (e.g., 'modern-1') to ComponentName (e.g., 'Modern1')
    const parts = templateId.split('-');
    if (parts.length < 2) return null;
    
    const category = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    const number = parts[1];
    const componentName = `${category}${number}`;

    // Lazy load the component
    try {
        const comp = lazy(() => import(`./cv-templates/${componentName}.jsx`).catch(() => {
            console.warn(`Template component ${componentName} not found, falling back to Modern1`);
            return import('./cv-templates/Modern1.jsx');
        }));
        componentCache[templateId] = comp;
        return comp;
    } catch (e) {
        console.error(`Error loading template ${templateId}:`, e);
        return lazy(() => import('./cv-templates/Modern1.jsx'));
    }
};

// Map of fixed/special IDs to components
const FIXED_MAP = {
    'classic': lazy(() => import('./cv-templates/Professional1.jsx')),
    'sidebar': lazy(() => import('./cv-templates/Professional2.jsx')),
    'minimal': lazy(() => import('./cv-templates/Minimal1.jsx')),
    'creative': lazy(() => import('./cv-templates/Creative1.jsx')),
    'dark': lazy(() => import('./cv-templates/Dark1.jsx')),
    'modern': lazy(() => import('./cv-templates/Modern1.jsx')),
};

export const TemplateRenderer = React.memo(({ templateId, data, customization }) => {
    const { t, i18n } = useTranslation();
    const { hasPurchased } = useAuth();
    const dir = i18n.dir();

    // Try to get from fixed map first (legacy support)
    let Component = FIXED_MAP[templateId];
    
    // If not in fixed map, try dynamic loading
    if (!Component) {
        Component = getTemplateComponent(templateId);
    }

    // Ultimate fallback
    if (!Component) {
        Component = FIXED_MAP['modern'];
    }

    return (
        <Suspense fallback={<div className="w-full min-h-[1123px] flex items-center justify-center bg-gray-50 text-gray-400">Loading Template Layout...</div>}>
            <style>{`.template-wrapper-stretcher > :first-child { flex: 1 1 0% !important; min-height: 100% !important; width: 100% !important; }`}</style>
            <div className="relative min-h-[1123px] w-full overflow-visible flex flex-col flex-grow template-wrapper-stretcher" dir={dir}>
                <Component data={data} customization={customization} />
                
                {/* Branding Credit for Free Users - Positioned stably for PDF export */}
                {!hasPurchased && (
                    <div className="absolute bottom-0 left-0 w-full pb-6 text-center z-50 pointer-events-none">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm">
                            <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                                {t('common.createdWith')} <span className="text-blue-600 font-black">Fast CV Builder</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </Suspense>
    );
});
