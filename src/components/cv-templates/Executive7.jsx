import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Executive7 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [] } = data || {};

    return (
        <div className="bg-[#fcfcfc] min-h-full p-12 w-full font-serif text-slate-800 flex flex-col gap-16">
            <header className="flex flex-col md:flex-row justify-between items-start gap-12 bg-white p-12 shadow-sm border border-slate-100">
                <div className="flex-1 flex flex-col md:flex-row items-center gap-12">
                    {personalInfo?.photo && (
                        <div className="w-24 h-24 rounded-full overflow-hidden border border-slate-100 shadow-xl flex-shrink-0">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover grayscale" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-6xl font-light tracking-tight text-slate-900 mb-4 italic">{personalInfo.fullName}</h1>
                        <p className="text-lg font-bold uppercase tracking-[0.4em] text-slate-300">{experience?.[0]?.jobTitle}</p>
                    </div>
                </div>
                <div className="text-right space-y-4">
                    <div className="text-sm font-bold border-b border-slate-200 pb-2 italic">{personalInfo.email}</div>
                    <div className="text-xs font-medium text-slate-400">{personalInfo.location} | {personalInfo.phone}</div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 px-4">
                <main className="lg:col-span-2 space-y-16">
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-slate-200 mb-12 border-b pb-4">Professional Record</h2>
                        <div className="space-y-16">
                            {experience.map((exp, i) => (
                                <div key={i} className="relative group">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h3 className="text-2xl font-bold text-slate-800 italic">{exp.jobTitle}</h3>
                                        <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">{exp.company}</div>
                                    <p className="text-sm leading-relaxed text-slate-500 font-medium">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                <aside className="space-y-16">
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-slate-200 mb-10">Strategic Expertise</h2>
                        <div className="flex flex-wrap gap-4">
                            {skills.map((s, i) => (
                                <div key={i} className="text-xs font-bold text-slate-600 px-4 py-2 bg-white shadow-sm border border-slate-50 uppercase tracking-widest">
                                    {getSkillName(s)}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-slate-900 p-10 text-white shadow-2xl rotate-1">
                        <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white/30 mb-8 italic">Vision</h2>
                        <p className="text-sm font-medium leading-relaxed italic opacity-80">
                            "{personalInfo.summary}"
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-slate-200 mb-10">Academic Tenure</h2>
                        <div className="space-y-8">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-bold text-sm text-slate-800 leading-tight mb-2 italic tracking-wider">{edu.institution}</h3>
                                    <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">{edu.degree}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default Executive7;
