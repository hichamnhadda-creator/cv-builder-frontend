import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Designer5 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [], education = [] } = data || {};

    return (
        <div className="bg-[#111] min-h-full w-full font-['Inter'] text-white overflow-hidden flex flex-col lg:flex-row">
            {/* Dark Side: Identity */}
            <aside className="lg:w-2/5 p-12 bg-[#000] border-r border-white/10 flex flex-col gap-12 sticky top-0 h-full lg:h-screen">
                <div className="space-y-4">
                    <div className="w-12 h-1 bg-white mb-8" />
                    {personalInfo?.photo && (
                        <div className="w-32 h-32 mb-8 grayscale">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <h1 className="text-7xl font-black tracking-tighter leading-none mb-4 break-words">{personalInfo.fullName}</h1>
                    <p className="text-xl font-bold text-gray-500 uppercase tracking-widest">{experience?.[0]?.jobTitle}</p>
                </div>

                <div className="space-y-8 mt-auto">
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-4">Contact Information</h2>
                        <div className="space-y-2 text-sm font-bold">
                            <div>{personalInfo.email}</div>
                            <div>{personalInfo.phone}</div>
                            <div>{personalInfo.location}</div>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-4">Skills & Tools</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((s, i) => (
                                <span key={i} className="px-2 py-1 border border-white/20 text-[9px] font-bold uppercase">{getSkillName(s)}</span>
                            ))}
                        </div>
                    </section>
                </div>
            </aside>

            {/* Light Side: Content */}
            <main className="flex-1 p-12 bg-white text-black min-h-full">
                <section className="mb-20">
                    <h2 className="text-sm font-black uppercase tracking-[0.5em] text-gray-300 mb-10">Professional Journey</h2>
                    <div className="space-y-16">
                        {experience.map((exp, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-8">
                                <div className="md:w-32 text-xs font-black text-gray-400 uppercase pt-1">{exp.startDate} — {exp.endDate}</div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-black mb-2">{exp.jobTitle}</h3>
                                    <div className="text-sm font-bold text-gray-500 mb-4 uppercase">{exp.company}</div>
                                    <p className="text-sm leading-relaxed text-gray-600">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-black uppercase tracking-[0.5em] text-gray-300 mb-10">Education</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {education.map((edu, i) => (
                            <div key={i}>
                                <h3 className="text-lg font-black mb-1">{edu.institution}</h3>
                                <p className="text-sm font-bold text-gray-400">{edu.degree}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-20 pt-20 border-t border-gray-100">
                    <p className="text-4xl font-black leading-tight tracking-tighter">
                        "{personalInfo.summary}"
                    </p>
                </section>
            </main>
        </div>
    );
};

export default Designer5;
