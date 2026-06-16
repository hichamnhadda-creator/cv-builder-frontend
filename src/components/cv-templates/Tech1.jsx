import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Tech1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { 
        personalInfo = {}, 
        experience = [], 
        education = [], 
        skills = [], 
        languages = [], 
        projects = [] 
    } = data || {};
    
    const colors = customization?.colors || { primary: '#10b981', secondary: '#1e293b' };
    const fontFamily = customization?.fonts?.body || 'JetBrains Mono, monospace';
    const headingFont = customization?.fonts?.heading || 'Space Grotesk';

    return (
        <div className="bg-[#0f172a] h-full p-8 w-full text-slate-300 flex flex-col gap-8" style={{ fontFamily }}>
            {/* Terminal Style Header */}
            <header className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <div className="flex gap-1.5 mb-6">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: headingFont }}>
                                <span className="text-emerald-400">$</span> {personalInfo?.fullName || 'Developer Name'}
                            </h1>
                            <p className="text-emerald-400/80 font-mono text-sm tracking-widest">
                                &gt; {experience?.[0]?.jobTitle || 'Full Stack Engineer'}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-xs font-mono text-slate-500">
                            <div className="flex items-center gap-2"><span className="text-emerald-500">@</span> {personalInfo.email}</div>
                            <div className="flex items-center gap-2"><span className="text-emerald-500">#</span> {personalInfo.phone}</div>
                        </div>
                    </div>
                </div>
                {personalInfo?.photo && (
                    <div className="w-32 h-32 rounded-xl overflow-hidden border border-slate-700 bg-slate-800 p-1 self-center">
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                    </div>
                )}
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Projects: Tech Focus */}
                    <section>
                        <h2 className="text-lg font-bold text-emerald-400 mb-6 flex items-center gap-3">
                            <span className="opacity-50">[01]</span> {t('editor.sections.projects')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map((proj, idx) => (
                                <div key={proj.id || idx} className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl hover:border-emerald-500/50 transition-colors group">
                                    <h3 className="font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{proj.name}</h3>
                                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{proj.description}</p>
                                    <div className="flex gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                        <span className="text-[10px] font-mono text-slate-500">master*</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Experience */}
                    <section>
                        <h2 className="text-lg font-bold text-emerald-400 mb-6 flex items-center gap-3">
                            <span className="opacity-50">[02]</span> {t('editor.sections.experience')}
                        </h2>
                        <div className="space-y-6">
                            {experience.map((exp, idx) => (
                                <div key={exp.id || idx} className="relative pl-6 border-l border-slate-800">
                                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-slate-900 border border-emerald-500 rounded-full" />
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="font-bold text-white">{exp.jobTitle}</h3>
                                        <span className="text-[10px] font-mono text-slate-500">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-emerald-500/80 text-xs font-mono mb-3">{exp.company}</div>
                                    <p className="text-xs text-slate-400 leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Tech Sidebar */}
                <div className="space-y-8">
                    <section className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl">
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Core Stack</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((s, i) => (
                                <span key={i} className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono text-emerald-400 border border-emerald-500/20">
                                    {getSkillName(s)}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="p-2">
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Summary</h2>
                        <p className="text-xs leading-relaxed text-slate-400 font-mono">
                            {personalInfo.summary}
                        </p>
                    </section>

                    <section className="bg-slate-900/40 p-6 rounded-xl border border-dashed border-slate-800">
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{t('editor.sections.education')}</h2>
                        {education.map((edu, idx) => (
                            <div key={edu.id || idx} className="mb-4 last:mb-0">
                                <div className="text-xs text-white font-bold">{edu.institution}</div>
                                <div className="text-[10px] text-slate-500 mt-1">{edu.degree}</div>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Tech1;
