import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Executive8 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [] } = data || {};

    return (
        <div className="bg-white min-h-full p-16 w-full font-serif text-gray-900 flex flex-col gap-16">
            <header className="border-b-[12px] border-gray-900 pb-12 mb-10 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
                {personalInfo?.photo && (
                    <div className="w-32 h-32 border-4 border-gray-900 p-1 flex-shrink-0">
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                    </div>
                )}
                <div className="flex-1">
                    <h1 className="text-8xl font-light tracking-tighter mb-4 leading-none">{personalInfo.fullName}</h1>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-2xl font-bold italic text-gray-400">{experience?.[0]?.jobTitle}</p>
                        <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 space-x-4">
                            <span>{personalInfo.email}</span>
                            <span>•</span>
                            <span>{personalInfo.phone}</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                <div className="lg:col-span-8 space-y-20">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-gray-200 mb-12">Professional History</h2>
                        <div className="space-y-20">
                            {experience.map((exp, i) => (
                                <div key={i} className="border-l-8 border-gray-900 pl-12 py-2">
                                    <div className="flex justify-between items-baseline mb-6">
                                        <h3 className="text-3xl font-bold italic">{exp.jobTitle}</h3>
                                        <span className="text-[10px] font-black tracking-widest text-gray-300 uppercase">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8">{exp.company}</div>
                                    <p className="text-sm leading-relaxed text-gray-600 text-justify">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <aside className="lg:col-span-4 space-y-20">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-gray-200 mb-12">Capabilities</h2>
                        <div className="space-y-6">
                            {skills.map((s, i) => (
                                <div key={i} className="text-sm font-bold text-gray-700 italic border-b border-gray-100 pb-2">
                                    {getSkillName(s)}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-gray-50 p-10 border-t-8 border-gray-900">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 mb-8">Summary</h2>
                        <p className="text-sm font-medium leading-relaxed italic text-gray-500">
                            "{personalInfo.summary}"
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-gray-200 mb-12">Education</h2>
                        {education.map((edu, i) => (
                            <div key={i} className="mb-8">
                                <h3 className="font-bold text-sm text-gray-900 mb-1">{edu.institution}</h3>
                                <p className="text-xs italic text-gray-500">{edu.degree}</p>
                            </div>
                        ))}
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default Executive8;
