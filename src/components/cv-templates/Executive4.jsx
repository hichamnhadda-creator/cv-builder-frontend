import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Executive4 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [] } = data || {};

    return (
        <div className="bg-[#fff] min-h-full p-12 w-full font-serif text-slate-900 border-x-[16px] border-slate-50">
            <header className="mb-16 pb-12 border-b-2 border-slate-900 flex flex-col items-center text-center">
                {personalInfo?.photo && (
                    <div className="w-24 h-24 rounded-full overflow-hidden border border-slate-100 shadow-xl mb-8">
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover grayscale" />
                    </div>
                )}
                <h1 className="text-6xl font-light tracking-tighter mb-4 italic">{personalInfo.fullName}</h1>
                <p className="text-xs font-black tracking-[0.6em] text-slate-300 uppercase mb-8">{experience?.[0]?.jobTitle}</p>
                <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span>{personalInfo.location}</span>
                    <span>|</span>
                    <span>{personalInfo.email}</span>
                    <span>|</span>
                    <span>{personalInfo.phone}</span>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <main className="lg:col-span-8">
                    <section className="mb-20">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-200 mb-10">Strategic Experience</h2>
                        <div className="space-y-16">
                            {experience.map((exp, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h3 className="text-2xl font-bold text-slate-800">{exp.jobTitle}</h3>
                                        <span className="text-[10px] font-black tracking-widest text-slate-300 uppercase">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 italic">{exp.company}</div>
                                    <p className="text-sm leading-relaxed text-slate-500 font-medium">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                <aside className="lg:col-span-4 space-y-16">
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-200 mb-8">Executive Core</h2>
                        <div className="flex flex-col gap-4">
                            {skills.map((s, i) => (
                                <div key={i} className="text-xs font-bold text-slate-600 border-l-2 border-slate-900 pl-4 py-1 uppercase tracking-wider">
                                    {getSkillName(s)}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-slate-50 p-8">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-200 mb-6 italic">Profile</h2>
                        <p className="text-sm font-medium leading-relaxed italic text-slate-400">
                            "{personalInfo.summary}"
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-200 mb-8">Education</h2>
                        {education.map((edu, i) => (
                            <div key={i} className="mb-6">
                                <h3 className="font-bold text-sm text-slate-800 leading-tight mb-2">{edu.institution}</h3>
                                <p className="text-xs font-bold text-slate-300 uppercase tracking-widest italic">{edu.degree}</p>
                            </div>
                        ))}
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default Executive4;
