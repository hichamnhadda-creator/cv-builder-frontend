import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Executive6 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [] } = data || {};

    return (
        <div className="bg-[#1a1a1a] min-h-full w-full font-serif text-white p-4">
            <div className="bg-white text-slate-900 min-h-full p-16 flex flex-col gap-20">
                <header className="flex flex-col md:flex-row justify-between items-start gap-12 border-b border-slate-100 pb-16">
                    <div className="flex-1 flex flex-col md:flex-row items-start gap-12">
                        {personalInfo?.photo && (
                            <div className="w-32 h-40 border border-slate-100 p-1 flex-shrink-0 bg-slate-50 shadow-sm">
                                <img src={personalInfo.photo} alt="" className="w-full h-full object-cover grayscale" />
                            </div>
                        )}
                        <div>
                            <h1 className="text-7xl font-bold tracking-tighter leading-[0.8] mb-8">{personalInfo.fullName}</h1>
                            <p className="text-xl font-black uppercase tracking-[0.4em] text-slate-300">{experience?.[0]?.jobTitle}</p>
                        </div>
                    </div>
                    <div className="text-right space-y-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                        <div>{personalInfo.location}</div>
                        <div>{personalInfo.email}</div>
                        <div>{personalInfo.phone}</div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <aside className="lg:col-span-4 space-y-16">
                        <section className="bg-slate-50 p-10 rounded-2xl border border-slate-100">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-8 italic">Mandate</h2>
                            <p className="text-lg font-bold leading-tight italic text-slate-800">
                                "{personalInfo.summary}"
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-8">Expertise</h2>
                            <div className="flex flex-col gap-4">
                                {skills.map((s, i) => (
                                    <div key={i} className="flex items-center justify-between group">
                                        <span className="text-xs font-bold uppercase tracking-widest text-slate-600">{getSkillName(s)}</span>
                                        <div className="w-8 h-px bg-slate-200" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </aside>

                    <main className="lg:col-span-8 space-y-20">
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-200 mb-12">Select Tenure</h2>
                            <div className="space-y-20">
                                {experience.map((exp, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-6 border-b border-slate-50 pb-6">
                                            <h3 className="text-3xl font-bold italic text-slate-800">{exp.jobTitle}</h3>
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{exp.startDate} - {exp.endDate}</span>
                                        </div>
                                        <div className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">{exp.company}</div>
                                        <p className="text-sm leading-relaxed text-slate-500 font-medium text-justify">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Executive6;
