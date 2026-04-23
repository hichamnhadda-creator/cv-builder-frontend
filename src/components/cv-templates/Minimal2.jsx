import React from 'react';
import { useTranslation } from 'react-i18next';

const Minimal2 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#374151', secondary: '#9ca3af' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Inter';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    return (
        <div className="h-full bg-slate-50 shadow-inner max-w-full overflow-y-auto p-12" style={{ fontFamily }}>
            <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[3rem] p-20 min-h-full max-w-4xl mx-auto">
                <header className="mb-24 flex justify-between items-start">
                    <div className="max-w-md">
                        <h1 className="text-6xl font-black tracking-tighter mb-4 text-slate-800" style={{ fontFamily: headingFont }}>{personalInfo.fullName}</h1>
                        <p className="text-xl font-bold text-slate-300 uppercase tracking-widest">{experience?.[0]?.jobTitle}</p>
                    </div>
                    <div className="text-right space-y-2">
                        {personalInfo.photo && (
                            <div className="w-24 h-24 rounded-full overflow-hidden mb-6 grayscale opacity-80 hover:grayscale-0 transition-all duration-700">
                                <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{personalInfo.email}</div>
                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{personalInfo.phone}</div>
                    </div>
                </header>

                <div className="space-y-24">
                    <section className="grid grid-cols-12 gap-10">
                        <div className="col-span-3 text-[10px] font-black uppercase tracking-[0.4em] text-slate-200">About</div>
                        <div className="col-span-9">
                            <p className="text-lg font-medium leading-relaxed text-slate-500">
                                {personalInfo.summary}
                            </p>
                        </div>
                    </section>

                    <section className="grid grid-cols-12 gap-10">
                        <div className="col-span-3 text-[10px] font-black uppercase tracking-[0.4em] text-slate-200">Career</div>
                        <div className="col-span-9 space-y-12">
                            {experience.map((exp) => (
                                <div key={exp.id} className="relative">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h3 className="text-2xl font-bold text-slate-800 tracking-tight leading-none uppercase">{exp.jobTitle}</h3>
                                        <span className="text-[10px] font-black text-slate-200 uppercase">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-sm font-black text-slate-300 mb-6 uppercase tracking-widest">{exp.company} // {exp.location}</div>
                                    <p className="text-slate-400 text-sm leading-relaxed border-l border-slate-100 pl-8">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="grid grid-cols-12 gap-10">
                        <div className="col-span-3 text-[10px] font-black uppercase tracking-[0.4em] text-slate-200">Skills</div>
                        <div className="col-span-9">
                            <div className="flex flex-wrap gap-x-12 gap-y-8">
                                {skills.map((skill, index) => (
                                    <span key={index} className="text-sm font-black text-slate-700 uppercase tracking-widest border-b-2 border-slate-50 pb-2">
                                        {getSkillName(skill)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="grid grid-cols-12 gap-10">
                        <div className="col-span-3 text-[10px] font-black uppercase tracking-[0.4em] text-slate-200">Education</div>
                        <div className="col-span-9 grid grid-cols-2 gap-12">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h3 className="font-bold text-slate-800 text-lg mb-1 uppercase tracking-tight">{edu.degree}</h3>
                                    <div className="text-xs font-black text-slate-300 uppercase tracking-widest mb-2">{edu.institution}</div>
                                    <div className="text-[9px] font-black text-slate-200">{edu.startDate} - {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Minimal2;
