import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Modern2 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#0ea5e9', secondary: '#1e293b' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    return (
        <div className="min-h-full bg-gradient-to-br from-blue-50 to-indigo-50 text-slate-800 overflow-hidden font-sans" style={{ fontFamily }}>
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-blue-100 text-slate-900 py-10 px-8" style={{ 
                fontFamily: headingFont, 
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` 
            }}>
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
                    {personalInfo?.photo && (
                        <img 
                            src={personalInfo.photo} 
                            alt={personalInfo.fullName} 
                            className="w-36 h-36 rounded-2xl object-cover shadow-2xl flex-shrink-0"
                            style={{ border: `4px solid ${colors.primary}40` }}
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
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-6">
                            <h3 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ fontFamily: headingFont }}>{t('editor.sections.summary')}</h3>
                            <p className="leading-relaxed opacity-90 text-justify">{personalInfo.summary}</p>
                        </div>
                    )}

                    {experience?.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-6">
                            <h3 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ fontFamily: headingFont }}>{t('editor.sections.experience')}</h3>
                            <div className="space-y-6">
                                {experience.map((exp, idx) => (
                                    <div key={exp.id || idx} className="relative pl-4 border-l-2" style={{ borderColor: colors.primary }}>
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
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-6">
                            <h3 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ fontFamily: headingFont }}>{t('editor.sections.education')}</h3>
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
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-6">
                            <h3 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ fontFamily: headingFont }}>{t('editor.sections.skills')}</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, idx) => {
                                    const name = getSkillName(skill);
                                    return name ? (
                                        <span key={idx} className="px-3 py-1.5 rounded-xl text-sm font-semibold shadow-sm" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                            {name}
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    )}

                    {languages?.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-6">
                            <h3 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ fontFamily: headingFont }}>{t('editor.sections.languages')}</h3>
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
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-6">
                            <h3 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ fontFamily: headingFont }}>{t('editor.sections.certifications')}</h3>
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

export default Modern2;
