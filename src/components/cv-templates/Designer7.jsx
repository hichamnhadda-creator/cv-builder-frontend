import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Designer7 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [] } = data || {};

    return (
        <div className="bg-[#fffcf5] h-full p-12 w-full font-['Inter'] text-[#2c2c2c] flex flex-col gap-16">
            <header className="flex flex-col gap-8 max-w-3xl">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {personalInfo?.photo && (
                        <div className="w-48 h-64 bg-slate-100 flex-shrink-0 shadow-2xl relative">
                            <div className="absolute inset-0 border-[1rem] border-white/30 z-10" />
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-8xl font-serif italic leading-[0.8] tracking-tighter mb-4">{personalInfo.fullName}</h1>
                        <p className="text-xl font-bold uppercase tracking-[0.4em] text-[#d44d2e]">{experience?.[0]?.jobTitle}</p>
                    </div>
                </div>
                <div className="w-24 h-1 bg-[#d44d2e]" />
                <p className="text-lg leading-relaxed text-slate-500 font-medium italic">
                    "{personalInfo.summary}"
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <section>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 mb-12">Experience</h2>
                    <div className="space-y-16">
                        {experience.map((exp, i) => (
                            <div key={i}>
                                <div className="text-[10px] font-black text-[#d44d2e] uppercase mb-4 tracking-widest">{exp.startDate} — {exp.endDate}</div>
                                <h3 className="text-3xl font-serif italic mb-2">{exp.jobTitle}</h3>
                                <div className="text-sm font-black uppercase mb-6 text-slate-400">{exp.company}</div>
                                <p className="text-sm leading-relaxed text-slate-600 max-w-md">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="space-y-20">
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 mb-8">Capabilities</h2>
                        <div className="grid grid-cols-2 gap-y-4">
                            {skills.map((s, i) => (
                                <div key={i} className="text-sm font-bold border-l-2 border-slate-100 pl-4 hover:border-[#d44d2e] transition-colors">
                                    {getSkillName(s)}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-slate-900 p-12 text-white">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 mb-8">Connection</h2>
                        <div className="space-y-4 text-lg font-medium italic">
                            <div>{personalInfo.email}</div>
                            <div>{personalInfo.phone}</div>
                            <div>{personalInfo.location}</div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Designer7;
