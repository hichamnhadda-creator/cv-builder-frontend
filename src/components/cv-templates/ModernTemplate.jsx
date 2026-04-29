import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const ModernTemplate = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#0ea5e9', secondary: '#0f172a' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    return (
        <div className="bg-white min-h-full flex flex-col shadow-lg overflow-hidden break-words max-w-full" style={{ fontFamily }}>
            {/* Header Area */}
            <header className="p-8 md:p-10 border-b-8 flex flex-col md:flex-row items-center gap-8" style={{ borderColor: colors.primary, backgroundColor: '#f8fafc' }}>
                {personalInfo?.photo && (
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
                        <img
                            src={personalInfo.photo}
                            alt={personalInfo.fullName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight text-slate-900" style={{ fontFamily: headingFont }}>
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    <p className="text-xl md:text-2xl font-semibold mb-6" style={{ color: colors.primary }}>
                        {experience?.[0]?.jobTitle || 'Professional Title'}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-500 font-medium">
                        {personalInfo?.email && <div className="flex items-center justify-center md:justify-start gap-2"><span>✉️</span> {personalInfo.email}</div>}
                        {personalInfo?.phone && <div className="flex items-center justify-center md:justify-start gap-2"><span>📱</span> {personalInfo.phone}</div>}
                        {personalInfo?.address && <div className="flex items-center justify-center md:justify-start gap-2"><span>📍</span> {personalInfo.address}</div>}
                        {personalInfo?.website && <div className="flex items-center justify-center md:justify-start gap-2"><span>🌐</span> {personalInfo.website}</div>}
                    </div>
                </div>
            </header>

            {/* Body Area */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-0 min-h-0">
                {/* Main Column (2/3) */}
                <div className="md:col-span-2 p-8 md:p-10 space-y-10 border-r border-slate-100">
                    {/* Summary */}
                    {personalInfo?.summary && (
                        <section>
                            <h2 className="text-lg font-black uppercase tracking-widest mb-4 flex items-center gap-3" style={{ color: colors.secondary, fontFamily: headingFont }}>
                                <span className="w-2 h-6" style={{ backgroundColor: colors.primary }}></span>
                                {t('editor.sections.summary')}
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-base">
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience && experience.length > 0 && (
                        <section>
                            <h2 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-3" style={{ color: colors.secondary, fontFamily: headingFont }}>
                                <span className="w-2 h-6" style={{ backgroundColor: colors.primary }}></span>
                                {t('editor.sections.experience')}
                            </h2>
                            <div className="space-y-8">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="group">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors">{exp.jobTitle}</h3>
                                            <span className="text-sm font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full whitespace-nowrap">
                                                {exp.startDate} — {exp.current ? t('editor.common.present') : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-base font-bold mb-3 text-slate-400">
                                            {exp.company} {exp.location ? `• ${exp.location}` : ''}
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed border-l-2 pl-4 border-slate-50">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Column (1/3) */}
                <div className="bg-slate-50/50 p-8 md:p-10 space-y-10">
                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-lg font-black uppercase tracking-widest mb-5" style={{ color: colors.secondary, fontFamily: headingFont }}>
                                {t('editor.sections.skills')}
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => {
                                    const name = getSkillName(skill);
                                    return name ? (
                                        <span key={index} className="bg-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm border border-slate-200 text-slate-700">
                                            {name}
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-lg font-black uppercase tracking-widest mb-5" style={{ color: colors.secondary, fontFamily: headingFont }}>
                                {t('editor.sections.education')}
                            </h2>
                            <div className="space-y-6">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-slate-800 leading-tight mb-1">{edu.degree}</h3>
                                        <div className="text-sm font-bold text-slate-500 mb-1">{edu.institution}</div>
                                        <div className="text-xs font-bold text-slate-400">
                                            {edu.startDate} — {edu.endDate}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-lg font-black uppercase tracking-widest mb-5" style={{ color: colors.secondary, fontFamily: headingFont }}>
                                {t('editor.sections.languages')}
                            </h2>
                            <div className="space-y-3">
                                {languages.map((lang, index) => {
                                    const name = getLangName(lang);
                                    const level = getLangLevel(lang);
                                    return name ? (
                                        <div key={index} className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                                            <span className="text-sm font-bold text-slate-700">{name}</span>
                                            <span className="text-[10px] uppercase font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{level}</span>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModernTemplate;
