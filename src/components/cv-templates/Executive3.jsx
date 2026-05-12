import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Executive3 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [] } = data || {};

    return (
        <div className="bg-[#f8f9fa] min-h-full w-full flex font-serif text-[#1a1a1a]">
            {/* Dark Professional Sidebar */}
            <aside className="w-1/3 bg-[#1a1a1a] p-12 text-white flex flex-col gap-12">
                <div className="mb-8">
                    {personalInfo?.photo && (
                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-800 mb-8 grayscale hover:grayscale-0 transition-all">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <h1 className="text-3xl font-light tracking-[0.2em] mb-4 uppercase leading-tight">{personalInfo.fullName}</h1>
                    <p className="text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase">{experience?.[0]?.jobTitle}</p>
                </div>

                <section>
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-6 pb-2 border-b border-gray-800">Direct</h2>
                    <div className="space-y-4 text-[10px] font-medium opacity-80 leading-relaxed uppercase tracking-widest">
                        <div>{personalInfo.email}</div>
                        <div>{personalInfo.phone}</div>
                        <div>{personalInfo.location}</div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-6 pb-2 border-b border-gray-800">Expertise</h2>
                    <div className="space-y-3">
                        {skills.map((s, i) => (
                            <div key={i} className="text-[10px] font-bold uppercase tracking-widest border-l-2 border-gray-800 pl-4 py-1">
                                {getSkillName(s)}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-auto">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Privileged & Confidential</p>
                </section>
            </aside>

            {/* Content Area */}
            <main className="flex-1 p-16 bg-white shadow-inner">
                <section className="mb-20">
                    <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-gray-300 mb-12">Executive Profile</h2>
                    <p className="text-lg leading-relaxed text-gray-600 font-light italic border-l-4 border-gray-100 pl-8">
                        "{personalInfo.summary}"
                    </p>
                </section>

                <section>
                    <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-gray-300 mb-12">Professional Tenure</h2>
                    <div className="space-y-16">
                        {experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-4">
                                    <h3 className="text-2xl font-bold italic text-gray-800">{exp.jobTitle}</h3>
                                    <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{exp.startDate} — {exp.endDate}</span>
                                </div>
                                <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">{exp.company}</div>
                                <p className="text-sm leading-relaxed text-gray-600 text-justify">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-20 pt-16 border-t border-gray-100">
                    <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-gray-300 mb-10">Academic Foundations</h2>
                    <div className="grid grid-cols-2 gap-12">
                        {education.map((edu, i) => (
                            <div key={i}>
                                <h3 className="font-bold text-sm text-gray-800 mb-1 uppercase tracking-wider">{edu.institution}</h3>
                                <p className="text-xs italic text-gray-500">{edu.degree}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Executive3;
