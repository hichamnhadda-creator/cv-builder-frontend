import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Modern2 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [] } = data || {};
    const colors = customization?.colors || { primary: '#6366f1', secondary: '#1e293b' };
    const fontFamily = customization?.fonts?.body || 'Inter';

    return (
        <div className="flex h-full bg-slate-50 overflow-hidden shadow-lg" style={{ fontFamily }}>
            {/* Sidebar: Deep Navigation Style */}
            <div className="w-1/3 bg-slate-900 p-8 text-white flex flex-col gap-10">
                <div className="text-center">
                    {personalInfo?.photo && (
                        <div className="w-32 h-32 mx-auto rounded-full border-4 border-slate-800 shadow-2xl overflow-hidden mb-6">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <h1 className="text-2xl font-black mb-1">{personalInfo?.fullName || 'Your Name'}</h1>
                    <p className="text-sm font-bold opacity-40 uppercase tracking-[0.2em]">{experience?.[0]?.jobTitle || 'Expert'}</p>
                </div>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">Contact</h2>
                        <div className="space-y-3 text-xs font-medium opacity-80">
                            {personalInfo?.email && <div className="flex items-center gap-3"><span>✉️</span> {personalInfo.email}</div>}
                            {personalInfo?.phone && <div className="flex items-center gap-3"><span>📱</span> {personalInfo.phone}</div>}
                            {personalInfo?.website && <div className="flex items-center gap-3"><span>🌐</span> {personalInfo.website}</div>}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">{t('editor.sections.skills')}</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((s, i) => (
                                <span key={i} className="px-2 py-1 bg-slate-800 rounded text-[9px] font-black uppercase tracking-tighter border border-slate-700">
                                    {getSkillName(s)}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="mt-auto">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">{t('editor.sections.languages')}</h2>
                        <div className="space-y-3">
                            {languages.map((l, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-[10px] font-bold mb-1 uppercase tracking-tighter">
                                        <span>{getLangName(l)}</span>
                                        <span>{getLangLevel(l)}</span>
                                    </div>
                                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500" style={{ width: '80%' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* Main Content: Card-Based Flow */}
            <div className="flex-1 p-10 overflow-y-auto space-y-10">
                <section>
                    <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-4">
                        {t('editor.sections.summary')}
                        <div className="h-1 flex-1 bg-indigo-100 rounded-full"></div>
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed">{personalInfo.summary}</p>
                </section>

                <section>
                    <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-4">
                        {t('editor.sections.experience')}
                        <div className="h-1 flex-1 bg-indigo-100 rounded-full"></div>
                    </h2>
                    <div className="space-y-4">
                        {experience.map((exp) => (
                            <div key={exp.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-slate-800">{exp.jobTitle}</h3>
                                    <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full uppercase tracking-widest">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="text-xs font-bold text-slate-400 uppercase mb-3">{exp.company}</div>
                                <p className="text-slate-500 text-xs leading-relaxed">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-4">
                        {t('editor.sections.education')}
                        <div className="h-1 flex-1 bg-indigo-100 rounded-full"></div>
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {education.map((edu) => (
                            <div key={edu.id} className="bg-white p-5 rounded-2xl border border-slate-100">
                                <h3 className="font-bold text-slate-800 text-sm">{edu.institution}</h3>
                                <div className="text-[10px] font-bold text-indigo-500 mt-1 uppercase tracking-tighter">{edu.degree}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Modern2;
