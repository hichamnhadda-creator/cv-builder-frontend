import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel, getLangLabel } from './components/utils';

const Modern8 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#2563eb', secondary: '#1e293b' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    return (
        <div className="bg-gray-50 w-full h-full flex-1 flex flex-col text-gray-800 font-sans" style={{ fontFamily }}>
            {/* Header: Name Left, Image Right */}
            <div className="bg-white px-10 py-12 flex justify-between items-center shadow-sm">
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-black mb-3 tracking-tighter" style={{ fontFamily: headingFont, color: colors.primary }}>
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    <h2 className="text-2xl font-medium mb-6" style={{ color: colors.secondary }}>
                        {experience?.[0]?.jobTitle || 'Professional Title'}
                    </h2>
                    <div className="flex flex-col gap-2 text-sm font-medium opacity-80">
                        {personalInfo?.email && <span className="flex items-center gap-2"><span className="w-5 text-center" style={{ color: colors.primary }}>✉️</span> {personalInfo.email}</span>}
                        {personalInfo?.phone && <span className="flex items-center gap-2"><span className="w-5 text-center" style={{ color: colors.primary }}>📱</span> {personalInfo.phone}</span>}
                        {personalInfo?.address && <span className="flex items-center gap-2"><span className="w-5 text-center" style={{ color: colors.primary }}>📍</span> {personalInfo.address}</span>}
                        {personalInfo?.website && <span className="flex items-center gap-2"><span className="w-5 text-center" style={{ color: colors.primary }}>🌐</span> {personalInfo.website}</span>}
                    </div>
                </div>
                {personalInfo?.photo && (
                    <div className="w-40 h-40 rounded-2xl overflow-hidden shadow-xl border-4 flex-shrink-0" style={{ borderColor: 'white' }}>
                        <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-full h-full object-cover" />
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 flex-1">
                <div className="md:col-span-2 space-y-10">
                    {personalInfo?.summary && (
                        <section>
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3" style={{ fontFamily: headingFont, color: colors.primary }}>
                                <span className="w-8 h-1 rounded-full" style={{ backgroundColor: colors.primary }}></span>
                                {t('editor.sections.summary')}
                            </h3>
                            <p className="leading-relaxed opacity-90 text-justify">{personalInfo.summary}</p>
                        </section>
                    )}

                    {experience?.length > 0 && (
                        <section>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: headingFont, color: colors.primary }}>
                                <span className="w-8 h-1 rounded-full" style={{ backgroundColor: colors.primary }}></span>
                                {t('editor.sections.experience')}
                            </h3>
                            <div className="space-y-8">
                                {experience.map((exp, idx) => (
                                    <div key={exp.id || idx} className="relative pl-6 border-l-2" style={{ borderColor: `${colors.primary}40` }}>
                                        <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1.5" style={{ backgroundColor: colors.primary }}></div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="text-xl font-bold text-gray-900">{exp.jobTitle}</h4>
                                            <span className="text-sm font-semibold opacity-75">{exp.startDate} - {exp.current ? t('editor.common.present') : exp.endDate}</span>
                                        </div>
                                        <div className="text-md font-medium mb-3" style={{ color: colors.secondary }}>{exp.company} • {exp.location}</div>
                                        <p className="text-sm leading-relaxed opacity-90">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects?.length > 0 && (
                        <section>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: headingFont, color: colors.primary }}>
                                <span className="w-8 h-1 rounded-full" style={{ backgroundColor: colors.primary }}></span>
                                {t('editor.sections.projects')}
                            </h3>
                            <div className="space-y-8">
                                {projects.map((proj, idx) => (
                                    <div key={proj.id || idx} className="relative pl-6 border-l-2" style={{ borderColor: `${colors.primary}40` }}>
                                        <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1.5" style={{ backgroundColor: colors.primary }}></div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="text-xl font-bold text-gray-900">{proj.name}</h4>
                                            {proj.link && <a href={proj.link} className="text-sm font-semibold opacity-75 hover:underline" style={{ color: colors.primary }}>{proj.link}</a>}
                                        </div>
                                        {proj.description && <p className="text-sm leading-relaxed opacity-90">{proj.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="space-y-10">
                    {education?.length > 0 && (
                        <section>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: headingFont, color: colors.primary }}>
                                <span className="w-6 h-1 rounded-full" style={{ backgroundColor: colors.primary }}></span>
                                {t('editor.sections.education')}
                            </h3>
                            <div className="space-y-6">
                                {education.map((edu, idx) => (
                                    <div key={edu.id || idx}>
                                        <h4 className="text-lg font-bold text-gray-900 mb-1">{edu.degree}</h4>
                                        <div className="text-sm font-medium mb-1" style={{ color: colors.secondary }}>{edu.institution}</div>
                                        <div className="text-xs font-semibold opacity-60 mb-2">{edu.startDate} - {edu.current ? t('editor.common.present') : edu.endDate}</div>
                                        {edu.description && <p className="text-sm opacity-90">{edu.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills?.length > 0 && (
                        <section>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3" style={{ fontFamily: headingFont, color: colors.primary }}>
                                <span className="w-6 h-1 rounded-full" style={{ backgroundColor: colors.primary }}></span>
                                {t('editor.sections.skills')}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, idx) => {
                                    const name = getSkillName(skill);
                                    return name ? (
                                        <span key={idx} className="px-3 py-1 text-sm font-medium rounded-md" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                            {name}
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        </section>
                    )}

                    {languages?.length > 0 && (
                        <section>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3" style={{ fontFamily: headingFont, color: colors.primary }}>
                                <span className="w-6 h-1 rounded-full" style={{ backgroundColor: colors.primary }}></span>
                                {t('editor.sections.languages')}
                            </h3>
                            <div className="space-y-2">
                                {languages.map((lang, idx) => {
                                    const name = getLangName(lang);
                                    const level = getLangLevel(lang);
                                    const label = getLangLabel(level);
                                    return name ? (
                                        <div key={idx} className="flex justify-between items-center bg-white px-3 py-2 rounded-lg shadow-sm">
                                            <span className="font-semibold text-gray-800 text-sm">{name}</span>
                                            <span className="text-xs font-medium px-2 py-0.5 rounded opacity-80" style={{ backgroundColor: colors.primary, color: 'white' }}>
                                                {t(`editor.languages.levels.${label}`, { defaultValue: label })}
                                            </span>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </section>
                    )}

                    {certifications?.length > 0 && (
                        <section>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3" style={{ fontFamily: headingFont, color: colors.primary }}>
                                <span className="w-6 h-1 rounded-full" style={{ backgroundColor: colors.primary }}></span>
                                {t('editor.sections.certifications')}
                            </h3>
                            <div className="space-y-4">
                                {certifications.map((cert, idx) => (
                                    <div key={cert.id || idx} className="bg-white px-4 py-3 rounded-lg shadow-sm">
                                        <h4 className="font-bold text-gray-900 mb-1">{cert.name || cert.degree}</h4>
                                        <div className="text-sm font-medium mb-1" style={{ color: colors.secondary }}>{cert.issuer || cert.institution}</div>
                                        <div className="text-xs font-semibold opacity-60">{cert.year || cert.startDate}</div>
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

export default Modern8;
