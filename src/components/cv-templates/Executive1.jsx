import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Executive1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { 
        personalInfo = {}, 
        experience = [], 
        education = [], 
        skills = [], 
        languages = [], 
        projects = [] 
    } = data || {};
    
    const colors = customization?.colors || { primary: '#1e293b', secondary: '#64748b' };
    const fontFamily = customization?.fonts?.body || 'Libre Baskerville, serif';
    const headingFont = customization?.fonts?.heading || 'Cinzel, serif';

    return (
        <div className="bg-white min-h-full p-12 w-full text-slate-900 border-[12px] border-slate-100 shadow-inner" style={{ fontFamily }}>
            {/* High-End Executive Header */}
            <header className="text-center mb-16 border-b border-slate-200 pb-12 flex flex-col items-center">
                {personalInfo?.photo && (
                    <div className="w-24 h-24 rounded-full overflow-hidden border border-slate-100 shadow-xl mb-6">
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                    </div>
                )}
                <h1 className="text-5xl font-light tracking-[0.2em] mb-6 uppercase" style={{ fontFamily: headingFont }}>
                    {personalInfo?.fullName || 'Executive Name'}
                </h1>
                <div className="flex justify-center items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500">
                    <span>{personalInfo.location}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span>{personalInfo.email}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span>{personalInfo.phone}</span>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Main Experience Column */}
                <div className="lg:col-span-8 space-y-12">
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-slate-400 mb-8 border-b pb-2">Leadership Experience</h2>
                        <div className="space-y-12">
                            {experience.map((exp, idx) => (
                                <div key={exp.id || idx}>
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h3 className="text-xl font-bold italic text-slate-800">{exp.jobTitle}</h3>
                                        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{exp.startDate} — {exp.endDate}</span>
                                    </div>
                                    <div className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">{exp.company}</div>
                                    <p className="text-sm leading-relaxed text-slate-600 text-justify hyphens-auto">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Refined Sidebar */}
                <div className="lg:col-span-4 space-y-12">
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-6">Strategic Profile</h2>
                        <p className="text-sm leading-relaxed text-slate-600 italic border-l-2 border-slate-200 pl-4">
                            "{personalInfo.summary}"
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-6">Core Competencies</h2>
                        <div className="grid grid-cols-1 gap-3">
                            {skills.map((s, i) => (
                                <div key={i} className="text-xs font-bold text-slate-700 flex items-center gap-3">
                                    <span className="w-1 h-1 bg-slate-800 rounded-full" />
                                    {getSkillName(s)}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-6">{t('editor.sections.education')}</h2>
                        {education.map((edu, idx) => (
                            <div key={edu.id || idx} className="mb-6">
                                <div className="text-sm font-bold text-slate-800 mb-1">{edu.institution}</div>
                                <div className="text-xs text-slate-500 italic">{edu.degree}</div>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Executive1;
