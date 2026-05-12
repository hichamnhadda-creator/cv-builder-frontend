import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Tech8 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [], education = [] } = data || {};

    return (
        <div className="bg-[#020617] min-h-full p-8 w-full font-['Inter'] text-slate-300">
            {/* AI/ML Style Header with Blur Effects */}
            <header className="relative bg-slate-900/50 border border-slate-800 p-12 rounded-[3rem] shadow-2xl mb-12 overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full -mr-32 -mt-32 blur-[100px] group-hover:bg-violet-600/20 transition-all duration-1000" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full -ml-32 -mb-32 blur-[80px]" />
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                        {personalInfo?.photo && (
                            <div className="w-24 h-24 rounded-2xl overflow-hidden border border-violet-500/30 p-1 flex-shrink-0 bg-violet-900/20">
                                <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div>
                            <h1 className="text-6xl font-black text-white mb-4 tracking-tighter leading-none">
                                {personalInfo.fullName}
                            </h1>
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <span className="h-0.5 w-10 bg-violet-500" />
                                <p className="text-lg font-bold text-violet-400 uppercase tracking-[0.2em]">{experience?.[0]?.jobTitle}</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                        <div className="flex items-center gap-3"><span className="text-violet-500">::</span> {personalInfo.email}</div>
                        <div className="flex items-center gap-3"><span className="text-violet-500">::</span> {personalInfo.phone}</div>
                        <div className="flex items-center gap-3"><span className="text-violet-500">::</span> {personalInfo.location}</div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-4">
                <main className="lg:col-span-8 space-y-16">
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-500 mb-10 flex items-center gap-6">
                            <span className="w-12 h-px bg-slate-800" />
                            Neural Network / History
                        </h2>
                        <div className="space-y-16">
                            {experience.map((exp, i) => (
                                <div key={i} className="group relative">
                                    <div className="flex justify-between items-baseline mb-6 border-b border-slate-800 pb-6">
                                        <h3 className="text-2xl font-black text-white group-hover:text-violet-400 transition-colors">{exp.jobTitle}</h3>
                                        <span className="text-[10px] font-black text-slate-500 bg-slate-800 px-3 py-1 rounded-full">{exp.startDate} — {exp.endDate}</span>
                                    </div>
                                    <div className="text-violet-500 font-bold text-sm mb-6 uppercase tracking-widest">{exp.company}</div>
                                    <p className="text-sm leading-relaxed text-slate-400 font-medium text-justify">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                <aside className="lg:col-span-4 space-y-12">
                    <section className="bg-violet-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-violet-900/20 rotate-1">
                        <h2 className="text-lg font-black mb-8 tracking-tight">Technical Nodes</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((s, i) => (
                                <span key={i} className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all cursor-default border border-white/5">
                                    {getSkillName(s)}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="p-8 border border-slate-800 rounded-[2rem] bg-slate-900/30">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 mb-6">Objective</h2>
                        <p className="text-sm leading-relaxed text-slate-400 italic">
                            "{personalInfo.summary}"
                        </p>
                    </section>

                    <section className="p-8">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 mb-8">Education</h2>
                        <div className="space-y-6">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-bold text-white text-sm">{edu.institution}</h3>
                                    <p className="text-xs font-bold text-violet-500 mt-2 uppercase tracking-widest">{edu.degree}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default Tech8;
