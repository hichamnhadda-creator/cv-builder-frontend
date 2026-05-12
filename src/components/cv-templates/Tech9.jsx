import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Tech9 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [], education = [] } = data || {};

    return (
        <div className="bg-[#f1f5f9] min-h-full p-8 w-full font-['Inter'] text-[#334155]">
            <header className="bg-white p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 mb-12 flex flex-col md:flex-row justify-between items-center gap-10 border border-slate-100">
                <div className="flex-1 flex flex-col md:flex-row items-center gap-8 w-full">
                    {personalInfo?.photo && (
                        <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-slate-50 flex-shrink-0 shadow-inner">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover grayscale" />
                        </div>
                    )}
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">System.Developer.Active</span>
                        </div>
                        <h1 className="text-6xl font-black text-slate-900 leading-tight mb-2 tracking-tighter">{personalInfo.fullName}</h1>
                        <p className="text-xl font-bold text-slate-400 uppercase tracking-[0.2em]">{experience?.[0]?.jobTitle}</p>
                    </div>
                </div>
                <div className="bg-slate-900 p-8 rounded-[2rem] text-white flex flex-col gap-3 min-w-[280px]">
                    <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Access Nodes</div>
                    <div className="text-sm font-bold text-emerald-400">{personalInfo.email}</div>
                    <div className="text-sm font-bold opacity-80">{personalInfo.phone}</div>
                    <div className="text-xs opacity-50">{personalInfo.location}</div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <main className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-slate-300 mb-10 flex items-center gap-4">
                            Infrastructure / experience
                            <span className="flex-1 h-px bg-slate-200" />
                        </h2>
                        <div className="space-y-16">
                            {experience.map((exp, i) => (
                                <div key={i} className="relative group">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h3 className="text-2xl font-black text-slate-800">{exp.jobTitle}</h3>
                                        <span className="text-xs font-bold text-slate-300 uppercase italic">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="px-3 py-1 bg-slate-100 rounded text-[10px] font-black text-slate-400 uppercase">{exp.company}</span>
                                        <div className="h-px w-8 bg-slate-200" />
                                    </div>
                                    <p className="text-sm leading-relaxed text-slate-500 font-medium pl-6 border-l-2 border-slate-100 group-hover:border-emerald-500 transition-colors">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                <aside className="space-y-12">
                    <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Service Stack</h2>
                        <div className="grid grid-cols-1 gap-3">
                            {skills.map((s, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <span className="text-sm font-bold text-slate-600 group-hover:text-emerald-600 transition-colors">{getSkillName(s)}</span>
                                    <div className="h-1.5 w-1.5 rounded-full bg-slate-200 group-hover:bg-emerald-500 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="p-8">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6 italic">Configuration</h2>
                        <p className="text-sm font-medium leading-relaxed italic text-slate-400">
                            "{personalInfo.summary}"
                        </p>
                    </section>

                    <section className="bg-emerald-500 p-10 rounded-[2.5rem] text-white shadow-xl shadow-emerald-900/10 rotate-1">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-200 mb-6">Certification</h2>
                        <div className="space-y-6">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-black text-white text-sm leading-tight">{edu.institution}</h3>
                                    <p className="text-xs font-bold text-emerald-900 mt-2 opacity-60 italic">{edu.degree}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default Tech9;
