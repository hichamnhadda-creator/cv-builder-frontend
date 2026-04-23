import React from 'react';
import { useTranslation } from 'react-i18next';

const Dark1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#38bdf8', secondary: '#e2e8f0' };
    const fontFamily = customization?.fonts?.body || 'Fira Code, monospace';
    const headingFont = customization?.fonts?.heading || 'Fira Code, monospace';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    return (
        <div className="h-full bg-[#0f172a] text-slate-300 shadow-2xl max-w-full overflow-y-auto p-12 border border-slate-800" style={{ fontFamily }}>
            <div className="max-w-4xl mx-auto space-y-16">
                <header className="flex justify-between items-end border-b border-slate-800 pb-12">
                    <div>
                        <div className="text-[10px] font-black text-sky-500 uppercase tracking-[0.5em] mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>
                            System.Identity.Online
                        </div>
                        <h1 className="text-5xl font-black text-white tracking-tighter mb-2" style={{ fontFamily: headingFont }}>
                            {personalInfo.fullName}
                        </h1>
                        <p className="text-xl font-bold text-slate-500 uppercase tracking-widest">
                            &gt; {experience?.[0]?.jobTitle}
                        </p>
                    </div>
                    <div className="text-right space-y-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {personalInfo.email && <div className="text-sky-900 font-black">{personalInfo.email}</div>}
                        {personalInfo.location && <div>{personalInfo.location}</div>}
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-8 space-y-16">
                        <section>
                            <h2 className="text-xs font-black text-sky-500 uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                                <span className="text-slate-700">01.</span> EXEC_SUMMARY
                            </h2>
                            <p className="text-sm font-medium leading-relaxed text-slate-400 bg-slate-900/50 p-8 rounded-3xl border border-slate-800 italic">
                                "{personalInfo.summary}"
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xs font-black text-sky-500 uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                                <span className="text-slate-700">02.</span> EXP_HISTORY
                            </h2>
                            <div className="space-y-12">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="relative pl-8 group">
                                        <div className="absolute left-0 top-2 w-1 h-0 bg-sky-500 group-hover:h-full transition-all duration-700"></div>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-xl font-black text-white uppercase tracking-tight">{exp.jobTitle}</h3>
                                            <span className="text-[10px] font-bold text-slate-600">{exp.startDate} - {exp.endDate}</span>
                                        </div>
                                        <div className="text-sm font-bold text-sky-900 mb-4 uppercase tracking-widest">{exp.company} // {exp.location}</div>
                                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="col-span-4 space-y-16">
                        <section>
                            <h2 className="text-xs font-black text-sky-500 uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                                <span className="text-slate-700">03.</span> STACK
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span key={index} className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-[10px] font-bold text-slate-400 hover:text-sky-400 hover:border-sky-900 transition-colors">
                                        {getSkillName(skill)}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xs font-black text-sky-500 uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                                <span className="text-slate-700">04.</span> ACADEMY
                            </h2>
                            <div className="space-y-6">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="text-sm font-black text-white uppercase">{edu.degree}</h3>
                                        <div className="text-[10px] font-bold text-slate-600 uppercase mb-1">{edu.institution}</div>
                                        <div className="text-[9px] font-black text-sky-900 italic">{edu.startDate} - {edu.endDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dark1;
