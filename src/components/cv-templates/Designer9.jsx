import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Designer9 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [] } = data || {};

    return (
        <div className="bg-[#fff9f5] h-full p-8 w-full font-['Inter'] text-[#4a3f35] flex flex-col gap-12">
            <header className="bg-white p-16 rounded-[4rem] shadow-xl shadow-orange-900/5 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
                {personalInfo?.photo && (
                    <div className="w-48 h-48 rounded-[3.5rem] overflow-hidden shadow-inner ring-12 ring-orange-50">
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                    </div>
                )}
                <div>
                    <h1 className="text-6xl font-black tracking-tighter mb-4 text-[#2d241e]">{personalInfo.fullName}</h1>
                    <p className="text-xl font-bold text-orange-400 uppercase tracking-widest">{experience?.[0]?.jobTitle}</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-orange-200 mb-8 px-4">The Journey</h2>
                        <div className="space-y-16">
                            {experience.map((exp, i) => (
                                <div key={i} className="group px-8 py-10 bg-white rounded-[3rem] shadow-sm hover:shadow-xl transition-all border border-orange-50/50">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h3 className="text-2xl font-black text-[#2d241e]">{exp.jobTitle}</h3>
                                        <span className="text-xs font-bold text-orange-300 uppercase">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-orange-400 font-bold mb-6 uppercase tracking-widest text-sm">{exp.company}</div>
                                    <p className="text-sm leading-relaxed text-[#6b5a4d]">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <aside className="space-y-8">
                    <section className="bg-white p-10 rounded-[3rem] shadow-sm">
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-orange-200 mb-8">Expertise</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((s, i) => (
                                <span key={i} className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                    {getSkillName(s)}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="bg-orange-500 p-12 rounded-[4rem] text-white shadow-2xl rotate-2">
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-orange-200 mb-8 italic">About</h2>
                        <p className="text-sm font-bold leading-relaxed italic">
                            "{personalInfo.summary}"
                        </p>
                    </section>

                    <section className="p-8 text-center space-y-2">
                        <div className="text-sm font-black text-[#2d241e]">{personalInfo.email}</div>
                        <div className="text-xs font-bold text-orange-300 uppercase tracking-widest">{personalInfo.location}</div>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default Designer9;
