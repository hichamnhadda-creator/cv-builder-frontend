import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Modern3 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { 
        personalInfo = {}, 
        experience = [], 
        education = [], 
        skills = [], 
        languages = [], 
        projects = [], 
        certifications = [] 
    } = data || {};
    
    const colors = customization?.colors || { primary: '#0ea5e9', secondary: '#1e293b' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    // Safe data access
    const safeExperience = Array.isArray(experience) ? experience : [];
    const safeEducation = Array.isArray(education) ? education : [];
    const safeSkills = Array.isArray(skills) ? skills : [];
    const safeLanguages = Array.isArray(languages) ? languages : [];
    const safeCertifications = Array.isArray(certifications) ? certifications : [];

    return (
        <div className="min-h-full bg-slate-50 text-slate-800 overflow-hidden font-sans w-full max-w-full" style={{ fontFamily }}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-10 md:py-12 px-6 md:px-8 shadow-md" style={{ 
                fontFamily: headingFont, 
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` 
            }}>
                <div className="max-w-full mx-auto flex flex-col md:flex-row items-center gap-8">
                    {personalInfo?.photo && (
                        <img 
                            src={personalInfo.photo} 
                            alt={personalInfo.fullName} 
                            className="w-32 h-32 md:w-36 md:h-36 rounded-2xl object-cover shadow-2xl flex-shrink-0"
                            style={{ border: `4px solid ${colors.primary}40` }}
                        />
                    )}
                    <div className="text-center md:text-left flex-1 min-w-0">
                        <h1 className="text-3xl md:text-4xl font-black mb-1 tracking-tight break-words">{personalInfo?.fullName || 'Your Name'}</h1>
                        <h2 className="text-lg md:text-xl opacity-90 font-medium truncate">{safeExperience?.[0]?.jobTitle || 'Professional Title'}</h2>
                        
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-5 text-xs md:text-sm opacity-80">
                            {personalInfo?.email && <span className="flex items-center gap-1 truncate">✉️ {personalInfo.email}</span>}
                            {personalInfo?.phone && <span className="flex items-center gap-1 truncate">📱 {personalInfo.phone}</span>}
                            {personalInfo?.address && <span className="flex items-center gap-1 truncate">📍 {personalInfo.address}</span>}
                            {personalInfo?.website && <span className="flex items-center gap-1 truncate">🌐 {personalInfo.website}</span>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-full mx-auto p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                
                {/* Left Column (Main Info) */}
                <div className="md:col-span-2 space-y-8 min-w-0">
                    
                    {personalInfo?.summary && (
                        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
                            <h3 className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b-2" style={{ fontFamily: headingFont }}>{t('editor.sections.summary')}</h3>
                            <p className="leading-relaxed opacity-90 text-justify text-sm md:text-base break-words">{personalInfo.summary}</p>
                        </div>
                    )}

                    {safeExperience?.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
                            <h3 className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b-2" style={{ fontFamily: headingFont }}>{t('editor.sections.experience')}</h3>
                            <div className="space-y-6">
                                {safeExperience.map((exp, idx) => (
                                    <div key={exp.id || idx} className="relative pl-4 border-l-2 min-w-0" style={{ borderColor: colors.primary }}>
                                        <div className="flex flex-col sm:flex-row justify-between items-start mb-1 gap-1">
                                            <h4 className="text-base md:text-lg font-bold break-words">{exp.jobTitle}</h4>
                                            <span className="text-xs font-medium opacity-75 bg-black/5 px-2 py-1 rounded whitespace-nowrap">
                                                {exp.startDate} - {exp.current ? t('editor.common.present') : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-xs md:text-sm font-medium mb-2 opacity-80" style={{ color: colors.primary }}>{exp.company} • {exp.location}</div>
                                        <p className="text-xs md:text-sm leading-relaxed opacity-90 break-words">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {safeEducation?.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
                            <h3 className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b-2" style={{ fontFamily: headingFont }}>{t('editor.sections.education')}</h3>
                            <div className="space-y-6">
                                {safeEducation.map((edu, idx) => (
                                    <div key={edu.id || idx} className="min-w-0">
                                        <div className="flex flex-col sm:flex-row justify-between items-start mb-1 gap-1">
                                            <h4 className="text-base md:text-lg font-bold break-words">{edu.degree}</h4>
                                            <span className="text-xs opacity-75 whitespace-nowrap">{edu.startDate} - {edu.current ? t('editor.common.present') : edu.endDate}</span>
                                        </div>
                                        <div className="text-xs md:text-sm font-medium opacity-80">{edu.institution}</div>
                                        {edu.description && <p className="text-xs md:text-sm mt-2 opacity-90 break-words">{edu.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* Right Column (Sidebar Info) */}
                <div className="space-y-8 min-w-0">
                    
                    {safeSkills?.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
                            <h3 className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b-2" style={{ fontFamily: headingFont }}>{t('editor.sections.skills')}</h3>
                            <div className="flex flex-wrap gap-2">
                                {safeSkills.map((skill, idx) => {
                                    const name = getSkillName(skill);
                                    return name ? (
                                        <span key={idx} className="px-3 py-1.5 rounded-xl text-[10px] md:text-sm font-semibold shadow-sm whitespace-nowrap" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                            {name}
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    )}

                    {safeLanguages?.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
                            <h3 className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b-2" style={{ fontFamily: headingFont }}>{t('editor.sections.languages')}</h3>
                            <div className="space-y-3">
                                {safeLanguages.map((lang, idx) => {
                                    const name = getLangName(lang);
                                    const level = getLangLevel(lang);
                                    return name ? (
                                        <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0 min-w-0">
                                            <span className="font-medium text-sm truncate mr-2">{name}</span>
                                            <span className="text-[10px] opacity-70 bg-gray-100/50 px-2 py-0.5 rounded whitespace-nowrap">{level}</span>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    )}

                    {safeCertifications?.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
                            <h3 className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b-2" style={{ fontFamily: headingFont }}>{t('editor.sections.certifications')}</h3>
                            <div className="space-y-4">
                                {safeCertifications.map((cert, idx) => (
                                    <div key={cert.id || idx} className="min-w-0">
                                        <h4 className="font-bold text-xs md:text-sm break-words">{cert.name || cert.degree}</h4>
                                        <div className="text-[10px] opacity-75 truncate">{cert.issuer || cert.institution}</div>
                                        <div className="text-[10px] opacity-60 mt-1">{cert.year || cert.startDate}</div>
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

export default Modern3;
