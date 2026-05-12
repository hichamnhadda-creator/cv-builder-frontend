import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Executive5 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [] } = data || {};

    return (
        <div className="bg-white min-h-full p-16 w-full font-serif text-slate-800">
            <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-b-4 border-slate-900 pb-12 mb-20">
                <div className="flex-1 flex flex-col md:flex-row items-end gap-10">
                    {personalInfo?.photo && (
                        <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-slate-900 p-1 flex-shrink-0">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover grayscale" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-7xl font-bold tracking-tighter mb-4 text-slate-900">{personalInfo.fullName}</h1>
                        <p className="text-xl font-light italic text-slate-400 tracking-widest">{experience?.[0]?.jobTitle}</p>
                    </div>
                </div>
                <div className="text-right space-y-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    <div>{personalInfo.email}</div>
                    <div>{personalInfo.phone}</div>
                    <div>{personalInfo.location}</div>
                </div>
            </header>

            <div className="space-y-24">
                <section>
                    <h2 className="text-4xl font-light italic mb-12 flex items-center gap-6">
                        Experience
                        <span className="flex-1 h-px bg-slate-100" />
                    </h2>
                    <div className="space-y-20">
                        {experience.map((exp, i) => (
                            <div key={i} className="max-w-4xl">
                                <div className="flex justify-between items-baseline mb-6">
                                    <h3 className="text-2xl font-bold italic">{exp.jobTitle}</h3>
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-300">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-8">{exp.company}</div>
                                <p className="text-sm leading-relaxed text-slate-500 text-justify font-medium">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 pt-10 border-t border-slate-100">
                    <section>
                        <h2 className="text-xl font-bold italic mb-10 text-slate-900">Strategic Leadership</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {skills.map((s, i) => (
                                <div key={i} className="text-sm font-medium text-slate-600 flex items-center gap-4">
                                    <span className="w-1 h-1 bg-slate-900 rounded-full" />
                                    {getSkillName(s)}
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold italic mb-10 text-slate-900">Education</h2>
                        {education.map((edu, i) => (
                            <div key={i} className="mb-8 last:mb-0">
                                <h3 className="font-bold text-lg text-slate-800 leading-tight mb-2">{edu.institution}</h3>
                                <p className="text-sm font-medium italic text-slate-400">{edu.degree}</p>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Executive5;
