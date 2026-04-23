import React from 'react';
import { useTranslation } from 'react-i18next';

const Creative4 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#d946ef', secondary: '#111827' };
    const fontFamily = customization?.fonts?.body || 'Space Grotesk';
    const headingFont = customization?.fonts?.heading || 'Space Grotesk';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    return (
        <div className="h-full bg-white shadow-2xl max-w-full overflow-hidden flex" style={{ fontFamily }}>
            {/* Split Screen Sidebar */}
            <div className="w-[450px] bg-slate-900 text-white p-16 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-[-50px] left-[-50px] w-48 h-48 border-[20px] border-white/5 rounded-full"></div>
                
                <div className="relative">
                    <h1 className="text-7xl font-bold leading-[0.85] tracking-tighter mb-8 uppercase" style={{ color: colors.primary }}>
                        {personalInfo?.fullName?.split(' ')[0]}<br/>
                        <span className="text-white">{personalInfo?.fullName?.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p className="text-xl font-bold text-slate-500 uppercase tracking-widest mb-12">
                        {experience?.[0]?.jobTitle}
                    </p>
                    
                    <section className="mb-16">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-600 mb-6">Objective</h2>
                        <p className="text-sm font-medium leading-relaxed opacity-80 italic">
                            "{personalInfo.summary}"
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-600 mb-8">Expertise</h2>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                            {skills.slice(0, 10).map((skill, index) => (
                                <div key={index} className="flex flex-col gap-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{getSkillName(skill)}</span>
                                    <div className="h-0.5 w-full bg-slate-800">
                                        <div className="h-full" style={{ backgroundColor: colors.primary, width: '80%' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-t border-slate-800 pt-8">
                    {personalInfo.email && <div className="flex justify-between"><span>E.</span> <span className="text-white">{personalInfo.email}</span></div>}
                    {personalInfo.phone && <div className="flex justify-between"><span>P.</span> <span className="text-white">{personalInfo.phone}</span></div>}
                    {personalInfo.location && <div className="flex justify-between"><span>L.</span> <span className="text-white">{personalInfo.location}</span></div>}
                </div>
            </div>

            {/* Main Experience Column */}
            <div className="flex-1 overflow-y-auto p-20 bg-[#fafafa]">
                <section className="mb-24">
                    <h2 className="text-sm font-black uppercase tracking-[0.6em] text-slate-200 mb-12">History</h2>
                    <div className="space-y-16">
                        {experience.map((exp) => (
                            <div key={exp.id} className="relative group">
                                <div className="absolute -left-10 top-2 w-1 h-0 bg-fuchsia-500 group-hover:h-full transition-all duration-500" style={{ backgroundColor: colors.primary }}></div>
                                <div className="flex justify-between items-baseline mb-4">
                                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight leading-none uppercase">{exp.jobTitle}</h3>
                                    <span className="text-xs font-black text-slate-300 italic">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="text-lg font-bold mb-6 text-slate-400 uppercase tracking-widest">{exp.company} // {exp.location}</div>
                                <p className="text-slate-500 font-medium leading-relaxed text-sm">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-black uppercase tracking-[0.6em] text-slate-200 mb-12">Academy</h2>
                    <div className="grid grid-cols-2 gap-12">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">{edu.degree}</h3>
                                <div className="text-sm font-bold opacity-60 mb-2">{edu.institution}</div>
                                <div className="text-[10px] font-black text-slate-300 italic uppercase">{edu.startDate} - {edu.endDate}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Creative4;
