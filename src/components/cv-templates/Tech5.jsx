import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Tech5 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [], education = [] } = data || {};

    return (
        <div className="bg-white min-h-full p-8 w-full font-['Inter'] text-slate-900">
            <div className="border-4 border-slate-900 p-10 relative">
                {/* Decorative Tech Accents */}
                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-8 border-l-8 border-slate-900" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-8 border-r-8 border-slate-900" />
                
                <header className="mb-20 flex flex-col items-center text-center">
                    {personalInfo?.photo && (
                        <div className="w-28 h-28 border-4 border-slate-900 p-1 mb-8">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">{personalInfo.fullName}</h1>
                    <div className="bg-slate-900 text-white px-8 py-2 text-sm font-bold uppercase tracking-[0.3em] mb-6">
                        {experience?.[0]?.jobTitle}
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase text-slate-400">
                        <span>{personalInfo.email}</span>
                        <span>//</span>
                        <span>{personalInfo.phone}</span>
                        <span>//</span>
                        <span>{personalInfo.location}</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-16">
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-[0.5em] mb-12 flex items-center gap-4">
                                <span className="w-4 h-4 bg-slate-900 rounded-sm rotate-45" />
                                Deployment History
                            </h2>
                            <div className="space-y-16">
                                {experience.map((exp, i) => (
                                    <div key={i} className="relative group">
                                        <div className="flex justify-between items-baseline mb-6 border-b-2 border-slate-100 pb-4">
                                            <h3 className="text-2xl font-black uppercase group-hover:text-blue-600 transition-colors">{exp.jobTitle}</h3>
                                            <span className="text-[10px] font-black text-slate-400">{exp.startDate} - {exp.endDate}</span>
                                        </div>
                                        <div className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-widest">{exp.company}</div>
                                        <p className="text-sm leading-relaxed text-slate-500 font-medium">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-16">
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-[0.5em] mb-8">System Stack</h2>
                            <div className="grid grid-cols-1 gap-2">
                                {skills.map((s, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-2 h-2 bg-slate-200 group-hover:bg-slate-900 transition-colors" />
                                        <span className="text-sm font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">{getSkillName(s)}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-slate-50 p-8 border border-slate-100">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-slate-300 italic">Description</h2>
                            <p className="text-sm leading-relaxed font-medium italic text-slate-600">
                                "{personalInfo.summary}"
                            </p>
                        </section>

                        <section>
                            <h2 className="text-sm font-black uppercase tracking-[0.5em] mb-8">Training</h2>
                            {education.map((edu, i) => (
                                <div key={i} className="mb-6 last:mb-0">
                                    <h3 className="font-black text-sm uppercase">{edu.institution}</h3>
                                    <p className="text-xs font-bold text-slate-400 mt-2">{edu.degree}</p>
                                </div>
                            ))}
                        </section>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Tech5;
