import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Tech3 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [], projects = [] } = data || {};

    return (
        <div className="bg-[#050505] h-full p-8 w-full font-['Inter'] text-slate-400">
            <header className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="flex flex-col md:flex-row items-end gap-8">
                    {personalInfo?.photo && (
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10 p-1 flex-shrink-0 bg-white/5 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-5xl font-black text-white mb-2 tracking-tighter">
                            {personalInfo.fullName}
                        </h1>
                        <div className="flex items-center gap-4">
                            <span className="h-0.5 w-12 bg-blue-500" />
                            <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-500">
                                {experience?.[0]?.jobTitle}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
                    <span>{personalInfo.email}</span>
                    <span>{personalInfo.phone}</span>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                <aside className="space-y-12">
                    <section>
                        <h2 className="text-xs font-black text-white uppercase tracking-widest mb-6">Expertise</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {skills.map((s, i) => (
                                <div key={i} className="group flex flex-col gap-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase text-white/60 group-hover:text-blue-400 transition-colors">
                                        <span>{getSkillName(s)}</span>
                                        <span className="text-blue-500">_0{i+1}</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.floor(Math.random() * 20) + 75}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h2 className="text-xs font-black text-white uppercase tracking-widest mb-4 italic">Vision</h2>
                        <p className="text-xs leading-relaxed italic text-white/50">
                            "{personalInfo.summary}"
                        </p>
                    </section>
                </aside>

                <main className="lg:col-span-3 space-y-12">
                    <section>
                        <h2 className="text-sm font-black text-white uppercase tracking-[0.4em] mb-10 pb-4 border-b border-white/5">History</h2>
                        <div className="space-y-12">
                            {experience.map((exp, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h3 className="text-2xl font-black text-white group-hover:text-blue-500 transition-colors">{exp.jobTitle}</h3>
                                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{exp.startDate} — {exp.endDate}</span>
                                    </div>
                                    <div className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-6">{exp.company}</div>
                                    <p className="text-sm leading-relaxed text-white/60 max-w-2xl">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-sm font-black text-white uppercase tracking-[0.4em] mb-10 pb-4 border-b border-white/5">Builds</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {projects.map((proj, i) => (
                                <div key={i} className="p-6 bg-white/5 border border-white/5 hover:border-blue-500/50 transition-all rounded-3xl">
                                    <h3 className="text-white font-bold mb-3">{proj.name}</h3>
                                    <p className="text-xs leading-relaxed text-white/40">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Tech3;
