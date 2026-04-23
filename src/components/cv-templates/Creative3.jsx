import React from 'react';
import { useTranslation } from 'react-i18next';

const Creative3 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#f43f5e', secondary: '#334155' };
    const fontFamily = customization?.fonts?.body || 'Outfit';
    const headingFont = customization?.fonts?.heading || 'Bebas Neue, sans-serif';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    return (
        <div className="h-full bg-white shadow-2xl max-w-full overflow-y-auto p-12 flex flex-col" style={{ fontFamily }}>
            {/* Massive Header */}
            <header className="mb-20 grid grid-cols-12 items-center gap-10">
                <div className="col-span-8">
                    <h1 className="text-[10rem] font-bold leading-[0.8] tracking-tighter text-slate-100 uppercase" style={{ fontFamily: headingFont }}>
                        Creative<br/>
                        <span style={{ color: colors.primary }}>Mind</span>
                    </h1>
                    <div className="mt-8 flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: colors.primary }}></div>
                        <p className="text-3xl font-black text-slate-800 uppercase tracking-tighter">
                            {personalInfo.fullName} <span className="text-slate-300">//</span> {experience?.[0]?.jobTitle}
                        </p>
                    </div>
                </div>
                <div className="col-span-4 text-right space-y-2 text-sm font-black text-slate-400 uppercase tracking-widest">
                    {personalInfo.email && <div>{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.location && <div>{personalInfo.location}</div>}
                </div>
            </header>

            <div className="flex-1 grid grid-cols-12 gap-16">
                {/* Projects as primary content */}
                <div className="col-span-12">
                    <h2 className="text-sm font-black uppercase tracking-[0.5em] text-slate-300 mb-12 border-b border-slate-100 pb-4">Selected Case Studies</h2>
                    <div className="grid grid-cols-3 gap-8">
                        {experience.map((exp, idx) => (
                            <div key={exp.id} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                                <div className="text-6xl font-black text-slate-100 mb-6 group-hover:text-rose-100 transition-colors">0{idx + 1}</div>
                                <h3 className="text-xl font-black text-slate-800 mb-2 uppercase">{exp.jobTitle}</h3>
                                <div className="text-sm font-bold mb-6" style={{ color: colors.primary }}>{exp.company}</div>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6 italic line-clamp-4">
                                    "{exp.description}"
                                </p>
                                <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{exp.startDate} - {exp.endDate}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-8">
                    <h2 className="text-sm font-black uppercase tracking-[0.5em] text-slate-300 mb-10 border-b border-slate-100 pb-4">Background</h2>
                    <div className="space-y-12">
                        {education.map((edu) => (
                            <div key={edu.id} className="flex gap-10">
                                <div className="w-32 flex-shrink-0 text-xs font-black text-rose-300 uppercase pt-1">{edu.startDate} - {edu.endDate}</div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-800 mb-1 uppercase">{edu.degree}</h3>
                                    <div className="text-sm font-bold text-slate-400">{edu.institution}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-4">
                    <h2 className="text-sm font-black uppercase tracking-[0.5em] text-slate-300 mb-10 border-b border-slate-100 pb-4">Toolbox</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <span key={index} className="px-5 py-2.5 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-100">
                                {getSkillName(skill)}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Creative3;
