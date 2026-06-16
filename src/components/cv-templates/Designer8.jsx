import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Designer8 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [] } = data || {};

    return (
        <div className="bg-white h-full w-full font-['Inter'] text-black p-4">
            <div className="border-[1rem] border-yellow-400 h-full p-8 md:p-12 flex flex-col gap-16 relative">
                {/* Geometric Header */}
                <header className="relative flex flex-col md:flex-row items-center gap-8">
                    {personalInfo?.photo && (
                        <div className="w-32 h-32 bg-red-500 p-1 flex-shrink-0 relative">
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full" />
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover grayscale" />
                        </div>
                    )}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full -mr-16 -mt-16" />
                    <div className="relative z-10 flex-1">
                        <h1 className="text-7xl font-black uppercase tracking-tighter leading-none mb-4">{personalInfo.fullName}</h1>
                        <p className="text-xl font-bold bg-black text-white px-6 py-2 w-fit italic">{experience?.[0]?.jobTitle}</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-gray-300 mb-8">Work Record</h2>
                            <div className="space-y-12">
                                {experience.map((exp, i) => (
                                    <div key={i} className="flex gap-8">
                                        <div className="w-1 bg-black shrink-0" />
                                        <div>
                                            <div className="flex justify-between items-baseline mb-2">
                                                <h3 className="text-2xl font-black italic">{exp.jobTitle}</h3>
                                                <span className="text-[10px] font-black uppercase">{exp.startDate} - {exp.endDate}</span>
                                            </div>
                                            <div className="text-blue-600 font-bold mb-4 uppercase text-xs tracking-widest">{exp.company}</div>
                                            <p className="text-sm leading-relaxed text-gray-600">{exp.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-12">
                        <section className="bg-black text-white p-8">
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-gray-500 mb-6">Expertise</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((s, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/10 text-[9px] font-bold uppercase tracking-widest">{getSkillName(s)}</span>
                                ))}
                            </div>
                        </section>

                        <section className="p-4 border-l-8 border-red-500">
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-gray-300 mb-4">Contact</h2>
                            <div className="text-xs font-bold space-y-2 uppercase tracking-tighter">
                                <div>{personalInfo.email}</div>
                                <div>{personalInfo.phone}</div>
                                <div>{personalInfo.location}</div>
                            </div>
                        </section>

                        <div className="bg-yellow-400 p-8">
                            <p className="text-lg font-black leading-tight italic">
                                "{personalInfo.summary}"
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Designer8;
