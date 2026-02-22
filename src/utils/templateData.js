// Template definitions
export const TEMPLATES = [
    {
        id: 'classic-1',
        name: 'Classic Professional',
        category: 'classic',
        isPremium: false,
        access: 'free',
        description: 'Traditional layout suitable for corporate positions',
        colors: {
            primary: '#262626',
            secondary: '#525252'
        }
    },
    {
        id: 'modern-1',
        name: 'Modern Professional',
        category: 'modern',
        isPremium: false,
        access: 'free',
        description: 'Clean and modern design perfect for tech and creative professionals',
        colors: {
            primary: '#404040',
            secondary: '#737373'
        }
    },
    {
        id: 'creative-1',
        name: 'Creative Bold',
        category: 'creative',
        isPremium: false,
        access: 'free',
        description: 'Eye-catching design for creative professionals',
        colors: {
            primary: '#171717',
            secondary: '#404040'
        }
    },
    {
        id: 'minimal-1',
        name: 'Minimal Clean',
        category: 'minimal',
        isPremium: false,
        access: 'free',
        description: 'Simple and elegant design focusing on clarity',
        colors: {
            primary: '#000000',
            secondary: '#737373'
        }
    }
];

export const getTemplateById = (id) => {
    return TEMPLATES.find(template => template.id === id);
};

export const getTemplatesByCategory = (category) => {
    if (category === 'all') return TEMPLATES;
    return TEMPLATES.filter(template => template.category === category);
};
