import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

// LAYOUT: Creative Dark — bold dark background, accent color details, photo in circular frame, right-aligned header
const Dark1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#f59e0b', secondary: '#0f172a' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';
    const accent = colors.primary;
    const dark = colors.secondary;

    return (
        <div className="min-h-full overflow-hidden" style={{ fontFamily, backgroundColor: dark, color: '#e2e8f0' }}>
            {/* CREATIVE HEADER — split diagonal: name left, photo right with accent bg block */}
            <div className="relative flex items-stretch">
                {/* Left — name & title */}
                <div className="flex-1 px-10 py-10 flex flex-col justify-center" style={{ backgroundColor: dark }}>
                    <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>
                        Curriculum Vitae
                    </div>
                    <h1 className="text-5xl font-black mb-2 leading-none text-white" style={{ fontFamily: headingFont }}>
                        {personalInfo?.fullName?.split(' ')[0] || 'First'}<br />
                        <span style={{ color: accent }}>{personalInfo?.fullName?.split(' ').slice(1).join(' ') || 'Last Name'}</span>
                    </h1>
                    <h2 className="text-base font-medium mt-3 mb-5 text-slate-400">
                        {experience?.[0]?.jobTitle || 'Professional Title'}
                    </h2>
                    <div className="space-y-1 text-sm text-slate-400">
                        {personalInfo?.email && <div>✉ {personalInfo.email}</div>}
                        {personalInfo?.phone && <div>☎ {personalInfo.phone}</div>}
                        {personalInfo?.address && <div>📍 {personalInfo.address}</div>}
                        {personalInfo?.website && <div>🌐 {personalInfo.website}</div>}
                    </div>
                </div>

                {/* Right — accent block with photo */}
                <div className="w-48 flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${accent}20` }}>
                    {personalInfo?.photo ? (
                        <img
                            src={personalInfo.photo}
                            alt={personalInfo.fullName}
                            className="w-32 h-32 rounded-full object-cover shadow-xl"
                            style={{ border: `4px solid ${accent}` }}
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full flex items-center justify-center text-3xl font-black"
                            style={{ backgroundColor: accent, color: dark }}>
                            {(personalInfo?.fullName || 'U')[0]}
                        </div>
                    )}
                </div>
            </div>

            {/* BODY — 2 columns */}
            <div className="grid grid-cols-3 border-t" style={{ borderColor: `${accent}30` }}>
                {/* LEFT SIDEBAR — skills, languages, certs */}
                <div className="col-span-1 px-6 py-8 space-y-8 border-r" style={{ borderColor: `${accent}20`, backgroundColor: `${accent}05` }}>
                    {skills?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: accent }}>
                                {t('editor.sections.skills')}
                            </h3>
                            <div className="space-y-2">
                                {skills.map((skill, idx) => {
                                    const name = getSkillName(skill);
                                    return name ? (
                                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
                                            {name}
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </section>
                    )}

                    {languages?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: accent }}>
                                {t('editor.sections.languages')}
                            </h3>
                            <div className="space-y-3">
                                {languages.map((lang, idx) => {
                                    const name = getLangName(lang);
                                    const level = getLangLevel(lang);
                                    return name ? (
                                        <div key={idx}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-slate-200 font-medium">{name}</span>
                                                <span className="text-slate-400 text-xs">{level}</span>
                                            </div>
                                            <div className="h-1 rounded-full bg-slate-700">
                                                <div className="h-1 rounded-full" style={{ width: '70%', backgroundColor: accent }} />
                                            </div>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </section>
                    )}

                    {certifications?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: accent }}>
                                {t('editor.sections.certifications')}
                            </h3>
                            <div className="space-y-3">
                                {certifications.map((cert, idx) => (
                                    <div key={cert.id || idx} className="border-l-2 pl-3" style={{ borderColor: accent }}>
                                        <div className="text-sm font-bold text-white">{cert.name || cert.degree}</div>
                                        <div className="text-xs text-slate-400">{cert.issuer || cert.institution}</div>
                                        <div className="text-xs text-slate-500">{cert.year || cert.startDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* RIGHT MAIN */}
                <div className="col-span-2 px-8 py-8 space-y-8">
                    {personalInfo?.summary && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>
                                {t('editor.sections.summary')}
                            </h3>
                            <p className="text-sm text-slate-300 leading-relaxed">{personalInfo.summary}</p>
                        </section>
                    )}

                    {experience?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: accent }}>
                                {t('editor.sections.experience')}
                            </h3>
                            <div className="space-y-5">
                                {experience.map((exp, idx) => (
                                    <div key={exp.id || idx} className="relative pl-5">
                                        <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                                        <div className="absolute left-[3.5px] top-4 bottom-0 w-[1px]" style={{ backgroundColor: `${accent}30` }} />
                                        <div className="flex justify-between items-start mb-0.5">
                                            <h4 className="font-bold text-white">{exp.jobTitle}</h4>
                                            <span className="text-xs text-slate-400 ml-2 shrink-0">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                        </div>
                                        <div className="text-sm font-medium mb-1.5" style={{ color: accent }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
                                        <p className="text-sm text-slate-400 leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: accent }}>
                                {t('editor.sections.education')}
                            </h3>
                            <div className="space-y-3">
                                {education.map((edu, idx) => (
                                    <div key={edu.id || idx} className="flex gap-4 items-start">
                                        <div className="text-xs text-slate-500 shrink-0 w-20 text-right pt-0.5">
                                            {edu.startDate}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-white text-sm">{edu.degree}</h4>
                                            <div className="text-sm" style={{ color: accent }}>{edu.institution}</div>
                                            {edu.description && <p className="text-xs text-slate-400 mt-1">{edu.description}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects?.length > 0 && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: accent }}>
                                {t('editor.sections.projects')}
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {projects.map((proj, idx) => (
                                    <div key={proj.id || idx} className="p-3 rounded-xl border" style={{ borderColor: `${accent}30`, backgroundColor: `${accent}08` }}>
                                        <h4 className="font-bold text-sm text-white mb-1">{proj.name}</h4>
                                        <p className="text-xs text-slate-400">{proj.description}</p>
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

export default Dark1;
