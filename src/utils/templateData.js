

export const TEMPLATES = [
    // --- Modern (5) ---
    {
        id: 'modern-1',
        name: 'Modern Executive',
        category: 'modern',
        isPremium: false,
        access: 'free',
        description: 'Clean and modern design perfect for tech and creative professionals',
        colors: { primary: '#0ea5e9', secondary: '#1e293b' }
    },
    {
        id: 'modern-2',
        name: 'Sleek Developer',
        category: 'modern',
        isPremium: true,
        access: 'premium',
        description: 'Two-column layout highlighting technical skills',
        colors: { primary: '#3b82f6', secondary: '#475569' }
    },
    {
        id: 'modern-3',
        name: 'Modern Timeline',
        category: 'modern',
        isPremium: true,
        access: 'premium',
        description: 'Experience-focused layout with a visual timeline',
        colors: { primary: '#10b981', secondary: '#334155' }
    },
    {
        id: 'modern-4',
        name: 'Tech Innovator',
        category: 'modern',
        isPremium: true,
        access: 'premium',
        description: 'Bold header and dynamic skill bars',
        colors: { primary: '#8b5cf6', secondary: '#0f172a' }
    },
    {
        id: 'modern-5',
        name: 'The Start-Up',
        category: 'modern',
        isPremium: true,
        access: 'premium',
        description: 'Agile layout perfect for fast-paced environments',
        colors: { primary: '#f97316', secondary: '#1e293b' }
    },

    // --- Professional (5) previously 'classic' ---
    {
        id: 'professional-1',
        name: 'Corporate Classic',
        category: 'professional',
        isPremium: true,
        access: 'premium',
        description: 'Traditional layout suitable for corporate positions',
        colors: { primary: '#1f2937', secondary: '#4b5563' }
    },
    {
        id: 'professional-2',
        name: 'Executive Board',
        category: 'professional',
        isPremium: true,
        access: 'premium',
        description: 'Formal top-down structure for executives',
        colors: { primary: '#0f172a', secondary: '#334155' }
    },
    {
        id: 'professional-3',
        name: 'The Consultant',
        category: 'professional',
        isPremium: true,
        access: 'premium',
        description: 'Highlighting achievements and ROI',
        colors: { primary: '#1e3a8a', secondary: '#475569' }
    },
    {
        id: 'professional-4',
        name: 'Finance Specialist',
        category: 'professional',
        isPremium: true,
        access: 'premium',
        description: 'Data-driven layout for numerical achievements',
        colors: { primary: '#047857', secondary: '#374151' }
    },
    {
        id: 'professional-5',
        name: 'Legal Authority',
        category: 'professional',
        isPremium: true,
        access: 'premium',
        description: 'Authoritative, text-focused traditional design',
        colors: { primary: '#111827', secondary: '#6b7280' }
    },

    // --- Creative (5) ---
    {
        id: 'creative-1',
        name: 'Creative Studio',
        category: 'creative',
        isPremium: true,
        access: 'premium',
        description: 'Eye-catching design for creative professionals',
        colors: { primary: '#ec4899', secondary: '#4b5563' }
    },
    {
        id: 'creative-2',
        name: 'The Designer',
        category: 'creative',
        isPremium: true,
        access: 'premium',
        description: 'Vibrant colors and abstract shapes',
        colors: { primary: '#8b5cf6', secondary: '#1f2937' }
    },
    {
        id: 'creative-3',
        name: 'Portfolio Pop',
        category: 'creative',
        isPremium: true,
        access: 'premium',
        description: 'Heavy focus on project highlights and visualizations',
        colors: { primary: '#f43f5e', secondary: '#334155' }
    },
    {
        id: 'creative-4',
        name: 'Agency Bold',
        category: 'creative',
        isPremium: true,
        access: 'premium',
        description: 'Distinct sidebar and contrasting headers',
        colors: { primary: '#d946ef', secondary: '#111827' }
    },
    {
        id: 'creative-5',
        name: 'Organic Flow',
        category: 'creative',
        isPremium: true,
        access: 'premium',
        description: 'Soft edges and warm gradients',
        colors: { primary: '#eab308', secondary: '#475569' }
    },

    // --- Minimal (3) ---
    {
        id: 'minimal-1',
        name: 'Pure Minimal',
        category: 'minimal',
        isPremium: true,
        access: 'premium',
        description: 'Simple and elegant design focusing on clarity',
        colors: { primary: '#000000', secondary: '#6b7280' }
    },
    {
        id: 'minimal-2',
        name: 'Clean Slate',
        category: 'minimal',
        isPremium: true,
        access: 'premium',
        description: 'Lots of white space and thin typography',
        colors: { primary: '#374151', secondary: '#9ca3af' }
    },
    {
        id: 'minimal-3',
        name: 'Essential Text',
        category: 'minimal',
        isPremium: true,
        access: 'premium',
        description: 'Focus entirely on content with distinct hierarchy',
        colors: { primary: '#1f2937', secondary: '#4b5563' }
    },

    // --- Dark (2) ---
    {
        id: 'dark-1',
        name: 'Midnight Coder',
        category: 'dark',
        isPremium: true,
        access: 'premium',
        description: 'Dark mode theme perfect for developers',
        colors: { primary: '#38bdf8', secondary: '#e2e8f0' } // secondary used for text on dark bg
    },
    {
        id: 'dark-2',
        name: 'Deep Space',
        category: 'dark',
        isPremium: true,
        access: 'premium',
        description: 'Immersive dark background with vibrant accents',
        colors: { primary: '#a78bfa', secondary: '#cbd5e1' }
    }
];

export const getTemplateById = (id) => {
    // If a user has an old 'classic' template, map it to professional
    let lookupId = id;
    if (id && id.includes('classic')) {
        lookupId = id.replace('classic', 'professional');
    }
    return TEMPLATES.find(template => template.id === lookupId) || TEMPLATES[0];
};

export const getTemplatesByCategory = (category) => {
    if (category === 'all') return TEMPLATES;
    return TEMPLATES.filter(template => template.category === category);
};
