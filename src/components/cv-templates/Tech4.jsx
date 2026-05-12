import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Tech4 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [], education = [] } = data || {};

    return (
        <div className="bg-[#fcfdff] min-h-full p-8 w-full font-['Outfit'] text-slate-800">
            <header className="flex flex-col md:flex-row justify-between items-center bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 mb-10 border border-slate-100">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {personalInfo?.photo && (
                        <div className="w-32 h-32 rounded-3xl overflow-hidden ring-8 ring-indigo-50 shadow-inner">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-black mb-2 text-slate-900 tracking-tight">{personalInfo.fullName}</h1>
                        <p className="text-lg font-bold text-indigo-600 tracking-tight">{experience?.[0]?.jobTitle}</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-xs font-bold text-slate-400">
                            <span>{personalInfo.email}</span>
                            <span>•</span>
                            <span>{personalInfo.location}</span>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex flex-col items-end gap-2 text-[10px] font-black uppercase text-slate-300">
                    <div>Availability: Immediate</div>
                    <div>Relocation: Yes</div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    <section>
                        <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                            <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                            {t('editor.sections.experience')}
                        </h2>
                        <div className="space-y-12">
                            {experience.map((exp, i) => (
                                <div key={i} className="group relative">
                                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{exp.jobTitle}</h3>
                                        <span className="text-xs font-black bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">{exp.company}</div>
                                    <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <aside className="space-y-10">
                    <section className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl">
                        <h2 className="text-lg font-black mb-6 tracking-tight">Tech Stack</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((s, i) => (
                                <span key={i} className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all cursor-default">
                                    {getSkillName(s)}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="p-4 border-l-4 border-indigo-100">
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-300 mb-4">About</h2>
                        <p className="text-sm font-medium leading-relaxed italic text-slate-500">
                            "{personalInfo.summary}"
                        </p>
                    </section>

                    <section className="bg-indigo-50 p-8 rounded-[2rem]">
                        <h2 className="text-xs font-black uppercase tracking-widest text-indigo-300 mb-6">{t('editor.sections.education')}</h2>
                        <div className="space-y-6">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-bold text-slate-900 text-sm">{edu.institution}</h3>
                                    <p className="text-xs font-bold text-indigo-600 mt-1 uppercase">{edu.degree}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default Tech4;
