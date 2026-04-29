export const TEMPLATES = [
    // --- MODERN ---
    {
        id: 'modern-1',
        name: 'Modern Triple Grid',
        category: 'modern',
        isPremium: true,
        access: 'premium',
        description: 'High-density grid layout for balanced visibility of all sections',
        colors: { primary: '#0ea5e9', secondary: '#1e293b' }
    },
    {
        id: 'modern-2',
        name: 'Modern Card Sidebar',
        category: 'modern',
        isPremium: true,
        access: 'premium',
        description: 'Sleek sidebar navigation with a card-based experience flow',
        colors: { primary: '#6366f1', secondary: '#1e293b' }
    },

    // --- PROFESSIONAL ---
    {
        id: 'professional-1',
        name: 'Corporate Hierarchy',
        category: 'professional',
        isPremium: true,
        access: 'premium',
        description: 'Strict vertical flow optimized for long professional histories',
        colors: { primary: '#1e293b', secondary: '#475569' }
    },
    {
        id: 'professional-2',
        name: 'Authority Serif',
        category: 'professional',
        isPremium: true,
        access: 'premium',
        description: 'Traditional centered layout with elegant serif typography',
        colors: { primary: '#0f172a', secondary: '#334155' }
    },

    // --- CREATIVE ---
    {
        id: 'creative-1',
        name: 'Floating Asymmetry',
        category: 'creative',
        isPremium: true,
        access: 'premium',
        description: 'Bold, asymmetrical design with overlapping floating elements',
        colors: { primary: '#f43f5e', secondary: '#1e293b' }
    },
    {
        id: 'creative-2',
        name: 'Side Ribbon',
        category: 'creative',
        isPremium: true,
        access: 'premium',
        description: 'Unique vertical side-header with diagonal design accents',
        colors: { primary: '#f59e0b', secondary: '#10b981' }
    },

    // --- MINIMAL ---
    {
        id: 'minimal-1',
        name: 'Pure Type',
        category: 'minimal',
        isPremium: false,
        access: 'free',
        description: 'Ultra-minimalist design focusing entirely on typography and white space',
        colors: { primary: '#000000', secondary: '#737373' }
    },
    {
        id: 'minimal-2',
        name: 'Soft Timeline',
        category: 'minimal',
        isPremium: true,
        access: 'premium',
        description: 'Clean single-column layout with a subtle vertical timeline',
        colors: { primary: '#0ea5e9', secondary: '#f8fafc' }
    },

    // --- DARK ---
    {
        id: 'dark-1',
        name: 'Neon Tech',
        category: 'dark',
        isPremium: true,
        access: 'premium',
        description: 'High-contrast dark mode with glowing neon accents and tech-focused UI',
        colors: { primary: '#22d3ee', secondary: '#1e293b' }
    },
    {
        id: 'dark-2',
        name: 'Luxury Black',
        category: 'dark',
        isPremium: true,
        access: 'premium',
        description: 'Elegant deep-charcoal theme with gold accents and a sidebar layout',
        colors: { primary: '#facc15', secondary: '#18181b' }
    }
];

export const getTemplateById = (id) => {
    return TEMPLATES.find(template => template.id === id) || TEMPLATES[0];
};

export const getTemplatesByCategory = (category) => {
    if (category === 'all') return TEMPLATES;
    return TEMPLATES.filter(template => template.category === category);
};
