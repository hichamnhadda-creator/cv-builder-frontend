import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Tech6 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [], projects = [] } = data || {};

    return (
        <div className="bg-[#f8fafc] min-h-full p-8 w-full font-['Inter'] text-[#334155]">
            <header className="mb-12 flex flex-col md:flex-row justify-between items-center gap-8 border-b-2 border-slate-200 pb-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {personalInfo?.photo && (
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-black text-[#0f172a] mb-1">{personalInfo.fullName}</h1>
                        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">{experience?.[0]?.jobTitle}</p>
                    </div>
                </div>
                <div className="flex gap-4 text-[10px] font-black uppercase text-slate-400">
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">{personalInfo.email}</div>
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">{personalInfo.phone}</div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <main className="lg:col-span-2 space-y-8">
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 mb-8">Work Insights</h2>
                        <div className="space-y-12">
                            {experience.map((exp, i) => (
                                <div key={i} className="relative pl-6">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/10 rounded-full" />
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-lg font-bold text-[#0f172a]">{exp.jobTitle}</h3>
                                        <span className="text-[10px] font-black text-slate-300 uppercase">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-xs font-bold text-blue-500 mb-4">{exp.company}</div>
                                    <p className="text-sm leading-relaxed text-slate-500">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 mb-8">Projects & Analysis</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map((proj, i) => (
                                <div key={i} className="p-5 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors">
                                    <h3 className="font-bold text-sm text-[#0f172a] mb-2">{proj.name}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                <aside className="space-y-8">
                    <section className="bg-[#0f172a] p-8 rounded-3xl text-white shadow-xl">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-8">Data Stack</h2>
                        <div className="space-y-4">
                            {skills.map((s, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                        <span>{getSkillName(s)}</span>
                                        <span className="text-blue-400">9.5/10</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.floor(Math.random() * 15) + 85}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 mb-6 italic">Profile</h2>
                        <p className="text-sm leading-relaxed text-slate-500 font-medium italic">
                            "{personalInfo.summary}"
                        </p>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default Tech6;
