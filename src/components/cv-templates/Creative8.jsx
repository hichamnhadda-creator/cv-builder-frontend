import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel, getLangLabel } from './components/utils';

const Creative8 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#0f172a', secondary: '#334155' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    return (
        <div className="bg-white w-full h-full flex-1 flex flex-col text-gray-800 font-sans" style={{ fontFamily }}>
            {/* Header: Photo Top Center */}
            <div className="pt-12 pb-8 px-8 flex flex-col items-center text-center border-b-[6px]" style={{ borderColor: colors.primary }}>
                {personalInfo?.photo && (
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 shadow-lg mb-6" style={{ borderColor: colors.primary }}>
                        <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-full h-full object-cover" />
                    </div>
                )}
                <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight" style={{ fontFamily: headingFont, color: colors.primary }}>
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                <h2 className="text-xl md:text-2xl font-medium mb-4 opacity-80" style={{ color: colors.secondary }}>
                    {experience?.[0]?.jobTitle || 'Professional Title'}
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium opacity-90">
                    {personalInfo?.email && <span>✉️ {personalInfo.email}</span>}
                    {personalInfo?.phone && <span>📱 {personalInfo.phone}</span>}
                    {personalInfo?.address && <span>📍 {personalInfo.address}</span>}
                    {personalInfo?.website && <span>🌐 {personalInfo.website}</span>}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl w-full mx-auto p-8 grid grid-cols-1 md:grid-cols-12 gap-8 flex-1">
                <div className="md:col-span-8 space-y-8">
                    {personalInfo?.summary && (
                        <section>
                            <h3 className="text-2xl font-bold mb-4 uppercase tracking-wider" style={{ fontFamily: headingFont, color: colors.primary }}>
                                {t('editor.sections.summary')}
                            </h3>
                            <p className="leading-relaxed opacity-90">{personalInfo.summary}</p>
                        </section>
                    )}

                    {experience?.length > 0 && (
                        <section>
                            <h3 className="text-2xl font-bold mb-6 uppercase tracking-wider border-b-2 pb-2" style={{ fontFamily: headingFont, color: colors.primary, borderColor: `${colors.primary}30` }}>
                                {t('editor.sections.experience')}
                            </h3>
                            <div className="space-y-6">
                                {experience.map((exp, idx) => (
                                    <div key={exp.id || idx}>
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                                            <h4 className="text-xl font-bold text-gray-900">{exp.jobTitle}</h4>
                                            <span className="text-sm font-semibold py-1 px-3 rounded-full bg-gray-100" style={{ color: colors.primary }}>
                                                {exp.startDate} - {exp.current ? t('editor.common.present') : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-md font-medium mb-2" style={{ color: colors.secondary }}>{exp.company} | {exp.location}</div>
                                        <p className="text-sm leading-relaxed opacity-90">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects?.length > 0 && (
                        <section>
                            <h3 className="text-2xl font-bold mb-6 uppercase tracking-wider border-b-2 pb-2" style={{ fontFamily: headingFont, color: colors.primary, borderColor: `${colors.primary}30` }}>
                                {t('editor.sections.projects')}
                            </h3>
                            <div className="space-y-6">
                                {projects.map((proj, idx) => (
                                    <div key={proj.id || idx}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="text-xl font-bold text-gray-900">{proj.name}</h4>
                                            {proj.link && <a href={proj.link} className="text-sm font-medium hover:underline" style={{ color: colors.primary }}>{proj.link}</a>}
                                        </div>
                                        {proj.description && <p className="text-sm leading-relaxed opacity-90">{proj.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education?.length > 0 && (
                        <section>
                            <h3 className="text-2xl font-bold mb-6 uppercase tracking-wider border-b-2 pb-2" style={{ fontFamily: headingFont, color: colors.primary, borderColor: `${colors.primary}30` }}>
                                {t('editor.sections.education')}
                            </h3>
                            <div className="space-y-6">
                                {education.map((edu, idx) => (
                                    <div key={edu.id || idx}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="text-xl font-bold text-gray-900">{edu.degree}</h4>
                                            <span className="text-sm font-semibold text-gray-500">{edu.startDate} - {edu.current ? t('editor.common.present') : edu.endDate}</span>
                                        </div>
                                        <div className="text-md font-medium" style={{ color: colors.secondary }}>{edu.institution}</div>
                                        {edu.description && <p className="text-sm mt-2 opacity-90">{edu.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="md:col-span-4 space-y-8">
                    {skills?.length > 0 && (
                        <section className="bg-gray-50 p-6 rounded-2xl">
                            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider" style={{ fontFamily: headingFont, color: colors.primary }}>
                                {t('editor.sections.skills')}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, idx) => {
                                    const name = getSkillName(skill);
                                    return name ? (
                                        <span key={idx} className="px-3 py-1.5 rounded bg-white border shadow-sm text-sm font-medium" style={{ color: colors.secondary }}>
                                            {name}
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        </section>
                    )}

                    {languages?.length > 0 && (
                        <section className="bg-gray-50 p-6 rounded-2xl">
                            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider" style={{ fontFamily: headingFont, color: colors.primary }}>
                                {t('editor.sections.languages')}
                            </h3>
                            <div className="space-y-3">
                                {languages.map((lang, idx) => {
                                    const name = getLangName(lang);
                                    const level = getLangLevel(lang);
                                    const label = getLangLabel(level);
                                    return name ? (
                                        <div key={idx} className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-0">
                                            <span className="font-semibold text-gray-800">{name}</span>
                                            <span className="text-xs font-medium px-2 py-1 rounded bg-white shadow-sm" style={{ color: colors.primary }}>
                                                {t(`editor.languages.levels.${label}`, { defaultValue: label })}
                                            </span>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </section>
                    )}

                    {certifications?.length > 0 && (
                        <section className="bg-gray-50 p-6 rounded-2xl">
                            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider" style={{ fontFamily: headingFont, color: colors.primary }}>
                                {t('editor.sections.certifications')}
                            </h3>
                            <div className="space-y-4">
                                {certifications.map((cert, idx) => (
                                    <div key={cert.id || idx}>
                                        <h4 className="font-bold text-gray-900">{cert.name || cert.degree}</h4>
                                        <div className="text-sm font-medium" style={{ color: colors.secondary }}>{cert.issuer || cert.institution}</div>
                                        <div className="text-xs opacity-70 mt-1">{cert.year || cert.startDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Creative8;
