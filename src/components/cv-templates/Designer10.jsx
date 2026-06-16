import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Designer10 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [], education = [] } = data || {};

    return (
        <div className="bg-[#050505] h-full w-full font-['Inter'] text-white p-2">
            <div className="border border-white/10 h-full p-12 flex flex-col gap-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full -mr-64 -mt-64 blur-[120px]" />
                
                <header className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="max-w-2xl flex flex-col md:flex-row items-start gap-8">
                        {personalInfo?.photo && (
                            <div className="w-32 h-40 bg-white/5 p-1 flex-shrink-0 border border-white/10">
                                <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div>
                            <h1 className="text-8xl font-black tracking-tighter leading-[0.8] mb-8 bg-gradient-to-br from-white via-white to-white/20 bg-clip-text text-transparent">
                                {personalInfo.fullName}
                            </h1>
                            <p className="text-xl font-bold uppercase tracking-[0.6em] text-yellow-500">
                                {experience?.[0]?.jobTitle}
                            </p>
                        </div>
                    </div>
                    <div className="text-right space-y-2 text-xs font-black uppercase tracking-widest text-white/40">
                        <div>{personalInfo.location}</div>
                        <div>{personalInfo.email}</div>
                        <div>{personalInfo.phone}</div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10">
                    <div className="lg:col-span-8 space-y-20">
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20 mb-12">Select Work</h2>
                            <div className="space-y-16">
                                {experience.map((exp, i) => (
                                    <div key={i} className="group">
                                        <div className="flex justify-between items-baseline mb-6 border-b border-white/5 pb-6">
                                            <h3 className="text-3xl font-black group-hover:text-yellow-500 transition-colors">{exp.jobTitle}</h3>
                                            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{exp.startDate} — {exp.endDate}</span>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-8">
                                            <div className="md:w-48 text-xs font-black uppercase tracking-widest text-yellow-500/50">{exp.company}</div>
                                            <p className="flex-1 text-sm leading-relaxed text-white/60 font-medium">{exp.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-4 space-y-20">
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20 mb-12">Abilities</h2>
                            <div className="flex flex-col gap-4">
                                {skills.map((s, i) => (
                                    <div key={i} className="flex items-center justify-between group cursor-default">
                                        <span className="text-sm font-black uppercase tracking-widest text-white group-hover:text-yellow-500 transition-colors">{getSkillName(s)}</span>
                                        <div className="w-12 h-px bg-white/10 group-hover:bg-yellow-500/50 transition-all" />
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white/5 p-10 border border-white/10 rounded-2xl">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20 mb-8 italic">Philosophy</h2>
                            <p className="text-lg font-bold leading-tight text-white italic">
                                "{personalInfo.summary}"
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Designer10;
