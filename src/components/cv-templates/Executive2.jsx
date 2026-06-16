import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Executive2 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [] } = data || {};

    return (
        <div className="bg-white h-full p-16 w-full font-serif text-gray-900 border-t-[20px] border-gray-900">
            <header className="mb-20 text-center border-b border-gray-100 pb-12 flex flex-col items-center">
                {personalInfo?.photo && (
                    <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-100 shadow-xl mb-6">
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover grayscale" />
                    </div>
                )}
                <h1 className="text-5xl font-light tracking-widest uppercase mb-4">{personalInfo.fullName}</h1>
                <p className="text-sm font-bold tracking-[0.3em] text-gray-400 uppercase mb-8">{experience?.[0]?.jobTitle}</p>
                <div className="flex justify-center gap-10 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    <span>{personalInfo.location}</span>
                    <span>{personalInfo.email}</span>
                    <span>{personalInfo.phone}</span>
                </div>
            </header>

            <div className="max-w-4xl mx-auto space-y-16">
                <section>
                    <p className="text-lg font-serif italic leading-relaxed text-gray-700 text-center px-12">
                        "{personalInfo.summary}"
                    </p>
                </section>

                <section>
                    <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-gray-300 mb-10 text-center">Career Milestones</h2>
                    <div className="space-y-16">
                        {experience.map((exp, i) => (
                            <div key={i} className="relative">
                                <div className="flex justify-between items-baseline mb-4">
                                    <h3 className="text-2xl font-bold italic">{exp.jobTitle}</h3>
                                    <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{exp.startDate} — {exp.endDate}</span>
                                </div>
                                <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">{exp.company}</div>
                                <p className="text-sm leading-relaxed text-gray-600 text-justify">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 pt-10 border-t border-gray-100">
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-gray-300 mb-8">Strategic Skills</h2>
                        <div className="grid grid-cols-1 gap-3">
                            {skills.map((s, i) => (
                                <div key={i} className="text-xs font-bold text-gray-600 flex items-center gap-4">
                                    <span className="w-1.5 h-px bg-gray-900" />
                                    {getSkillName(s)}
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-gray-300 mb-8">Academic Profile</h2>
                        {education.map((edu, i) => (
                            <div key={i} className="mb-6 last:mb-0">
                                <h3 className="font-bold text-sm mb-1">{edu.institution}</h3>
                                <p className="text-xs italic text-gray-500">{edu.degree}</p>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Executive2;
