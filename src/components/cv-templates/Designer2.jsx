import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Designer2 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [], education = [] } = data || {};
    
    const colors = customization?.colors || { primary: '#6366f1', secondary: '#f43f5e' };
    const fontFamily = customization?.fonts?.body || 'Inter';

    return (
        <div className="bg-white h-full w-full flex flex-row overflow-hidden shadow-2xl rounded-[2rem] border-8 border-slate-100" style={{ fontFamily }}>
            {/* Vibrant Sidebar */}
            <aside className="w-1/3 bg-indigo-600 p-10 text-white flex flex-col gap-10">
                {personalInfo?.photo && (
                    <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                    </div>
                )}
                
                <section>
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-200 mb-6">Expertise</h2>
                    <div className="space-y-4">
                        {skills.map((s, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <div className="flex justify-between text-[10px] font-bold">
                                    <span>{getSkillName(s)}</span>
                                    <span>{Math.floor(Math.random() * 20) + 80}%</span>
                                </div>
                                <div className="h-1.5 bg-indigo-900/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-white rounded-full" style={{ width: `${Math.floor(Math.random() * 20) + 80}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-auto">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-200 mb-4">Contact</h2>
                    <div className="text-[10px] space-y-2 font-bold opacity-80">
                        <div>{personalInfo.email}</div>
                        <div>{personalInfo.phone}</div>
                        <div>{personalInfo.location}</div>
                    </div>
                </section>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-12 bg-slate-50 flex flex-col gap-12">
                <header>
                    <h1 className="text-6xl font-black text-slate-900 leading-tight mb-2 tracking-tighter">
                        {personalInfo.fullName}
                    </h1>
                    <p className="text-xl font-bold text-indigo-600 uppercase tracking-widest">{experience?.[0]?.jobTitle}</p>
                </header>

                <section>
                    <h2 className="text-2xl font-black text-slate-800 mb-8 border-b-4 border-indigo-100 pb-2 flex items-center gap-3">
                        <span className="w-4 h-4 bg-rose-500 rounded-full" />
                        {t('editor.sections.experience')}
                    </h2>
                    <div className="space-y-10">
                        {experience.map((exp, i) => (
                            <div key={i} className="relative pl-8">
                                <div className="absolute left-0 top-2 w-2 h-12 bg-indigo-100 rounded-full" />
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-xl font-bold text-slate-900">{exp.jobTitle}</h3>
                                    <span className="text-[10px] font-black text-slate-400">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="text-sm font-bold text-rose-500 mb-3">{exp.company}</div>
                                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-slate-800 mb-6 border-b-4 border-indigo-100 pb-2 flex items-center gap-3">
                        <span className="w-4 h-4 bg-indigo-500 rounded-full" />
                        Education
                    </h2>
                    <div className="grid grid-cols-2 gap-6">
                        {education.map((edu, i) => (
                            <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                                <h3 className="font-bold text-slate-900 text-sm">{edu.institution}</h3>
                                <p className="text-xs text-indigo-600 font-bold mt-1">{edu.degree}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Designer2;
