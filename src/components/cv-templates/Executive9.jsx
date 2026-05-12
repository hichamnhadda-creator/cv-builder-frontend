import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Executive9 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [] } = data || {};

    return (
        <div className="bg-[#fcfcfc] min-h-full p-12 w-full font-serif text-slate-900 border-x-[1px] border-slate-200">
            <header className="mb-24 flex flex-col items-center text-center max-w-4xl mx-auto">
                {personalInfo?.photo && (
                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-slate-900 p-1 mb-12 flex-shrink-0 grayscale">
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                    </div>
                )}
                <h1 className="text-8xl font-black tracking-tighter leading-none mb-10 text-slate-900">{personalInfo.fullName}</h1>
                <p className="text-xl font-bold uppercase tracking-[0.5em] text-slate-300 mb-12">{experience?.[0]?.jobTitle}</p>
                <div className="w-48 h-1 bg-slate-900 mb-12" />
                <div className="flex justify-center flex-wrap gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    <span>{personalInfo.location}</span>
                    <span>{personalInfo.email}</span>
                    <span>{personalInfo.phone}</span>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 px-8">
                <main className="lg:col-span-8 space-y-24">
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-200 mb-16">The Career Road</h2>
                        <div className="space-y-20">
                            {experience.map((exp, i) => (
                                <div key={i} className="relative group">
                                    <div className="flex justify-between items-baseline mb-8 border-b border-slate-50 pb-8">
                                        <h3 className="text-4xl font-bold italic group-hover:bg-slate-900 group-hover:text-white transition-all px-2 ml-[-8px]">{exp.jobTitle}</h3>
                                        <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">{exp.startDate} — {exp.endDate}</span>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-12">
                                        <div className="md:w-32 text-xs font-black uppercase tracking-[0.2em] text-slate-400">{exp.company}</div>
                                        <p className="flex-1 text-lg font-medium leading-relaxed text-slate-500 italic">
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
                        <h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-200 mb-12">Expertise Nodes</h2>
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
                        <h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-200 mb-8 italic">Mandate</h2>
                        <p className="text-sm font-bold leading-relaxed text-slate-400">
                            {personalInfo.summary}
                        </p>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default Executive9;
