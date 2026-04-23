import React from 'react';
import { useTranslation } from 'react-i18next';

const Professional5 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#111827', secondary: '#6b7280' };
    const fontFamily = customization?.fonts?.body || 'Playfair Display, serif';
    const headingFont = customization?.fonts?.heading || 'Playfair Display, serif';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    return (
        <div className="h-full bg-[#fffcf5] shadow-2xl max-w-full overflow-y-auto p-20 text-slate-900 border-[20px] border-double border-slate-100" style={{ fontFamily }}>
            {/* Traditional Centered Header */}
            <header className="text-center mb-20 border-b border-slate-200 pb-12">
                <h1 className="text-5xl font-serif font-black tracking-tight mb-4" style={{ color: colors.primary, fontFamily: headingFont }}>{personalInfo.fullName}</h1>
                <div className="flex justify-center items-center gap-4 text-xs font-serif italic text-slate-500 uppercase tracking-[0.2em]">
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.phone && <span className="text-slate-300">•</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.email && <span className="text-slate-300">•</span>}
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                </div>
            </header>

            <div className="space-y-16 max-w-3xl mx-auto">
                <section>
                    <h2 className="text-sm font-serif font-black uppercase tracking-[0.4em] text-slate-400 mb-8 text-center">Professional Profile</h2>
                    <p className="text-lg font-serif italic leading-relaxed text-slate-700 text-center px-10">
                        {personalInfo.summary}
                    </p>
                </section>

                <section>
                    <h2 className="text-sm font-serif font-black uppercase tracking-[0.4em] text-slate-400 mb-10 border-t border-slate-100 pt-10">Experience</h2>
                    <div className="space-y-14">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <h3 className="text-2xl font-serif font-bold text-slate-900 mb-1">{exp.jobTitle}</h3>
                                        <div className="text-sm font-serif font-black text-slate-500 uppercase tracking-widest">{exp.company}</div>
                                    </div>
                                    <div className="text-xs font-serif font-black text-slate-300 uppercase tracking-widest italic">{exp.startDate} — {exp.endDate}</div>
                                </div>
                                <p className="text-slate-600 font-serif leading-relaxed text-md text-justify">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-serif font-black uppercase tracking-[0.4em] text-slate-400 mb-10 border-t border-slate-100 pt-10">Education</h2>
                    <div className="space-y-10">
                        {education.map((edu) => (
                            <div key={edu.id} className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-serif font-bold text-slate-900 mb-1">{edu.degree}</h3>
                                    <div className="text-sm font-serif font-black text-slate-400 uppercase tracking-widest">{edu.institution}</div>
                                </div>
                                <div className="text-xs font-serif font-black text-slate-300 uppercase tracking-widest italic">{edu.startDate} — {edu.endDate}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="pt-10 border-t border-slate-100">
                    <div className="grid grid-cols-3 gap-10">
                        <div className="col-span-1">
                            <h2 className="text-xs font-serif font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Expertise</h2>
                        </div>
                        <div className="col-span-2">
                            <div className="flex flex-wrap gap-x-8 gap-y-4">
                                {skills.map((skill, index) => (
                                    <span key={index} className="text-sm font-serif font-black text-slate-600 uppercase tracking-widest">
                                        {getSkillName(skill)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Professional5;
