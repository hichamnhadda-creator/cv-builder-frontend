import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Tech10 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [], projects = [] } = data || {};

    return (
        <div className="bg-white min-h-full p-12 w-full font-['Inter'] text-slate-900">
            <header className="mb-24 flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="flex-1 max-w-2xl flex flex-col md:flex-row items-start gap-12">
                    {personalInfo?.photo && (
                        <div className="w-48 h-64 bg-slate-50 flex-shrink-0 shadow-2xl relative">
                            <div className="absolute inset-0 border-[1rem] border-white/30 z-10" />
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover grayscale" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-8xl font-black tracking-tighter leading-[0.8] mb-10">{personalInfo.fullName}</h1>
                        <p className="text-2xl font-bold text-slate-300 uppercase tracking-[0.2em]">{experience?.[0]?.jobTitle}</p>
                    </div>
                </div>
                <div className="text-right space-y-4 pt-4">
                    <div className="text-sm font-black uppercase tracking-widest text-slate-400">{personalInfo.location}</div>
                    <div className="text-lg font-bold border-b-4 border-slate-900 pb-2">{personalInfo.email}</div>
                    <div className="text-sm font-bold opacity-30">{personalInfo.phone}</div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                <main className="lg:col-span-8 space-y-24">
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-200 mb-16">Selected Experience</h2>
                        <div className="space-y-20">
                            {experience.map((exp, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-baseline mb-8 border-b border-slate-50 pb-8">
                                        <h3 className="text-4xl font-black group-hover:bg-slate-900 group-hover:text-white transition-all px-2 ml-[-8px]">{exp.jobTitle}</h3>
                                        <span className="text-xs font-black text-slate-200 uppercase tracking-widest">{exp.startDate} / {exp.endDate}</span>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-12">
                                        <div className="md:w-32 text-xs font-black uppercase tracking-[0.2em] text-slate-400">{exp.company}</div>
                                        <p className="flex-1 text-lg font-medium leading-relaxed text-slate-600 italic">
                                            "{exp.description}"
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                <aside className="lg:col-span-4 space-y-24">
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-200 mb-12">Stack</h2>
                        <div className="flex flex-col gap-6">
                            {skills.map((s, i) => (
                                <div key={i} className="flex items-center justify-between group cursor-default">
                                    <span className="text-sm font-black uppercase tracking-widest text-slate-900 group-hover:translate-x-4 transition-transform">{getSkillName(s)}</span>
                                    <div className="w-8 h-px bg-slate-100 group-hover:w-16 group-hover:bg-slate-900 transition-all" />
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-200 mb-8">About</h2>
                        <p className="text-sm font-bold leading-relaxed text-slate-400">
                            {personalInfo.summary}
                        </p>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default Tech10;
