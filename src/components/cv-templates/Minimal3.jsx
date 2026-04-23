import React from 'react';
import { useTranslation } from 'react-i18next';

const Minimal3 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#1f2937', secondary: '#4b5563' };
    const fontFamily = customization?.fonts?.body || 'Playfair Display, serif';
    const headingFont = customization?.fonts?.heading || 'Playfair Display, serif';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    return (
        <div className="h-full bg-white shadow-xl max-w-full overflow-y-auto p-24 text-slate-900" style={{ fontFamily }}>
            <div className="max-w-3xl mx-auto space-y-32">
                <header>
                    <h1 className="text-6xl font-serif italic tracking-tighter mb-8 leading-none">{personalInfo.fullName}</h1>
                    <div className="flex flex-wrap gap-8 text-[11px] font-black uppercase tracking-[0.4em] text-slate-300">
                        <span>{experience?.[0]?.jobTitle}</span>
                        <span>{personalInfo.location}</span>
                        <span>{personalInfo.email}</span>
                    </div>
                </header>

                <section className="space-y-16">
                    <div className="space-y-12">
                        {experience.map((exp) => (
                            <div key={exp.id} className="grid grid-cols-12 gap-10">
                                <div className="col-span-3 text-[10px] font-black text-slate-200 uppercase pt-2">{exp.startDate} — {exp.endDate}</div>
                                <div className="col-span-9">
                                    <h3 className="text-3xl font-serif italic mb-2 leading-none">{exp.jobTitle}</h3>
                                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">{exp.company} // {exp.location}</div>
                                    <p className="text-slate-600 font-serif leading-relaxed text-lg">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="grid grid-cols-12 gap-10">
                    <div className="col-span-3 text-[10px] font-black text-slate-200 uppercase pt-2">Academy</div>
                    <div className="col-span-9 space-y-12">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <h3 className="text-2xl font-serif italic mb-1 leading-none">{edu.degree}</h3>
                                <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{edu.institution}</div>
                                <div className="text-[10px] font-bold text-slate-200 mt-2">{edu.startDate} — {edu.endDate}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="grid grid-cols-12 gap-10">
                    <div className="col-span-3 text-[10px] font-black text-slate-200 uppercase pt-2">Arsenal</div>
                    <div className="col-span-9">
                        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                            {skills.map((skill, index) => (
                                <div key={index} className="flex justify-between items-center group">
                                    <span className="text-sm font-serif font-black text-slate-700 group-hover:italic transition-all">{getSkillName(skill)}</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-50 group-hover:bg-slate-200 transition-colors"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                <footer className="pt-24 opacity-20 text-[9px] font-black uppercase tracking-[0.5em] text-center italic">
                    Reference available upon request
                </footer>
            </div>
        </div>
    );
};

export default Minimal3;
