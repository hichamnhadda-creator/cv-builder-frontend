import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel, getLangLabel } from './components/utils';

const Designer11 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#0d9488', secondary: '#111827' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Inter';

    return (
        <div className="flex-1 w-full h-full flex text-gray-800 font-sans" style={{ fontFamily }}>
            {/* Left Sidebar: Photo and details */}
            <div className="w-1/3 p-8 text-white flex flex-col" style={{ backgroundColor: colors.secondary }}>
                {personalInfo?.photo && (
                    <div className="w-full aspect-square rounded-2xl overflow-hidden mb-8 shadow-2xl border-4" style={{ borderColor: `${colors.primary}50` }}>
                        <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-full h-full object-cover" />
                    </div>
                )}
                
                <h1 className="text-3xl font-black mb-2" style={{ fontFamily: headingFont }}>
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                <h2 className="text-lg font-medium mb-8" style={{ color: colors.primary }}>
                    {experience?.[0]?.jobTitle || 'Professional Title'}
                </h2>

                <div className="space-y-4 text-sm font-medium opacity-90 mb-10">
                    {personalInfo?.email && <div className="flex items-center gap-3"><span className="opacity-70">✉️</span> {personalInfo.email}</div>}
                    {personalInfo?.phone && <div className="flex items-center gap-3"><span className="opacity-70">📱</span> {personalInfo.phone}</div>}
                    {personalInfo?.address && <div className="flex items-center gap-3"><span className="opacity-70">📍</span> {personalInfo.address}</div>}
                    {personalInfo?.website && <div className="flex items-center gap-3"><span className="opacity-70">🌐</span> {personalInfo.website}</div>}
                </div>

                {skills?.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-sm uppercase tracking-widest font-bold mb-4 pb-2 border-b border-white/20" style={{ color: colors.primary }}>
                            {t('editor.sections.skills')}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, idx) => {
                                const name = getSkillName(skill);
                                return name ? (
                                    <span key={idx} className="px-3 py-1 text-xs font-semibold rounded-md bg-white/10">
                                        {name}
                                    </span>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}

                {languages?.length > 0 && (
                    <div>
                        <h3 className="text-sm uppercase tracking-widest font-bold mb-4 pb-2 border-b border-white/20" style={{ color: colors.primary }}>
                            {t('editor.sections.languages')}
                        </h3>
                        <div className="space-y-3">
                            {languages.map((lang, idx) => {
                                const name = getLangName(lang);
                                const level = getLangLevel(lang);
                                const label = getLangLabel(level);
                                return name ? (
                                    <div key={idx} className="flex justify-between items-center text-sm">
                                        <span>{name}</span>
                                        <span className="text-xs opacity-70">
                                            {t(`editor.languages.levels.${label}`, { defaultValue: label })}
                                        </span>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Main Content */}
            <div className="w-2/3 p-10 bg-white">
                {personalInfo?.summary && (
                    <section className="mb-10">
                        <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: headingFont, color: colors.secondary }}>
                            {t('editor.sections.summary')}
                        </h3>
                        <p className="leading-relaxed opacity-90 text-justify text-gray-600">{personalInfo.summary}</p>
                    </section>
                )}

                {experience?.length > 0 && (
                    <section className="mb-10">
                        <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: headingFont, color: colors.secondary }}>
                            {t('editor.sections.experience')}
                        </h3>
                        <div className="space-y-8">
                            {experience.map((exp, idx) => (
                                <div key={exp.id || idx}>
                                    <h4 className="text-xl font-bold text-gray-900 mb-1">{exp.jobTitle}</h4>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="font-semibold" style={{ color: colors.primary }}>{exp.company}</span>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-sm text-gray-500">{exp.location}</span>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-sm font-medium bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                                            {exp.startDate} - {exp.current ? t('editor.common.present') : exp.endDate}
                                        </span>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-600">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {education?.length > 0 && (
                    <section>
                        <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: headingFont, color: colors.secondary }}>
                            {t('editor.sections.education')}
                        </h3>
                        <div className="space-y-6">
                            {education.map((edu, idx) => (
                                <div key={edu.id || idx}>
                                    <h4 className="text-lg font-bold text-gray-900 mb-1">{edu.degree}</h4>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-medium" style={{ color: colors.primary }}>{edu.institution}</span>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-sm font-medium bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                                            {edu.startDate} - {edu.current ? t('editor.common.present') : edu.endDate}
                                        </span>
                                    </div>
                                    {edu.description && <p className="text-sm text-gray-600">{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {projects?.length > 0 && (
                    <section className="mt-10 mb-10">
                        <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: headingFont, color: colors.secondary }}>
                            {t('editor.sections.projects')}
                        </h3>
                        <div className="space-y-6">
                            {projects.map((proj, idx) => (
                                <div key={proj.id || idx}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-lg font-bold text-gray-900">{proj.name}</h4>
                                        {proj.link && <a href={proj.link} className="text-sm text-blue-600 hover:underline">- {proj.link}</a>}
                                    </div>
                                    {proj.description && <p className="text-sm text-gray-600">{proj.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {certifications?.length > 0 && (
                    <section className="mt-10">
                        <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: headingFont, color: colors.secondary }}>
                            {t('editor.sections.certifications')}
                        </h3>
                        <div className="space-y-6">
                            {certifications.map((cert, idx) => (
                                <div key={cert.id || idx}>
                                    <h4 className="text-lg font-bold text-gray-900 mb-1">{cert.name || cert.degree}</h4>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-medium" style={{ color: colors.primary }}>{cert.issuer || cert.institution}</span>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-sm font-medium bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                                            {cert.year || cert.startDate}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Designer11;
