import React from 'react';
import { useTranslation } from 'react-i18next';

const Creative5 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#eab308', secondary: '#475569' };
    const fontFamily = customization?.fonts?.body || 'Outfit';
    const headingFont = customization?.fonts?.heading || 'Outfit';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    return (
        <div className="h-full bg-white shadow-2xl max-w-full overflow-y-auto p-16" style={{ fontFamily }}>
            {/* Soft Header Card */}
            <header className="relative mb-24 overflow-hidden rounded-[4rem] p-20 text-white shadow-2xl" style={{ background: `linear-gradient(135deg, ${colors.primary}, #f59e0b)` }}>
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                    <h1 className="text-7xl font-black tracking-tighter leading-none mb-6">
                        {personalInfo?.fullName}
                    </h1>
                    <div className="flex items-center gap-6">
                        <span className="text-2xl font-bold opacity-90">{experience?.[0]?.jobTitle}</span>
                        <div className="w-2 h-2 rounded-full bg-white/40"></div>
                        <span className="text-lg opacity-70 italic">{personalInfo?.location}</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-16 px-8">
                {/* Flowing Sections */}
                <div className="col-span-8 space-y-24">
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-200 mb-12">Journey</h2>
                        <div className="space-y-16">
                            {experience.map((exp) => (
                                <div key={exp.id} className="relative group">
                                    <div className="absolute -left-12 top-2 w-12 h-12 bg-amber-50 rounded-full -z-10 group-hover:scale-150 transition-transform duration-700 opacity-50"></div>
                                    <div className="flex justify-between items-baseline mb-3">
                                        <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{exp.jobTitle}</h3>
                                        <span className="text-xs font-black text-amber-300 uppercase tracking-widest">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-lg font-bold text-amber-500 mb-6">{exp.company} // {exp.location}</div>
                                    <p className="text-slate-500 font-medium leading-relaxed italic border-l-4 border-amber-50 pl-8">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-200 mb-12">Formation</h2>
                        <div className="grid grid-cols-2 gap-12">
                            {education.map((edu) => (
                                <div key={edu.id} className="p-8 rounded-[3rem] bg-slate-50 border border-slate-100">
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">{edu.degree}</h3>
                                    <div className="text-sm font-bold text-slate-400 mb-4">{edu.institution}</div>
                                    <div className="text-[10px] font-black text-amber-300 uppercase tracking-widest">{edu.startDate} - {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="col-span-4 space-y-20">
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-200 mb-10">Philosophy</h2>
                        <p className="text-xl font-bold text-slate-400 leading-relaxed italic">
                            "{personalInfo.summary}"
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-200 mb-10">Arsenal</h2>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill, index) => (
                                <span key={index} className="px-6 py-3 bg-white border-2 border-amber-50 rounded-full text-[10px] font-black uppercase tracking-widest text-amber-600 shadow-sm hover:border-amber-200 transition-colors cursor-default">
                                    {getSkillName(skill)}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-200 mb-10">Pulse</h2>
                        <div className="space-y-4 font-bold text-slate-400">
                            {personalInfo.email && <div className="text-sm truncate">{personalInfo.email}</div>}
                            {personalInfo.phone && <div className="text-sm">{personalInfo.phone}</div>}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Creative5;
