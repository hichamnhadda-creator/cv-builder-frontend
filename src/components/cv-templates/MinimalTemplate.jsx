import React from 'react';
import { useTranslation } from 'react-i18next';

const MinimalTemplate = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#000000', secondary: '#737373' };
    const fontFamily = customization?.fonts?.body || 'Arial';
    const headingFont = customization?.fonts?.heading || 'Arial';

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
        <div className="bg-white p-10 md:p-12 lg:p-16 h-full shadow-lg overflow-hidden text-gray-900 break-words max-w-full flex flex-col" style={{ fontFamily }}>
            {/* 1. Personal Information (Minimal Header) */}
            <div className="mb-12 flex-shrink-0">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight break-words max-w-full" style={{ color: colors.primary, fontFamily: headingFont }}>
                            {personalInfo?.fullName || 'Your Name'}
                        </h1>
                        <div className="text-sm font-light text-gray-500 uppercase tracking-widest flex flex-wrap gap-x-6 gap-y-2 break-words">
                            {personalInfo?.email && <span>{personalInfo.email}</span>}
                            {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                            {personalInfo?.address && <span>{personalInfo.address}</span>}
                            {personalInfo?.website && <span>{personalInfo.website}</span>}
                        </div>
                    </div>
                    {personalInfo?.photo && (
                        <div className="w-24 h-24 rounded-full overflow-hidden ml-6 border border-gray-100 flex-shrink-0">
                            <img
                                src={personalInfo.photo}
                                alt={personalInfo.fullName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 md:gap-12 flex-1 min-h-0">
                {/* Left Column - Details */}
                <div className="col-span-4 space-y-12 min-w-0 flex flex-col overflow-y-auto">
                    {/* 3. Skills */}
                    {skills && skills.length > 0 && (
                        <div>
                            <h2 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400" style={{ fontFamily: headingFont }}>
                                {t('editor.sections.skills')}
                            </h2>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {skills.map((skill, index) => {
                                    const name = getSkillName(skill);
                                    return name ? (
                                        <li key={index} className="border-b border-gray-100 pb-1">{name}</li>
                                    ) : null;
                                })}
                            </ul>
                        </div>
                    )}

                    {/* 6. Education */}
                    {education && education.length > 0 && (
                        <div className="min-w-0">
                            <h2 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400" style={{ fontFamily: headingFont }}>
                                {t('editor.sections.education')}
                            </h2>
                            <div className="space-y-6">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="font-semibold text-sm mb-1">{edu.institution}</div>
                                        <div className="text-sm text-gray-600 mb-1">{edu.degree}</div>
                                        <div className="text-xs text-gray-400">
                                            {edu.startDate} – {edu.current ? t('editor.common.present') : edu.endDate}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 7. Certifications */}
                    {(diplomas?.length > 0 || certifications?.length > 0) && (
                        <div>
                            <h2 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400" style={{ fontFamily: headingFont }}>
                                {t('editor.sections.certifications')}
                            </h2>
                            <div className="space-y-6">
                                {[...(diplomas || []), ...(certifications || [])].map((cert, index) => (
                                    <div key={cert.id || index}>
                                        <div className="font-semibold text-sm mb-1">{cert.institution || cert.issuer}</div>
                                        <div className="text-sm text-gray-600 mb-1">{cert.degree || cert.name}</div>
                                        <div className="text-xs text-gray-400">
                                            {cert.startDate || cert.year} {cert.endDate ? `– ${cert.endDate}` : ''}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 8. Languages */}
                    {languages && languages.length > 0 && (
                        <div>
                            <h2 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400" style={{ fontFamily: headingFont }}>
                                {t('editor.sections.languages')}
                            </h2>
                            <div className="space-y-2 text-sm text-gray-600">
                                {languages.map((lang, index) => {
                                    const name = getLangName(lang);
                                    const level = getLangLevel(lang);
                                    return name ? (
                                        <div key={index} className="flex justify-between">
                                            <span>{name}</span>
                                            <span className="text-gray-400">{level}</span>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Main Content */}
                <div className="col-span-8 space-y-12 min-w-0 flex flex-col overflow-y-auto">
                    {/* 2. Professional Summary */}
                    {personalInfo?.summary && (
                        <div className="min-w-0">
                            <h2 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400" style={{ fontFamily: headingFont }}>
                                {t('editor.sections.summary')}
                            </h2>
                            <p className="text-sm leading-relaxed text-gray-700 break-words text-justify">
                                {personalInfo.summary}
                            </p>
                        </div>
                    )}

                    {/* 4. Projects */}
                    {projects && projects.length > 0 && (
                        <div className="min-w-0">
                            <h2 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400" style={{ fontFamily: headingFont }}>
                                {t('editor.sections.projects')}
                            </h2>
                            <div className="space-y-8">
                                {projects.map((project) => (
                                    <div key={project.id}>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="font-bold text-gray-900">{project.name}</h3>
                                            {project.link && (
                                                <span className="text-xs text-gray-400 italic">{project.link}</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-700 leading-relaxed break-words">
                                            {project.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 5. Experience */}
                    {experience && experience.length > 0 && (
                        <div className="flex-1">
                            <h2 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400" style={{ fontFamily: headingFont }}>
                                {t('editor.sections.experience')}
                            </h2>
                            <div className="space-y-8">
                                {experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="font-bold text-gray-900">{exp.jobTitle}</h3>
                                            <span className="text-xs text-gray-400">
                                                {exp.startDate} – {exp.current ? t('editor.common.present') : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500 mb-3">{exp.company} | {exp.location}</div>
                                        <p className="text-sm text-gray-700 leading-relaxed break-words">
                                            {exp.description}
                                        </p>
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

export default MinimalTemplate;
