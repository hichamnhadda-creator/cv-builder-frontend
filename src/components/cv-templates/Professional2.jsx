import React from 'react';
import { useTranslation } from 'react-i18next';

const Professional2 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#0f172a', secondary: '#334155' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    return (
        <div className="h-full bg-white shadow-lg max-w-full overflow-hidden flex flex-col" style={{ fontFamily }}>
            {/* Top Bold Header */}
            <div className="p-12 text-white flex justify-between items-start" style={{ backgroundColor: colors.primary }}>
                <div className="flex gap-8 items-center">
                    {personalInfo?.photo && (
                        <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-white/20">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-4xl font-black uppercase mb-2 tracking-tighter" style={{ fontFamily: headingFont }}>
                            {personalInfo?.fullName}
                        </h1>
                        <p className="text-lg font-bold text-slate-300 uppercase tracking-[0.2em]">
                            {experience?.[0]?.jobTitle}
                        </p>
                    </div>
                </div>
                <div className="text-right text-xs space-y-2 font-bold tracking-widest text-slate-400">
                    <div className="flex items-center justify-end gap-2"><span>EMAIL</span> <span className="text-white">{personalInfo.email}</span></div>
                    <div className="flex items-center justify-end gap-2"><span>PHONE</span> <span className="text-white">{personalInfo.phone}</span></div>
                    <div className="flex items-center justify-end gap-2"><span>LOCATION</span> <span className="text-white">{personalInfo.location}</span></div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-12 grid grid-cols-12 gap-12">
                {/* Left Side - Main content */}
                <div className="col-span-8 space-y-12">
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-300 mb-8 flex items-center gap-4">
                            Summary <div className="h-[1px] flex-1 bg-slate-100"></div>
                        </h2>
                        <p className="text-slate-600 leading-relaxed font-medium">
                            {personalInfo.summary}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-300 mb-8 flex items-center gap-4">
                            Experience <div className="h-[1px] flex-1 bg-slate-100"></div>
                        </h2>
                        <div className="space-y-10">
                            {experience.map((exp) => (
                                <div key={exp.id} className="grid grid-cols-12 gap-4">
                                    <div className="col-span-3 text-[10px] font-black text-slate-400 uppercase pt-1.5">{exp.startDate} - {exp.endDate}</div>
                                    <div className="col-span-9">
                                        <h3 className="text-lg font-black text-slate-800 uppercase leading-none mb-1">{exp.jobTitle}</h3>
                                        <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{exp.company} // {exp.location}</div>
                                        <p className="text-slate-500 text-sm leading-relaxed">{exp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Side - Sidebar */}
                <div className="col-span-4 space-y-12">
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-300 mb-6">Expertise</h2>
                        <div className="space-y-2">
                            {skills.map((skill, index) => (
                                <div key={index} className="flex justify-between items-center py-2 border-b border-slate-50">
                                    <span className="text-xs font-black text-slate-700 uppercase tracking-wider">{getSkillName(skill)}</span>
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-300 mb-6">Education</h2>
                        <div className="space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h3 className="font-bold text-slate-800 text-sm uppercase mb-1">{edu.degree}</h3>
                                    <div className="text-[10px] font-black text-slate-400 uppercase">{edu.institution}</div>
                                    <div className="text-[9px] font-bold text-slate-300 mt-1 italic">{edu.startDate} - {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Professional2;
