import React from 'react';
import { useTranslation } from 'react-i18next';

const Minimal1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#000000', secondary: '#6b7280' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Inter';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    return (
        <div className="h-full bg-white shadow-sm max-w-full overflow-y-auto p-20 text-slate-900" style={{ fontFamily }}>
            <header className="mb-24">
                <h1 className="text-5xl font-light tracking-tight mb-4" style={{ fontFamily: headingFont }}>{personalInfo.fullName}</h1>
                <div className="flex gap-6 text-xs font-medium text-slate-400 uppercase tracking-[0.2em]">
                    <span>{experience?.[0]?.jobTitle}</span>
                    <span>/</span>
                    <span>{personalInfo.location}</span>
                </div>
            </header>

            <div className="space-y-24 max-w-2xl">
                <section>
                    <p className="text-xl font-medium leading-relaxed text-slate-600">
                        {personalInfo.summary}
                    </p>
                </section>

                <section>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-12">Experience</h2>
                    <div className="space-y-16">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-4">
                                    <h3 className="text-xl font-bold tracking-tight">{exp.jobTitle}</h3>
                                    <span className="text-xs font-medium text-slate-300">{exp.startDate} — {exp.endDate}</span>
                                </div>
                                <div className="text-sm font-medium text-slate-400 mb-6 uppercase tracking-widest">{exp.company}</div>
                                <p className="text-slate-500 text-sm leading-relaxed">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-12">Education</h2>
                    <div className="space-y-10">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <h3 className="text-lg font-bold tracking-tight">{edu.degree}</h3>
                                <div className="text-sm text-slate-400 mt-1">{edu.institution}</div>
                                <div className="text-[10px] font-medium text-slate-300 mt-2 uppercase tracking-widest">{edu.startDate} — {edu.endDate}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-12">Expertise</h2>
                    <div className="flex flex-wrap gap-x-12 gap-y-6">
                        {skills.map((skill, index) => (
                            <div key={index} className="flex flex-col gap-1">
                                <span className="text-sm font-bold text-slate-700">{getSkillName(skill)}</span>
                                <div className="w-8 h-[1px] bg-slate-100"></div>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="pt-24 border-t border-slate-50 flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
                    <div>{personalInfo.email}</div>
                    <div>{personalInfo.phone}</div>
                </footer>
            </div>
        </div>
    );
};

export default Minimal1;
