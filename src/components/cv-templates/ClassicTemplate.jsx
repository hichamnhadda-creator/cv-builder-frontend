import React from 'react';
import { useTranslation } from 'react-i18next';

const ClassicTemplate = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#1f2937', secondary: '#4b5563' };
    const fontFamily = customization?.fonts?.body || 'Georgia';
    const headingFont = customization?.fonts?.heading || 'Times New Roman';

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
        <div className="bg-white p-8 md:p-10 lg:p-12 h-full shadow-lg overflow-hidden break-words max-w-full flex flex-col" style={{ fontFamily }}>
            {/* 1. Personal Information (Header) */}
            <div className="text-center border-b-2 pb-6 mb-6 flex-shrink-0" style={{ borderColor: colors.primary }}>
                {personalInfo?.photo && (
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
                        <img
                            src={personalInfo.photo}
                            alt={personalInfo.fullName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 uppercase tracking-wide break-words max-w-full leading-tight" style={{ fontFamily: headingFont, color: colors.primary }}>
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600 break-words max-w-full">
                    {personalInfo?.email && <span className="max-w-full">{personalInfo.email}</span>}
                    {personalInfo?.phone && <span className="max-w-full"> {personalInfo.phone}</span>}
                    {personalInfo?.address && <span className="max-w-full"> {personalInfo.address}</span>}
                    {personalInfo?.linkedin && <span className="max-w-full"> {personalInfo.linkedin}</span>}
                    {personalInfo?.website && <span className="max-w-full"> {personalInfo.website}</span>}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
                {/* 2. Professional Summary */}
                {personalInfo?.summary && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold mb-2 uppercase border-b pb-1" style={{ color: colors.primary, borderColor: '#e5e7eb' }}>
                            {t('editor.sections.summary')}
                        </h2>
                        <p className="text-gray-700 text-sm leading-relaxed text-justify break-words">
                            {personalInfo.summary}
                        </p>
                    </div>
                )}

                {/* 3. Skills */}
                {skills && skills.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold mb-3 uppercase border-b pb-1" style={{ color: colors.primary, borderColor: '#e5e7eb' }}>
                            {t('editor.sections.skills')}
                        </h2>
                        <div className="text-sm text-gray-700 leading-relaxed break-words max-w-full">
                            {skills.map(s => getSkillName(s)).filter(Boolean).join(' • ')}
                        </div>
                    </div>
                )}

                {/* 4. Projects */}
                {projects && projects.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold mb-4 uppercase border-b pb-1" style={{ color: colors.primary, borderColor: '#e5e7eb' }}>
                            {t('editor.sections.projects')}
                        </h2>
                        <div className="space-y-4">
                            {projects.map((project) => (
                                <div key={project.id}>
                                    <div className="flex justify-between items-baseline font-bold text-gray-800">
                                        <h3>{project.name}</h3>
                                        {project.link && (
                                            <span className="text-xs font-normal text-blue-600 truncate ml-2 italic">{project.link}</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-700 break-words mt-1">{project.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 5. Experience */}
                {experience && experience.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold mb-4 uppercase border-b pb-1" style={{ color: colors.primary, borderColor: '#e5e7eb' }}>
                            {t('editor.sections.experience')}
                        </h2>
                        <div className="space-y-5">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline font-bold text-gray-800">
                                        <h3>{exp.jobTitle}</h3>
                                        <span className="text-sm font-normal">{exp.startDate} – {exp.current ? t('editor.common.present') : exp.endDate}</span>
                                    </div>
                                    <div className="text-sm font-semibold italic mb-2" style={{ color: colors.secondary }}>
                                        {exp.company}, {exp.location}
                                    </div>
                                    <p className="text-sm text-gray-700 text-justify break-words">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 6. Education */}
                {education && education.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold mb-4 uppercase border-b pb-1" style={{ color: colors.primary, borderColor: '#e5e7eb' }}>
                            {t('editor.sections.education')}
                        </h2>
                        <div className="space-y-3">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline font-bold text-gray-800">
                                        <h3>{edu.institution}</h3>
                                        <span className="text-sm font-normal">{edu.startDate} – {edu.current ? t('editor.common.present') : edu.endDate}</span>
                                    </div>
                                    <div className="text-sm" style={{ color: colors.secondary }}>
                                        {edu.degree}
                                    </div>
                                    {edu.description && <p className="text-sm text-gray-600 mt-1 break-words">{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 7. Certifications */}
                {(diplomas?.length > 0 || certifications?.length > 0) && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold mb-4 uppercase border-b pb-1" style={{ color: colors.primary, borderColor: '#e5e7eb' }}>
                            {t('editor.sections.certifications')}
                        </h2>
                        <div className="space-y-3">
                            {[...(diplomas || []), ...(certifications || [])].map((cert, index) => (
                                <div key={cert.id || index}>
                                    <div className="flex justify-between items-baseline font-bold text-gray-800">
                                        <h3>{cert.degree || cert.name}</h3>
                                        <span className="text-sm font-normal">{cert.startDate || cert.year} {cert.endDate ? `– ${cert.endDate}` : ''}</span>
                                    </div>
                                    <div className="text-sm" style={{ color: colors.secondary }}>
                                        {cert.institution || cert.issuer}
                                    </div>
                                    {cert.description && <p className="text-sm text-gray-600 mt-1 break-words">{cert.description}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 8. Languages */}
                {languages && languages.length > 0 && (
                    <div className="mt-auto pt-4">
                        <h2 className="text-lg font-bold mb-3 uppercase border-b pb-1" style={{ color: colors.primary, borderColor: '#e5e7eb' }}>
                            {t('editor.sections.languages')}
                        </h2>
                        <ul className="text-sm text-gray-700 flex flex-wrap gap-x-6 gap-y-2 break-words max-w-full">
                            {languages.map((lang, index) => {
                                const name = getLangName(lang);
                                const level = getLangLevel(lang);
                                return name ? (
                                    <li key={index} className="max-w-full">
                                        <span className="font-semibold">{name}:</span> {level}
                                    </li>
                                ) : null;
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassicTemplate;
