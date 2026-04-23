import React from 'react';
import { useTranslation } from 'react-i18next';

const Professional3 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#1e3a8a', secondary: '#475569' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    return (
        <div className="h-full bg-white shadow-lg max-w-full overflow-y-auto p-16 text-slate-800" style={{ fontFamily }}>
            {/* Elegant Header */}
            <header className="mb-16">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-5xl font-black tracking-tight" style={{ color: colors.primary, fontFamily: headingFont }}>{personalInfo.fullName}</h1>
                    <div className="flex gap-4">
                        <div className="h-12 w-1" style={{ backgroundColor: colors.primary }}></div>
                        <p className="text-xl font-bold text-slate-400 uppercase tracking-[0.2em] w-48 leading-none">
                            {experience?.[0]?.jobTitle}
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-x-10 gap-y-2 text-xs font-bold text-slate-400 uppercase tracking-widest border-t border-slate-100 pt-6">
                    {personalInfo.email && <div className="flex items-center gap-2"><span style={{ color: colors.primary }}>E.</span> {personalInfo.email}</div>}
                    {personalInfo.phone && <div className="flex items-center gap-2"><span style={{ color: colors.primary }}>P.</span> {personalInfo.phone}</div>}
                    {personalInfo.location && <div className="flex items-center gap-2"><span style={{ color: colors.primary }}>L.</span> {personalInfo.location}</div>}
                </div>
            </header>

            <div className="space-y-16">
                {/* Profile Grid */}
                <section className="grid grid-cols-12 gap-10">
                    <div className="col-span-3">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300">Executive Summary</h2>
                    </div>
                    <div className="col-span-9">
                        <p className="text-lg font-medium leading-relaxed italic text-slate-600">
                            "{personalInfo.summary}"
                        </p>
                    </div>
                </section>

                {/* Experience Grid */}
                <section className="grid grid-cols-12 gap-10">
                    <div className="col-span-3">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300">Key Assignments</h2>
                    </div>
                    <div className="col-span-9 space-y-12">
                        {experience.map((exp) => (
                            <div key={exp.id} className="relative">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{exp.jobTitle}</h3>
                                    <span className="text-xs font-black text-slate-200 italic">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: colors.primary }}>{exp.company} // {exp.location}</div>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills Grid */}
                <section className="grid grid-cols-12 gap-10">
                    <div className="col-span-3">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300">Competencies</h2>
                    </div>
                    <div className="col-span-9">
                        <div className="grid grid-cols-3 gap-6">
                            {skills.map((skill, index) => (
                                <div key={index} className="flex flex-col gap-2">
                                    <span className="text-sm font-bold text-slate-700">{getSkillName(skill)}</span>
                                    <div className="h-1 w-full bg-slate-50 overflow-hidden">
                                        <div className="h-full" style={{ backgroundColor: colors.primary, width: '70%' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Education Grid */}
                <section className="grid grid-cols-12 gap-10">
                    <div className="col-span-3">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300">Credentials</h2>
                    </div>
                    <div className="col-span-9 grid grid-cols-2 gap-10">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <h3 className="font-bold text-slate-800 text-lg mb-1">{edu.degree}</h3>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{edu.institution}</div>
                                <div className="text-[10px] font-black italic text-slate-300">{edu.startDate} - {edu.endDate}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Professional3;
