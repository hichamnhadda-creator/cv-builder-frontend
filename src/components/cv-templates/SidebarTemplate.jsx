import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel, getLangLabel } from './components/utils';

const SidebarTemplate = ({ data, customization }) => {
    const { t, i18n } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#1e293b', secondary: '#475569' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    const isRtl = i18n.dir() === 'rtl';

    return (
        <div className={`flex flex-grow ${isRtl ? 'flex-row-reverse' : 'flex-row'} min-h-[1123px] w-full bg-white shadow-none overflow-hidden break-words max-w-full`} style={{ fontFamily }} dir={i18n.dir()}>
            {/* Sidebar (Start) */}
            <div className="w-1/3 p-6 md:p-8 text-white max-w-full relative z-10 flex flex-col text-start" style={{ backgroundColor: colors.primary }}>
                {/* Photo */}
                {personalInfo?.photo && (
                    <div className="w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-white/20 flex-shrink-0 shadow-lg">
                        <img
                            src={personalInfo.photo}
                            alt={personalInfo.fullName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Contact Info */}
                <div className="mb-8 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest opacity-60 mb-2 border-b border-white/20 pb-1">{t('editor.sections.personal')}</h3>
                    <div className="space-y-2 text-sm opacity-90 break-words">
                        {personalInfo?.email && <div className="flex items-center gap-2"><span>✉️</span> {personalInfo.email}</div>}
                        {personalInfo?.phone && <div className="flex items-center gap-2"><span>📱</span> {personalInfo.phone}</div>}
                        {personalInfo?.address && <div className="flex items-center gap-2"><span>📍</span> {personalInfo.address}</div>}
                        {personalInfo?.website && <div className="flex items-center gap-2"><span>🌐</span> {personalInfo.website}</div>}
                    </div>
                </div>

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-widest opacity-60 mb-3 border-b border-white/20 pb-1">
                            {t('editor.sections.skills')}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => {
                                const name = getSkillName(skill);
                                return name ? (
                                    <span key={index} className="bg-white/10 px-2 py-1 rounded text-xs border border-white/10">
                                        {name}
                                    </span>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <div className="mt-auto">
                        <h3 className="text-sm font-bold uppercase tracking-widest opacity-60 mb-3 border-b border-white/20 pb-1">
                            {t('editor.sections.languages')}
                        </h3>
                        <div className="space-y-2">
                            {languages.map((lang, index) => {
                                const name = getLangName(lang);
                                const level = getLangLevel(lang);
                                const label = getLangLabel(level);
                                return name ? (
                                    <div key={index} className="flex justify-between text-sm">
                                        <span className="font-medium">{name}</span>
                                        <span className="opacity-75">{t(`editor.languages.levels.${label}`, { defaultValue: label })}</span>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content (End) */}
            <div className="w-2/3 p-8 md:p-12 max-w-full min-w-0 flex flex-col overflow-y-auto text-start">
                <header className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight text-slate-800" style={{ fontFamily: headingFont }}>
                        {personalInfo?.fullName || t('common.yourName')}
                    </h1>
                    <p className="text-xl font-medium text-slate-500 uppercase tracking-widest">
                        {experience?.[0]?.jobTitle || t('common.professionalTitle')}
                    </p>
                    <div className={`w-20 h-2 bg-slate-800 mt-4 ${isRtl ? 'ml-auto' : ''}`} style={{ backgroundColor: colors.primary }}></div>
                </header>

                <div className="space-y-10">
                    {/* Summary */}
                    {personalInfo?.summary && (
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-3 text-slate-400">
                                <span className="w-8 h-px bg-slate-200"></span>
                                {t('editor.sections.summary')}
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-base text-justify">
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience && experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-3 text-slate-400">
                                <span className="w-8 h-px bg-slate-200"></span>
                                {t('editor.sections.experience')}
                            </h2>
                            <div className="space-y-8">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="relative">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2 gap-1">
                                            <h3 className="text-lg font-bold text-slate-800">{exp.jobTitle}</h3>
                                            <span className="text-sm font-bold text-slate-400 whitespace-nowrap">
                                                {exp.startDate} — {exp.current ? t('editor.common.present') : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm font-black mb-3 text-slate-500 uppercase tracking-wide">
                                            {exp.company} {exp.location ? `• ${exp.location}` : ''}
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-3 text-slate-400">
                                <span className="w-8 h-px bg-slate-200"></span>
                                {t('editor.sections.education')}
                            </h2>
                            <div className="space-y-6">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1 gap-1">
                                            <h3 className="text-lg font-bold text-slate-800">{edu.institution}</h3>
                                            <span className="text-sm font-bold text-slate-400 whitespace-nowrap">
                                                {edu.startDate} — {edu.current ? t('editor.common.present') : edu.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm font-bold text-slate-500 italic">{edu.degree}</div>
                                        {edu.description && <p className="text-slate-600 text-sm mt-2">{edu.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects && projects.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-3 text-slate-400">
                                <span className="w-8 h-px bg-slate-200"></span>
                                {t('editor.sections.projects')}
                            </h2>
                            <div className="space-y-6">
                                {projects.map((proj, index) => (
                                    <div key={proj.id || index}>
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1 gap-1">
                                            <h3 className="text-lg font-bold text-slate-800">{proj.name}</h3>
                                            <span className="text-sm font-bold text-slate-400 whitespace-nowrap">
                                                {proj.startDate} — {proj.current ? t('editor.common.present') : proj.endDate}
                                            </span>
                                        </div>
                                        {proj.url && <div className="text-sm font-bold text-blue-500 mb-2 truncate"><a href={proj.url}>{proj.url}</a></div>}
                                        {proj.description && <p className="text-slate-600 text-sm">{proj.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-3 text-slate-400">
                                <span className="w-8 h-px bg-slate-200"></span>
                                {t('editor.sections.certifications')}
                            </h2>
                            <div className="space-y-6">
                                {certifications.map((cert, index) => (
                                    <div key={cert.id || index}>
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1 gap-1">
                                            <h3 className="text-lg font-bold text-slate-800">{cert.name}</h3>
                                            <span className="text-sm font-bold text-slate-400 whitespace-nowrap">
                                                {cert.date}
                                            </span>
                                        </div>
                                        <div className="text-sm font-bold text-slate-500 italic">{cert.issuer}</div>
                                        {cert.url && <div className="text-sm font-bold text-blue-500 mt-1 truncate"><a href={cert.url}>{cert.url}</a></div>}
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

export default SidebarTemplate;
