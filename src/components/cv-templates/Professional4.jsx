import React from 'react';
import { useTranslation } from 'react-i18next';

const Professional4 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#047857', secondary: '#374151' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    return (
        <div className="h-full bg-[#fdfdfd] shadow-lg max-w-full overflow-y-auto p-12 text-slate-800" style={{ fontFamily }}>
            {/* Minimalist Top Contact */}
            <div className="flex justify-center gap-6 mb-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-4">
                {personalInfo.email && <div>{personalInfo.email}</div>}
                {personalInfo.phone && <div>{personalInfo.phone}</div>}
                {personalInfo.location && <div>{personalInfo.location}</div>}
            </div>

            {/* Name and Title Center */}
            <header className="text-center mb-16">
                <h1 className="text-5xl font-black tracking-tight mb-2 uppercase" style={{ color: colors.secondary, fontFamily: headingFont }}>{personalInfo.fullName}</h1>
                <div className="h-0.5 w-16 bg-emerald-600 mx-auto mb-4" style={{ backgroundColor: colors.primary }}></div>
                <p className="text-lg font-bold text-slate-400 uppercase tracking-[0.3em]">
                    {experience?.[0]?.jobTitle}
                </p>
            </header>

            <div className="space-y-12 max-w-4xl mx-auto">
                <section>
                    <h2 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-800 mb-6 flex items-center gap-4" style={{ color: colors.primary }}>
                        Professional Summary <div className="h-[1px] flex-1 bg-emerald-50"></div>
                    </h2>
                    <p className="text-sm font-medium leading-relaxed text-slate-600">
                        {personalInfo.summary}
                    </p>
                </section>

                <section>
                    <h2 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-800 mb-8 flex items-center gap-4" style={{ color: colors.primary }}>
                        Experience <div className="h-[1px] flex-1 bg-emerald-50"></div>
                    </h2>
                    <div className="space-y-10">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-xl font-bold text-slate-800">{exp.jobTitle}</h3>
                                        <div className="h-4 w-[1px] bg-slate-200"></div>
                                        <div className="text-xs font-black text-emerald-600 uppercase tracking-widest" style={{ color: colors.primary }}>{exp.company}</div>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 italic">{exp.location}</div>
                                <p className="text-slate-500 text-xs leading-relaxed border-l-2 border-slate-50 pl-6">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-12 gap-12 pt-4">
                    <div className="col-span-7">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-800 mb-6" style={{ color: colors.primary }}>Core Education</h2>
                        <div className="space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id} className="relative pl-6">
                                    <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                                    <h3 className="font-bold text-slate-800 text-sm mb-1">{edu.degree}</h3>
                                    <div className="text-[10px] font-black text-slate-400 uppercase">{edu.institution}</div>
                                    <div className="text-[10px] font-bold text-slate-300 mt-1">{edu.startDate} - {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-5">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-800 mb-6" style={{ color: colors.primary }}>Analytical Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                                    {getSkillName(skill)}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Professional4;
