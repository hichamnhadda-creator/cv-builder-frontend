import React from 'react';
import { useTranslation } from 'react-i18next';

const Dark2 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#a78bfa', secondary: '#cbd5e1' };
    const fontFamily = customization?.fonts?.body || 'Outfit';
    const headingFont = customization?.fonts?.heading || 'Unbounded';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    return (
        <div className="h-full bg-[#050505] text-slate-400 shadow-2xl max-w-full overflow-hidden relative" style={{ fontFamily }}>
            {/* Background Accents */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-violet-900/20 rounded-full blur-[150px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[120px]"></div>

            <div className="relative h-full overflow-y-auto p-16">
                <header className="mb-24 flex items-center gap-12">
                    {personalInfo.photo && (
                        <div className="w-48 h-48 rounded-[4rem] overflow-hidden border-[1px] border-white/10 p-4 bg-white/5 backdrop-blur-3xl shadow-2xl">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover rounded-[3rem]" />
                        </div>
                    )}
                    <div className="flex-1">
                        <h1 className="text-8xl font-black text-white tracking-tighter leading-[0.8] mb-6 uppercase" style={{ fontFamily: headingFont }}>
                            {personalInfo.fullName?.split(' ')[0]}<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-500">
                                {personalInfo.fullName?.split(' ').slice(1).join(' ')}
                            </span>
                        </h1>
                        <p className="text-2xl font-bold tracking-widest text-slate-600 uppercase">
                            {experience?.[0]?.jobTitle}
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-16">
                    <div className="col-span-8 space-y-24">
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-700 mb-12">Narrative</h2>
                            <p className="text-2xl font-bold leading-relaxed text-slate-300 italic">
                                "{personalInfo.summary}"
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-700 mb-12">Chronicles</h2>
                            <div className="space-y-20">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="group relative">
                                        <div className="absolute -left-12 top-2 text-[10px] font-black text-slate-800 uppercase vertical-rl rotate-180 tracking-[0.3em]">{exp.startDate}</div>
                                        <div className="flex justify-between items-baseline mb-4">
                                            <h3 className="text-4xl font-black text-white tracking-tighter uppercase group-hover:text-violet-400 transition-colors">{exp.jobTitle}</h3>
                                        </div>
                                        <div className="text-lg font-bold text-slate-500 mb-8">{exp.company} // {exp.location}</div>
                                        <p className="text-sm font-medium leading-relaxed opacity-60 max-w-2xl">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="col-span-4 space-y-24">
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-700 mb-12">Core</h2>
                            <div className="space-y-6">
                                {skills.map((skill, index) => (
                                    <div key={index} className="flex justify-between items-center group">
                                        <span className="text-sm font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">{getSkillName(skill)}</span>
                                        <div className="h-[1px] flex-1 mx-4 bg-slate-900 group-hover:bg-violet-900 transition-colors"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-violet-400 transition-colors"></div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-700 mb-12">Contact</h2>
                            <div className="space-y-4 text-xs font-black text-slate-500 uppercase tracking-widest">
                                {personalInfo.email && <div className="text-white">{personalInfo.email}</div>}
                                {personalInfo.phone && <div>{personalInfo.phone}</div>}
                                {personalInfo.location && <div>{personalInfo.location}</div>}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dark2;
