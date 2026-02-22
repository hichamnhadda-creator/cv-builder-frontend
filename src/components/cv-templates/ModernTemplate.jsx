import React from 'react';
import { useTranslation } from 'react-i18next';

const ModernTemplate = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#0ea5e9', secondary: '#64748b' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    const getLangName = (lang) => {
        if (!lang) return '';
        if (typeof lang === 'object') return lang.language || lang.name || '';
        return lang;
    };

    const getLangLevel = (lang) => {
        if (!lang) return '';
        if (typeof lang === 'object') return lang.level || '';
        return '';
    };

    return (
        <div className="flex h-full bg-white shadow-lg overflow-hidden break-words max-w-full" style={{ fontFamily }}>
            {/* Sidebar */}
            <div className="w-1/3 p-6 md:p-8 text-white min-h-full max-w-full relative z-10 flex flex-col" style={{ backgroundColor: colors.primary }}>
                {/* 1. Personal Information (Photo + Contact) */}
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-white/20 rounded-full mb-6 flex items-center justify-center text-4xl overflow-hidden flex-shrink-0">
                    {personalInfo?.photo ? (
                        <img
                            src={personalInfo.photo}
                            alt={personalInfo.fullName}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span>👤</span>
                    )}
                </div>

                <div className="mb-8 space-y-3 text-sm opacity-90 break-words">
                    {personalInfo?.email && <div className="flex items-center gap-2"><span>✉️</span> {personalInfo.email}</div>}
                    {personalInfo?.phone && <div className="flex items-center gap-2"><span>📱</span> {personalInfo.phone}</div>}
                    {personalInfo?.address && <div className="flex items-center gap-2"><span>📍</span> {personalInfo.address}</div>}
                    {personalInfo?.website && <div className="flex items-center gap-2"><span>🌐</span> {personalInfo.website}</div>}
                </div>

                {/* 3. Skills */}
                {skills && skills.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2 uppercase" style={{ fontFamily: headingFont }}>
                            {t('editor.sections.skills')}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => {
                                const name = getSkillName(skill);
                                return name ? (
                                    <span key={index} className="bg-white/20 px-2 py-1 rounded text-xs">
                                        {name}
                                    </span>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}

                {/* 8. Languages */}
                {languages && languages.length > 0 && (
                    <div className="mt-auto">
                        <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2 uppercase" style={{ fontFamily: headingFont }}>
                            {t('editor.sections.languages')}
                        </h3>
                        <div className="space-y-2">
                            {languages.map((lang, index) => {
                                const name = getLangName(lang);
                                const level = getLangLevel(lang);
                                return name ? (
                                    <div key={index} className="flex justify-between text-sm">
                                        <span>{name}</span>
                                        <span className="opacity-75">{level}</span>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="w-2/3 p-6 md:p-8 max-w-full min-w-0 flex flex-col overflow-y-auto">
                {/* 1. Personal Information (Name + Title) */}
                <div className="mb-8 flex-shrink-0">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 break-words max-w-full" style={{ fontFamily: headingFont, color: colors.primary }}>
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 font-medium break-words max-w-full">
                        {experience?.[0]?.jobTitle || 'Professional Title'}
                    </p>
                </div>

                <div className="flex-1 space-y-8 min-h-0">
                    {/* 2. Professional Summary */}
                    {personalInfo?.summary && (
                        <div>
                            <h2 className="text-xl font-bold mb-3 border-b-2 pb-1 text-gray-700 uppercase" style={{ borderColor: colors.primary, fontFamily: headingFont }}>
                                {t('editor.sections.summary')}
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-sm break-words text-justify">
                                {personalInfo.summary}
                            </p>
                        </div>
                    )}

                    {/* 4. Projects */}
                    {projects && projects.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-4 border-b-2 pb-1 text-gray-700 uppercase" style={{ borderColor: colors.primary, fontFamily: headingFont }}>
                                {t('editor.sections.projects')}
                            </h2>
                            <div className="space-y-4">
                                {projects.map((project) => (
                                    <div key={project.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-gray-800">{project.name}</h3>
                                            {project.link && (
                                                <span className="text-xs text-blue-500 truncate ml-2">{project.link}</span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 text-sm break-words">{project.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 5. Experience */}
                    {experience && experience.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-4 border-b-2 pb-1 text-gray-700 uppercase" style={{ borderColor: colors.primary, fontFamily: headingFont }}>
                                {t('editor.sections.experience')}
                            </h2>
                            <div className="space-y-6">
                                {experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-gray-800">{exp.jobTitle}</h3>
                                            <span className="text-xs text-gray-500 font-medium">
                                                {exp.startDate} - {exp.current ? t('editor.common.present') : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium mb-2 break-words" style={{ color: colors.secondary }}>{exp.company} | {exp.location}</div>
                                        <p className="text-gray-600 text-sm break-words">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 6. Education */}
                    {education && education.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-4 border-b-2 pb-1 text-gray-700 uppercase" style={{ borderColor: colors.primary, fontFamily: headingFont }}>
                                {t('editor.sections.education')}
                            </h2>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                                        <div className="text-sm font-medium text-gray-600">{edu.institution}</div>
                                        <div className="text-xs text-gray-500">
                                            {edu.startDate} - {edu.current ? t('editor.common.present') : edu.endDate}
                                        </div>
                                        {edu.description && <p className="text-gray-600 text-sm mt-1 break-words">{edu.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 7. Certifications (formerly Diplomas) */}
                    {(diplomas?.length > 0 || certifications?.length > 0) && (
                        <div>
                            <h2 className="text-xl font-bold mb-4 border-b-2 pb-1 text-gray-700 uppercase" style={{ borderColor: colors.primary, fontFamily: headingFont }}>
                                {t('editor.sections.certifications')}
                            </h2>
                            <div className="space-y-4">
                                {[...(diplomas || []), ...(certifications || [])].map((cert, index) => (
                                    <div key={cert.id || index}>
                                        <h3 className="font-bold text-gray-800">{cert.degree || cert.name}</h3>
                                        <div className="text-sm font-medium text-gray-600">{cert.institution || cert.issuer}</div>
                                        <div className="text-xs text-gray-500">
                                            {cert.startDate || cert.year} {cert.endDate ? `- ${cert.endDate}` : ''}
                                        </div>
                                        {cert.description && <p className="text-gray-600 text-sm mt-1 break-words">{cert.description}</p>}
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

export default ModernTemplate;
