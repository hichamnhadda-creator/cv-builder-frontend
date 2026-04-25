const fs = require('fs');
const path = require('path');

const templates = [
    { name: 'Modern1', type: 'modern', variant: 'executive' },
    { name: 'Modern2', type: 'modern', variant: 'developer' },
    { name: 'Modern3', type: 'modern', variant: 'timeline' },
    { name: 'Modern4', type: 'modern', variant: 'innovator' },
    { name: 'Modern5', type: 'modern', variant: 'startup' },
    { name: 'Professional1', type: 'professional', variant: 'classic' },
    { name: 'Professional2', type: 'professional', variant: 'board' },
    { name: 'Professional3', type: 'professional', variant: 'consultant' },
    { name: 'Professional4', type: 'professional', variant: 'finance' },
    { name: 'Professional5', type: 'professional', variant: 'legal' },
    { name: 'Creative1', type: 'creative', variant: 'studio' },
    { name: 'Creative2', type: 'creative', variant: 'designer' },
    { name: 'Creative3', type: 'creative', variant: 'portfolio' },
    { name: 'Creative4', type: 'creative', variant: 'agency' },
    { name: 'Creative5', type: 'creative', variant: 'organic' },
    { name: 'Minimal1', type: 'minimal', variant: 'pure' },
    { name: 'Minimal2', type: 'minimal', variant: 'slate' },
    { name: 'Minimal3', type: 'minimal', variant: 'essential' },
    { name: 'Dark1', type: 'dark', variant: 'coder' },
    { name: 'Dark2', type: 'dark', variant: 'space' }
];

