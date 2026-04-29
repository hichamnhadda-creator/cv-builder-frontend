export const TEMPLATES = [
    {
        id: 'classic',
        name: 'Classic Professional',
        category: 'classic',
        isPremium: false,
        access: 'free',
        description: 'Traditional centered layout perfect for formal industries',
        colors: { primary: '#111827', secondary: '#4b5563' }
    },
    {
        id: 'sidebar',
        name: 'Executive Sidebar',
        category: 'professional',
        isPremium: true,
        access: 'premium',
        description: 'Modern split layout with a prominent sidebar for contact and skills',
        colors: { primary: '#1e293b', secondary: '#475569' }
    },
    {
        id: 'modern',
        name: 'Modern Grid',
        category: 'modern',
        isPremium: true,
        access: 'premium',
        description: 'Dynamic grid-based layout with a clean header and two-column body',
        colors: { primary: '#0ea5e9', secondary: '#0f172a' }
    },
    {
        id: 'minimal',
        name: 'Minimalist Clean',
        category: 'minimal',
        isPremium: true,
        access: 'premium',
        description: 'Ultra-clean single-column design focusing purely on content and typography',
        colors: { primary: '#000000', secondary: '#525252' }
    },
    {
        id: 'creative',
        name: 'Creative Bold',
        category: 'creative',
        isPremium: true,
        access: 'premium',
        description: 'Asymmetrical design with bold colors and floating elements for creative impact',
        colors: { primary: '#ec4899', secondary: '#8b5cf6' }
    }
];

export const getTemplateById = (id) => {
    // Standard mapping for common legacy IDs
    if (id?.includes('modern')) return TEMPLATES.find(t => t.id === 'modern');
    if (id?.includes('professional')) return TEMPLATES.find(t => t.id === 'sidebar');
    if (id?.includes('creative')) return TEMPLATES.find(t => t.id === 'creative');
    if (id?.includes('minimal')) return TEMPLATES.find(t => t.id === 'minimal');
    if (id?.includes('dark')) return TEMPLATES.find(t => t.id === 'creative');
    
    return TEMPLATES.find(template => template.id === id) || TEMPLATES[0];
};

export const getTemplatesByCategory = (category) => {
    if (category === 'all') return TEMPLATES;
    return TEMPLATES.filter(template => template.category === category);
};
