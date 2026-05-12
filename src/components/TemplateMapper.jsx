import React, { lazy, Suspense } from 'react';
import { useAuth } from '../contexts/AuthContext';

/**
 * Dynamically import a template component based on its category and name.
 * We follow the naming convention: Category + Number (e.g., Modern1, Creative2)
 */
const getTemplateComponent = (templateId) => {
    // Convert templateId (e.g., 'modern-1') to ComponentName (e.g., 'Modern1')
    const parts = templateId.split('-');
    if (parts.length < 2) return null;
    
    const category = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    const number = parts[1];
    const componentName = `${category}${number}`;

    // Lazy load the component
    try {
        return lazy(() => import(`./cv-templates/${componentName}.jsx`).catch(() => {
            console.warn(`Template component ${componentName} not found, falling back to Modern1`);
            return import('./cv-templates/Modern1.jsx');
        }));
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

export const TemplateRenderer = ({ templateId, data, customization }) => {
    const { hasPurchased } = useAuth();

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
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">Loading Template Layout...</div>}>
            <div className="relative h-full w-full overflow-hidden" dir="ltr">
                <Component data={data} customization={customization} />
                
                {/* Branding Credit for Free Users - Absolute positioned to avoid pushing content */}
                {!hasPurchased && (
                    <div className="absolute bottom-4 left-0 right-0 text-center z-50 pointer-events-none">
                        <p className="text-[9px] text-gray-400/50 font-medium tracking-widest uppercase bg-white/80 backdrop-blur-sm inline-block px-4 py-1 rounded-full border border-gray-100/50">
                            Created with <span className="text-gray-500 font-black">Fast CV Builder</span>
                        </p>
                    </div>
                )}
            </div>
        </Suspense>
    );
};