const generateComponent = (template) => {
    let bgClass = 'bg-white text-gray-800';
    let headerClass = 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white';
    let cardClass = 'bg-white rounded-xl shadow-sm border border-gray-100 p-6';
    let sectionHeadingClass = 'text-2xl font-bold mb-4 pb-2 border-b-2';
    
    if (template.type === 'dark') {
        bgClass = 'bg-gray-900 text-gray-100';
        cardClass = 'bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-6';
        if (template.variant === 'coder') {
            headerClass = 'bg-slate-800 text-sky-400 border-b border-sky-500/30 shadow-lg shadow-sky-500/10';
            sectionHeadingClass = 'text-2xl font-bold mb-4 text-sky-400 uppercase tracking-widest';
        } else {
            headerClass = 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white';
            sectionHeadingClass = 'text-2xl font-bold mb-4 pb-2 border-b border-indigo-500';
        }
    } else if (template.type === 'minimal') {
        bgClass = 'bg-[#f8f9fa] text-gray-800';
        cardClass = 'mb-10'; // Minimal uses whitespace, not cards
        headerClass = 'py-14 border-b border-gray-200';
        sectionHeadingClass = 'text-lg font-semibold mb-6 text-gray-500 uppercase tracking-widest';
    } else if (template.type === 'creative') {
        bgClass = 'bg-orange-50 text-gray-800';
        if (template.variant === 'studio') {
            headerClass = 'bg-pink-500 text-white';
            cardClass = 'bg-white rounded-3xl shadow-xl p-8 border-l-4 border-pink-400';
        } else {
            headerClass = 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-b-full shadow-lg pb-16';
            cardClass = 'bg-white shadow-xl rounded-2xl p-6 -mt-8 relative z-10';
        }
    } else if (template.type === 'professional') {
        bgClass = 'bg-white text-slate-800';
        headerClass = 'bg-slate-800 text-slate-100 py-10 px-8 border-t-8 border-blue-600';
        cardClass = 'py-4';
        sectionHeadingClass = 'text-xl font-bold mb-4 pb-1 border-b-2 border-slate-300 uppercase tracking-wider text-slate-700';
    } else if (template.type === 'modern') {
        if (template.variant === 'developer') {
            bgClass = 'bg-gradient-to-br from-blue-50 to-indigo-50 text-slate-800';
            headerClass = 'bg-white shadow-sm border-b border-blue-100 text-slate-900 py-10 px-8';
            cardClass = 'bg-white rounded-2xl shadow-sm border border-blue-50 p-6';
        } else {
            bgClass = 'bg-slate-50 text-slate-800';
            headerClass = 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-12 px-8 shadow-md';
            cardClass = 'bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300';
        }
    }

    return `import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const ${template.name} = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#0ea5e9', secondary: '#1e293b' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    return (
        <div className="min-h-full ${bgClass} overflow-hidden font-sans" style={{ fontFamily }}>
            {/* Header */}
            <div className="${headerClass}" style={{ 
                fontFamily: headingFont, 
                ${template.type === 'modern' || template.type === 'creative' ? 'background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`' : ''} 
            }}>
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
                    {personalInfo?.photo && (
                        <img 
                            src={personalInfo.photo} 
                            alt={personalInfo.fullName} 
                            className="w-36 h-36 rounded-2xl object-cover shadow-2xl flex-shrink-0"
                            style={{ border: \`4px solid \${colors.primary}40\` }}
                        />
                    )}
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">{personalInfo?.fullName || 'Your Name'}</h1>
                        <h2 className="text-xl md:text-2xl opacity-90 font-medium">{experience?.[0]?.jobTitle || 'Professional Title'}</h2>
                        
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-5 text-sm opacity-80">
                            {personalInfo?.email && <span className="flex items-center gap-1">✉️ {personalInfo.email}</span>}
                            {personalInfo?.phone && <span className="flex items-center gap-1">📱 {personalInfo.phone}</span>}
                            {personalInfo?.address && <span className="flex items-center gap-1">📍 {personalInfo.address}</span>}
                            {personalInfo?.website && <span className="flex items-center gap-1">🌐 {personalInfo.website}</span>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-4xl mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Left Column (Main Info) */}
                <div className="md:col-span-2 space-y-8">
                    
                    {personalInfo?.summary && (
                        <div className="${cardClass}">
                            <h3 className="${sectionHeadingClass}" style={{ fontFamily: headingFont }}>{t('editor.sections.summary')}</h3>
                            <p className="leading-relaxed opacity-90 text-justify">{personalInfo.summary}</p>
                        </div>
                    )}

                    {experience?.length > 0 && (
                        <div className="${cardClass}">
                            <h3 className="${sectionHeadingClass}" style={{ fontFamily: headingFont }}>{t('editor.sections.experience')}</h3>
                            <div className="space-y-6">
                                {experience.map((exp, idx) => (
                                    <div key={exp.id || idx} className="relative ${template.type === 'modern' ? 'pl-4 border-l-2' : ''}" style={{ borderColor: colors.primary }}>
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="text-lg font-bold">{exp.jobTitle}</h4>
                                            <span className="text-sm font-medium opacity-75 bg-black/5 px-2 py-1 rounded">
                                                {exp.startDate} - {exp.current ? t('editor.common.present') : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium mb-2 opacity-80" style={{ color: colors.primary }}>{exp.company} • {exp.location}</div>
                                        <p className="text-sm leading-relaxed opacity-90">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {education?.length > 0 && (
                        <div className="${cardClass}">
                            <h3 className="${sectionHeadingClass}" style={{ fontFamily: headingFont }}>{t('editor.sections.education')}</h3>
                            <div className="space-y-6">
                                {education.map((edu, idx) => (
                                    <div key={edu.id || idx}>
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="text-lg font-bold">{edu.degree}</h4>
                                            <span className="text-sm opacity-75">{edu.startDate} - {edu.current ? t('editor.common.present') : edu.endDate}</span>
                                        </div>
                                        <div className="text-sm font-medium opacity-80">{edu.institution}</div>
                                        {edu.description && <p className="text-sm mt-2 opacity-90">{edu.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* Right Column (Sidebar Info) */}
                <div className="space-y-8">
                    
                    {skills?.length > 0 && (
                        <div className="${cardClass}">
                            <h3 className="${sectionHeadingClass}" style={{ fontFamily: headingFont }}>{t('editor.sections.skills')}</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, idx) => {
                                    const name = getSkillName(skill);
                                    return name ? (
                                        <span key={idx} className="px-3 py-1.5 rounded-xl text-sm font-semibold shadow-sm" style={{ backgroundColor: \`\${colors.primary}15\`, color: colors.primary }}>
                                            {name}
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    )}

                    {languages?.length > 0 && (
                        <div className="${cardClass}">
                            <h3 className="${sectionHeadingClass}" style={{ fontFamily: headingFont }}>{t('editor.sections.languages')}</h3>
                            <div className="space-y-3">
                                {languages.map((lang, idx) => {
                                    const name = getLangName(lang);
                                    const level = getLangLevel(lang);
                                    return name ? (
                                        <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0">
                                            <span className="font-medium">{name}</span>
                                            <span className="text-sm opacity-70 bg-gray-100/50 px-2 py-0.5 rounded">{level}</span>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    )}

                    {certifications?.length > 0 && (
                        <div className="${cardClass}">
                            <h3 className="${sectionHeadingClass}" style={{ fontFamily: headingFont }}>{t('editor.sections.certifications')}</h3>
                            <div className="space-y-4">
                                {certifications.map((cert, idx) => (
                                    <div key={cert.id || idx}>
                                        <h4 className="font-bold text-sm">{cert.name || cert.degree}</h4>
                                        <div className="text-xs opacity-75">{cert.issuer || cert.institution}</div>
                                        <div className="text-xs opacity-60 mt-1">{cert.year || cert.startDate}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
};

export default ${template.name};
`;
};

templates.forEach(t => {
    const content = generateComponent(t);
    fs.writeFileSync(path.join(__dirname, `${t.name}.jsx`), content);
    console.log(`Generated ${t.name}.jsx`);
});
