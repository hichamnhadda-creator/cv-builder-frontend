import React from 'react';
import { useTranslation } from 'react-i18next';

const Modern4 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#8b5cf6', secondary: '#0f172a' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    return (
        <div className="flex h-full bg-[#f8fafc] shadow-2xl max-w-full overflow-hidden" style={{ fontFamily }}>
            {/* Dark Sidebar */}
            <div className="w-[300px] bg-[#0f172a] text-white p-10 flex flex-col">
                <div className="mb-12">
                    <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 mb-6 shadow-2xl rotate-3" style={{ borderColor: colors.primary }}>
                        {personalInfo?.photo ? (
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover -rotate-3 scale-110" />
                        ) : (
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-4xl">👤</div>
                        )}
                    </div>
                    <h1 className="text-3xl font-black mb-1 leading-none uppercase" style={{ fontFamily: headingFont }}>{personalInfo?.fullName}</h1>
                    <div className="h-1 w-12 rounded-full mb-4" style={{ backgroundColor: colors.primary }}></div>
                    <p className="text-sm font-bold tracking-widest text-slate-400 uppercase">{experience?.[0]?.jobTitle}</p>
                </div>

                <div className="space-y-10">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-6 italic">Contact</h2>
                        <div className="space-y-4 text-sm font-medium">
                            {personalInfo.email && <div className="text-slate-300">{personalInfo.email}</div>}
                            {personalInfo.phone && <div className="text-slate-300">{personalInfo.phone}</div>}
                            {personalInfo.website && <div className="text-slate-300 truncate">{personalInfo.website}</div>}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-6 italic">Core Skills</h2>
                        <div className="space-y-4">
                            {skills.slice(0, 8).map((skill, index) => (
                                <div key={index} className="group">
                                    <div className="flex justify-between text-[10px] uppercase font-bold mb-1.5 text-slate-400 group-hover:text-white transition-colors">
                                        <span>{getSkillName(skill)}</span>
                                        <span style={{ color: colors.primary }}>0{index + 1}</span>
                                    </div>
                                    <div className="h-0.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full" style={{ width: `${Math.max(60, 100 - index * 5)}%`, backgroundColor: colors.primary }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-white p-16 overflow-y-auto">
                <section className="mb-16">
                    <div className="inline-block px-4 py-1 mb-6 text-[10px] font-black uppercase tracking-widest rounded-full border-2" style={{ borderColor: colors.primary, color: colors.primary }}>
                        Profile Summary
                    </div>
                    <p className="text-xl font-medium text-slate-700 leading-relaxed max-w-2xl">
                        {personalInfo.summary}
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-5xl font-black text-slate-100 uppercase tracking-tighter mb-8 leading-none transform -translate-x-4">Experience</h2>
                    <div className="space-y-12">
                        {experience.map((exp) => (
                            <div key={exp.id} className="group relative">
                                <div className="absolute -left-8 top-2 w-1 h-0 bg-purple-500 group-hover:h-full transition-all duration-500" style={{ backgroundColor: colors.primary }}></div>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800">{exp.jobTitle}</h3>
                                        <div className="font-bold text-slate-400 uppercase text-xs tracking-widest">{exp.company} // {exp.location}</div>
                                    </div>
                                    <span className="font-black text-slate-200 text-sm italic">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <p className="text-slate-500 leading-relaxed text-sm">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-5xl font-black text-slate-100 uppercase tracking-tighter mb-8 transform -translate-x-4">Education</h2>
                    <div className="grid grid-cols-2 gap-8">
                        {education.map((edu) => (
                            <div key={edu.id} className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                                <h3 className="font-bold text-slate-800 text-lg mb-1">{edu.degree}</h3>
                                <div className="text-sm font-bold" style={{ color: colors.primary }}>{edu.institution}</div>
                                <div className="text-xs font-black text-slate-300 mt-2 italic">{edu.startDate} - {edu.endDate}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Modern4;
