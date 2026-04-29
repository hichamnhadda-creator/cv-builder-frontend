import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Dark2 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [] } = data || {};
    const colors = customization?.colors || { primary: '#facc15', secondary: '#18181b' };
    const fontFamily = customization?.fonts?.body || 'serif';

    return (
        <div className="flex h-full bg-[#09090b] shadow-2xl overflow-hidden" style={{ fontFamily }}>
            {/* Left Sidebar: Gold & Charcoal */}
            <div className="w-1/3 bg-[#18181b] border-r border-yellow-500/10 p-12 text-white flex flex-col gap-16 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
                
                <div className="text-center">
                    {personalInfo?.photo && (
                        <div className="w-40 h-40 mx-auto rounded-full border-4 border-[#27272a] shadow-2xl overflow-hidden mb-8 grayscale hover:grayscale-0 transition-all duration-700">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover scale-110" />
                        </div>
                    )}
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>{personalInfo?.fullName || 'Your Name'}</h1>
                    <div className="h-px w-8 bg-yellow-500 mx-auto mb-4"></div>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500">{experience?.[0]?.jobTitle || 'Executive'}</p>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-6">Expertise</h2>
                        <div className="space-y-4">
                            {skills.map((s, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                        <span>{getSkillName(s)}</span>
                                        <span className="text-yellow-500/50">85%</span>
                                    </div>
                                    <div className="h-0.5 w-full bg-[#27272a]">
                                        <div className="h-full bg-yellow-500/30" style={{ width: '85%' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-6">Connect</h2>
                        <div className="space-y-4 text-xs font-medium text-slate-400">
                            {personalInfo?.email && <div className="flex items-center gap-4">✉️ {personalInfo.email}</div>}
                            {personalInfo?.phone && <div className="flex items-center gap-4">📱 {personalInfo.phone}</div>}
                        </div>
                    </section>
                </div>
            </div>

            {/* Right Main Content */}
            <div className="flex-1 p-16 md:p-24 overflow-y-auto space-y-20">
                <section className="relative">
                    <div className="absolute -left-12 top-0 text-8xl font-black text-white/[0.02] select-none uppercase tracking-tighter">About</div>
                    <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-yellow-500 pl-8" style={{ fontFamily: 'Georgia, serif' }}>{t('editor.sections.summary')}</h2>
                    <p className="text-slate-400 text-lg leading-relaxed font-light italic pl-8">
                        {personalInfo.summary}
                    </p>
                </section>

                <section className="relative">
                    <div className="absolute -left-12 top-0 text-8xl font-black text-white/[0.02] select-none uppercase tracking-tighter">History</div>
                    <h2 className="text-2xl font-bold text-white mb-10 border-l-4 border-yellow-500 pl-8" style={{ fontFamily: 'Georgia, serif' }}>{t('editor.sections.experience')}</h2>
                    <div className="space-y-16 pl-8">
                        {experience.map((exp) => (
                            <div key={exp.id} className="group">
                                <div className="flex justify-between items-baseline mb-4">
                                    <h3 className="text-xl font-bold text-white group-hover:text-yellow-500 transition-colors">{exp.jobTitle}</h3>
                                    <span className="text-xs font-black text-yellow-500 uppercase tracking-widest">{exp.startDate} — {exp.endDate}</span>
                                </div>
                                <div className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-tighter">{exp.company}</div>
                                <p className="text-slate-400 text-sm leading-relaxed text-justify font-light">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="relative">
                    <div className="absolute -left-12 top-0 text-8xl font-black text-white/[0.02] select-none uppercase tracking-tighter">Academic</div>
                    <h2 className="text-2xl font-bold text-white mb-10 border-l-4 border-yellow-500 pl-8" style={{ fontFamily: 'Georgia, serif' }}>{t('editor.sections.education')}</h2>
                    <div className="grid grid-cols-2 gap-12 pl-8">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <h3 className="font-bold text-white mb-1">{edu.degree}</h3>
                                <div className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-tighter">{edu.institution}</div>
                                <div className="text-[10px] text-yellow-500/50">{edu.startDate} — {edu.endDate}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dark2;
