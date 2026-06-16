import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Executive10 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [] } = data || {};

    return (
        <div className="bg-[#fff] h-full p-20 w-full font-serif text-[#1c1c1c] border-[1px] border-slate-100">
            <header className="mb-32 flex flex-col items-center text-center">
                {personalInfo?.photo && (
                    <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-slate-100 shadow-2xl mb-12 flex-shrink-0 grayscale">
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                    </div>
                )}
                <h1 className="text-[10rem] font-light tracking-[-0.05em] leading-[0.7] mb-12 text-[#1c1c1c]">{personalInfo.fullName}</h1>
                <div className="w-12 h-1 bg-[#b89b5e] mb-12" />
                <p className="text-xl font-bold uppercase tracking-[0.5em] text-[#b89b5e] mb-12">{experience?.[0]?.jobTitle}</p>
                <div className="flex justify-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
                    <span>{personalInfo.location}</span>
                    <span>{personalInfo.email}</span>
                    <span>{personalInfo.phone}</span>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-32">
                <main className="lg:col-span-8 space-y-32">
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-200 mb-20">Strategic Leadership</h2>
                        <div className="space-y-32">
                            {experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-10">
                                        <h3 className="text-4xl font-bold italic tracking-tighter text-[#1c1c1c]">{exp.jobTitle}</h3>
                                        <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-sm font-black uppercase tracking-[0.3em] text-[#b89b5e] mb-10">{exp.company}</div>
                                    <p className="text-lg leading-relaxed text-[#555] font-light text-justify hyphens-auto">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                <aside className="lg:col-span-4 space-y-32">
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-200 mb-16">Expertise</h2>
                        <div className="flex flex-col gap-8">
                            {skills.map((s, i) => (
                                <div key={i} className="text-sm font-bold text-[#1c1c1c] italic border-b border-slate-50 pb-4">
                                    {getSkillName(s)}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-[#fcfcfc] p-16 border-l-[1px] border-[#b89b5e]">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-200 mb-12 italic">Visionary Summary</h2>
                        <p className="text-sm font-medium leading-relaxed italic text-slate-400">
                            "{personalInfo.summary}"
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-200 mb-16">Academic Tenure</h2>
                        {education.map((edu, i) => (
                            <div key={i} className="mb-12">
                                <h3 className="font-bold text-lg text-[#1c1c1c] leading-tight mb-4 italic uppercase tracking-wider">{edu.institution}</h3>
                                <p className="text-sm font-bold text-[#b89b5e] uppercase tracking-widest">{edu.degree}</p>
                            </div>
                        ))}
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default Executive10;
