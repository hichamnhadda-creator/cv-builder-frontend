import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Creative2 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [] } = data || {};
    const colors = customization?.colors || { primary: '#f59e0b', secondary: '#10b981' };
    const fontFamily = customization?.fonts?.body || 'Manrope, sans-serif';

    return (
        <div className="flex min-h-full bg-white shadow-lg overflow-hidden break-words" style={{ fontFamily }}>
            {/* Vertical Ribbon Side Header */}
            <div className="w-1/4 bg-amber-500 text-white flex flex-col items-center py-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute -top-20 -left-20 w-64 h-64 border-[40px] border-white rounded-full"></div>
                    <div className="absolute bottom-40 -right-20 w-48 h-48 border-[20px] border-white rotate-45"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    {personalInfo?.photo && (
                        <div className="w-32 h-32 rounded-3xl rotate-12 bg-white p-2 shadow-2xl mb-12 overflow-hidden">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover -rotate-12 scale-125" />
                        </div>
                    )}
                    <h1 className="text-4xl font-black text-center leading-none mb-8 uppercase tracking-tighter" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    <div className="w-1 h-32 bg-white/30 mb-8"></div>
                    <div className="space-y-6 text-xs font-black uppercase tracking-widest opacity-80" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                        {personalInfo?.email && <span>{personalInfo.email}</span>}
                        {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-12 md:p-20 space-y-16">
                <section>
                    <div className="flex items-center gap-6 mb-8">
                        <div className="text-6xl font-black text-amber-500 opacity-20">01</div>
                        <h2 className="text-3xl font-black uppercase tracking-tight text-slate-800">{t('editor.sections.summary')}</h2>
                    </div>
                    <p className="text-lg text-slate-500 leading-relaxed max-w-2xl border-l-8 border-emerald-500 pl-8">
                        {personalInfo.summary}
                    </p>
                </section>

                <section>
                    <div className="flex items-center gap-6 mb-12">
                        <div className="text-6xl font-black text-amber-500 opacity-20">02</div>
                        <h2 className="text-3xl font-black uppercase tracking-tight text-slate-800">{t('editor.sections.experience')}</h2>
                    </div>
                    <div className="space-y-12">
                        {experience.map((exp) => (
                            <div key={exp.id} className="relative group">
                                <div className="absolute -left-12 top-0 text-xs font-black text-emerald-500 rotate-90 origin-left mt-2">
                                    {exp.startDate}
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 mb-1 group-hover:text-amber-500 transition-colors">{exp.jobTitle}</h3>
                                <div className="text-sm font-bold text-slate-400 uppercase mb-4">{exp.company}</div>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-xl">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-2 gap-12">
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-xl font-black uppercase text-slate-800">{t('editor.sections.education')}</h2>
                            <div className="h-px flex-1 bg-amber-200"></div>
                        </div>
                        <div className="space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h3 className="font-bold text-slate-800">{edu.degree}</h3>
                                    <div className="text-xs font-bold text-emerald-600 uppercase mt-1">{edu.institution}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-xl font-black uppercase text-slate-800">{t('editor.sections.skills')}</h2>
                            <div className="h-px flex-1 bg-emerald-200"></div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((s, i) => (
                                <span key={i} className="px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                                    {getSkillName(s)}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Creative2;
