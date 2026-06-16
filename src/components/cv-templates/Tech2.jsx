import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Tech2 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [], projects = [] } = data || {};

    return (
        <div className="bg-[#f1f5f9] h-full p-6 w-full font-mono text-[#334155]">
            <div className="bg-white border-2 border-[#334155] shadow-[8px_8px_0px_0px_rgba(51,65,85,1)] p-8">
                <header className="border-b-2 border-[#334155] pb-8 mb-8 flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        {personalInfo?.photo && (
                            <div className="w-24 h-24 border-2 border-[#334155] p-1 flex-shrink-0">
                                <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div>
                            <h1 className="text-4xl font-bold text-[#0f172a] mb-2 uppercase tracking-tighter">
                                {personalInfo.fullName}
                            </h1>
                            <p className="text-sm font-bold bg-[#334155] text-white px-3 py-1 w-fit">
                                ./{experience?.[0]?.jobTitle?.toLowerCase().replace(/\s+/g, '_')}
                            </p>
                        </div>
                    </div>
                    <div className="text-[10px] space-y-1 font-bold bg-amber-50 p-4 border border-amber-200">
                        <div>&gt; EMAIL: {personalInfo.email}</div>
                        <div>&gt; PHONE: {personalInfo.phone}</div>
                        <div>&gt; LOC: {personalInfo.location}</div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        <section>
                            <h2 className="text-sm font-bold bg-indigo-100 text-indigo-700 px-3 py-1 mb-4 w-fit uppercase">:: EXPERIENCE</h2>
                            <div className="space-y-6">
                                {experience.map((exp, i) => (
                                    <div key={i} className="border-l-2 border-slate-200 pl-4 ml-2">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-slate-900 uppercase">{exp.jobTitle}</h3>
                                            <span className="text-[10px] font-bold text-slate-400">{exp.startDate} - {exp.endDate}</span>
                                        </div>
                                        <div className="text-[10px] font-bold text-indigo-600 mb-2">{exp.company}</div>
                                        <p className="text-xs leading-relaxed text-slate-500">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-sm font-bold bg-emerald-100 text-emerald-700 px-3 py-1 mb-4 w-fit uppercase">:: PROJECTS</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {projects.map((proj, i) => (
                                    <div key={i} className="border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
                                        <h3 className="font-bold text-xs mb-2 text-slate-800 tracking-tight">{proj.name}</h3>
                                        <p className="text-[10px] text-slate-500 leading-normal">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="lg:col-span-4 space-y-8">
                        <section>
                            <h2 className="text-xs font-bold text-slate-400 mb-4 uppercase">/ STACK_DUMP</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((s, i) => (
                                    <span key={i} className="px-2 py-1 bg-slate-100 text-[10px] font-bold border border-slate-200 rounded">
                                        {getSkillName(s)}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xs font-bold text-slate-400 mb-4 uppercase">/ LOGS</h2>
                            <p className="text-[10px] leading-relaxed text-slate-500 italic">
                                "{personalInfo.summary}"
                            </p>
                        </section>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Tech2;
