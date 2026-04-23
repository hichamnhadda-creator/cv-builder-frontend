import React from 'react';
import { useTranslation } from 'react-i18next';

const Modern3 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#10b981', secondary: '#334155' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    return (
        <div className="flex flex-col h-full bg-white shadow-xl max-w-full overflow-hidden" style={{ fontFamily }}>
            {/* Minimal Top Nav */}
            <div className="h-2 w-full" style={{ backgroundColor: colors.primary }}></div>
            
            <div className="flex flex-1">
                {/* Content Area */}
                <div className="flex-1 p-10 overflow-y-auto">
                    <div className="mb-12">
                        <h1 className="text-5xl font-black tracking-tighter mb-2" style={{ fontFamily: headingFont, color: colors.secondary }}>
                            {personalInfo?.fullName?.split(' ')[0]} <span style={{ color: colors.primary }}>{personalInfo?.fullName?.split(' ').slice(1).join(' ')}</span>
                        </h1>
                        <p className="text-2xl font-light text-gray-400 uppercase tracking-[0.2em]">
                            {experience?.[0]?.jobTitle || 'Professional Title'}
                        </p>
                    </div>

                    <div className="grid grid-cols-12 gap-10">
                        {/* Timeline Column */}
                        <div className="col-span-8">
                            <section className="mb-12">
                                <h2 className="text-sm font-bold uppercase tracking-widest mb-8 text-gray-300">Work History</h2>
                                <div className="space-y-12 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-100">
                                    {experience.map((exp) => (
                                        <div key={exp.id} className="relative pl-10">
                                            <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm" style={{ backgroundColor: colors.primary }}></div>
                                            <div className="mb-1">
                                                <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: colors.primary }}>
                                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800">{exp.jobTitle}</h3>
                                            <div className="text-sm font-medium mb-3" style={{ color: colors.primary }}>{exp.company}</div>
                                            <p className="text-gray-500 text-sm leading-relaxed">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="text-sm font-bold uppercase tracking-widest mb-8 text-gray-300">Education</h2>
                                <div className="space-y-8">
                                    {education.map((edu) => (
                                        <div key={edu.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                            <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                                            <div className="text-sm font-medium text-gray-500 mb-1">{edu.institution}</div>
                                            <div className="text-xs text-gray-400">{edu.startDate} - {edu.endDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Details Column */}
                        <div className="col-span-4 space-y-12">
                            <section>
                                <h2 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-300">Contact</h2>
                                <div className="space-y-4 text-sm text-gray-600">
                                    {personalInfo.email && <div className="flex flex-col"><span className="text-[10px] font-bold text-gray-400 uppercase">Email</span>{personalInfo.email}</div>}
                                    {personalInfo.phone && <div className="flex flex-col"><span className="text-[10px] font-bold text-gray-400 uppercase">Phone</span>{personalInfo.phone}</div>}
                                    {personalInfo.address && <div className="flex flex-col"><span className="text-[10px] font-bold text-gray-400 uppercase">Address</span>{personalInfo.address}</div>}
                                </div>
                            </section>

                            <section>
                                <h2 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-300">Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, index) => (
                                        <span key={index} className="px-4 py-2 bg-white border border-gray-100 shadow-sm rounded-xl text-xs font-medium text-gray-700">
                                            {getSkillName(skill)}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {personalInfo.summary && (
                                <section>
                                    <h2 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-300">About Me</h2>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {personalInfo.summary}
                                    </p>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modern3;
