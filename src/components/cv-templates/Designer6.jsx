import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Designer6 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [], education = [] } = data || {};

    return (
        <div className="bg-[#f0f2f5] min-h-full p-8 w-full font-['Outfit'] text-[#1a1a1a]">
            {/* Gradient Header Card */}
            <header className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-12 rounded-[2.5rem] text-white shadow-2xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32" />
                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                    {personalInfo?.photo && (
                        <div className="w-36 h-36 rounded-full border-4 border-white/30 p-1">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover rounded-full shadow-xl" />
                        </div>
                    )}
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl font-black mb-2 tracking-tight">{personalInfo.fullName}</h1>
                        <p className="text-xl font-bold opacity-90 uppercase tracking-[0.2em]">{experience?.[0]?.jobTitle}</p>
                        <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4 text-xs font-bold opacity-70">
                            <span>{personalInfo.email}</span>
                            <span>•</span>
                            <span>{personalInfo.phone}</span>
                            <span>•</span>
                            <span>{personalInfo.location}</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-8">
                    <section className="bg-white p-10 rounded-[2.5rem] shadow-sm">
                        <h2 className="text-2xl font-black mb-10 flex items-center gap-4">
                            <span className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">💼</span>
                            {t('editor.sections.experience')}
                        </h2>
                        <div className="space-y-10">
                            {experience.map((exp, i) => (
                                <div key={i} className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-full before:bg-indigo-50 last:before:hidden">
                                    <div className="absolute left-[-4px] top-2 w-3 h-3 bg-indigo-600 rounded-full ring-4 ring-indigo-50" />
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-xl font-black text-slate-800">{exp.jobTitle}</h3>
                                        <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-sm font-bold text-indigo-600 mb-4">{exp.company}</div>
                                    <p className="text-sm text-slate-500 leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Cards */}
                <div className="lg:col-span-4 space-y-8">
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm">
                        <h2 className="text-lg font-black mb-6 uppercase tracking-widest text-slate-400">Toolkit</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((s, i) => (
                                <span key={i} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-2xl text-[10px] font-black uppercase hover:bg-indigo-600 hover:text-white transition-all cursor-default">
                                    {getSkillName(s)}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm">
                        <h2 className="text-lg font-black mb-6 uppercase tracking-widest text-slate-400">Education</h2>
                        <div className="space-y-6">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-bold text-sm">{edu.institution}</h3>
                                    <p className="text-xs text-indigo-600 font-bold mt-1 uppercase">{edu.degree}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-[2.5rem] border border-white">
                        <h2 className="text-lg font-black mb-4 uppercase tracking-widest text-indigo-900/30 text-center italic">Quote</h2>
                        <p className="text-sm font-bold text-indigo-900 leading-relaxed text-center italic">
                            "{personalInfo.summary}"
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Designer6;
