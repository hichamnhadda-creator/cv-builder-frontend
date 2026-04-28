import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

// LAYOUT: Classic — centered header with photo, full-width body, timeline experience
const Modern1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#2563eb', secondary: '#1e293b' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    return (
        <div className="min-h-full bg-white text-gray-800 overflow-hidden" style={{ fontFamily }}>
            {/* CLASSIC HEADER — centered, with large name, photo above */}
            <div className="py-10 px-8 text-center border-b-4" style={{ borderColor: colors.primary }}>
                {personalInfo?.photo && (
                    <img
                        src={personalInfo.photo}
                        alt={personalInfo.fullName}
                        className="w-28 h-28 rounded-full object-cover mx-auto mb-4 shadow-lg"
                        style={{ border: `4px solid ${colors.primary}` }}
                    />
                )}
                <h1 className="text-4xl font-black tracking-tight mb-1" style={{ fontFamily: headingFont, color: colors.secondary }}>
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                <h2 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
                    {experience?.[0]?.jobTitle || 'Professional Title'}
                </h2>
                <div className="flex flex-wrap justify-center gap-5 text-sm text-gray-500">
                    {personalInfo?.email && <span>✉ {personalInfo.email}</span>}
                    {personalInfo?.phone && <span>☎ {personalInfo.phone}</span>}
                    {personalInfo?.address && <span>📍 {personalInfo.address}</span>}
                    {personalInfo?.website && <span>🌐 {personalInfo.website}</span>}
                </div>
            </div>

            {/* BODY — two columns: main (2/3) + sidebar (1/3) */}
            <div className="grid grid-cols-3 min-h-screen">
                {/* MAIN CONTENT */}
                <div className="col-span-2 px-10 py-8 space-y-8 border-r border-gray-100">
                    {personalInfo?.summary && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b" style={{ color: colors.primary, borderColor: colors.primary }}>
                                {t('editor.sections.summary')}
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-600">{personalInfo.summary}</p>
                        </section>
                    )}

                    {experience?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 pb-1 border-b" style={{ color: colors.primary, borderColor: colors.primary }}>
                                {t('editor.sections.experience')}
                            </h3>
                            <div className="space-y-6">
                                {experience.map((exp, idx) => (
                                    <div key={exp.id || idx} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: colors.primary }} />
                                            {idx < experience.length - 1 && <div className="w-0.5 flex-1 mt-1" style={{ backgroundColor: `${colors.primary}30` }} />}
                                        </div>
                                        <div className="pb-4 flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-gray-800">{exp.jobTitle}</h4>
                                                <span className="text-xs text-gray-400 ml-2 shrink-0">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                                            </div>
                                            <div className="text-sm font-medium mt-0.5 mb-1" style={{ color: colors.primary }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
                                            <p className="text-sm text-gray-500 leading-relaxed">{exp.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 pb-1 border-b" style={{ color: colors.primary, borderColor: colors.primary }}>
                                {t('editor.sections.education')}
                            </h3>
                            <div className="space-y-4">
                                {education.map((edu, idx) => (
                                    <div key={edu.id || idx} className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                                            <div className="text-sm" style={{ color: colors.primary }}>{edu.institution}</div>
                                            {edu.description && <p className="text-xs text-gray-500 mt-1">{edu.description}</p>}
                                        </div>
                                        <span className="text-xs text-gray-400 shrink-0 ml-2">{edu.startDate} — {edu.current ? 'Present' : edu.endDate}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 pb-1 border-b" style={{ color: colors.primary, borderColor: colors.primary }}>
                                {t('editor.sections.projects')}
                            </h3>
                            <div className="space-y-3">
                                {projects.map((proj, idx) => (
                                    <div key={proj.id || idx}>
                                        <h4 className="font-bold text-sm text-gray-800">{proj.name}</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* SIDEBAR */}
                <div className="px-6 py-8 space-y-8 bg-gray-50">
                    {skills?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: colors.primary }}>
                                {t('editor.sections.skills')}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, idx) => {
                                    const name = getSkillName(skill);
                                    return name ? (
                                        <span key={idx} className="text-xs px-2 py-1 rounded font-medium" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                            {name}
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        </section>
                    )}

                    {languages?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: colors.primary }}>
                                {t('editor.sections.languages')}
                            </h3>
                            <div className="space-y-2">
                                {languages.map((lang, idx) => {
                                    const name = getLangName(lang);
                                    const level = getLangLevel(lang);
                                    return name ? (
                                        <div key={idx} className="flex justify-between text-sm">
                                            <span className="font-medium text-gray-700">{name}</span>
                                            <span className="text-gray-400 text-xs">{level}</span>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </section>
                    )}

                    {certifications?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: colors.primary }}>
                                {t('editor.sections.certifications')}
                            </h3>
                            <div className="space-y-3">
                                {certifications.map((cert, idx) => (
                                    <div key={cert.id || idx} className="border-l-2 pl-2" style={{ borderColor: colors.primary }}>
                                        <div className="text-sm font-bold text-gray-700">{cert.name || cert.degree}</div>
                                        <div className="text-xs text-gray-400">{cert.issuer || cert.institution}</div>
                                        <div className="text-xs text-gray-400">{cert.year || cert.startDate}</div>
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

export default Modern1;
