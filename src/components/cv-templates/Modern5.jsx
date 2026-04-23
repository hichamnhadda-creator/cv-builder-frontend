import React from 'react';
import { useTranslation } from 'react-i18next';

const Modern5 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#f97316', secondary: '#1e293b' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    return (
        <div className="h-full bg-[#fdfdfd] shadow-inner max-w-full overflow-y-auto p-12" style={{ fontFamily }}>
            {/* Minimal Header Card */}
            <header className="bg-white rounded-[2.5rem] p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 flex items-center gap-10 mb-12">
                <div className="w-40 h-40 rounded-[2rem] overflow-hidden shadow-xl ring-8 ring-gray-50 flex-shrink-0">
                    {personalInfo?.photo ? (
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-orange-50 flex items-center justify-center text-5xl">👤</div>
                    )}
                </div>
                <div className="flex-1">
                    <h1 className="text-6xl font-black tracking-tight text-slate-800 mb-2 leading-none" style={{ fontFamily: headingFont }}>
                        {personalInfo?.fullName}
                    </h1>
                    <div className="flex items-center gap-4 text-xl font-medium text-orange-500 mb-6">
                        <span>{experience?.[0]?.jobTitle}</span>
                        <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                        <span className="text-slate-400 font-normal">{personalInfo?.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {personalInfo.email && <span className="px-4 py-2 bg-slate-50 rounded-full text-sm font-semibold text-slate-500 border border-slate-100">{personalInfo.email}</span>}
                        {personalInfo.phone && <span className="px-4 py-2 bg-slate-50 rounded-full text-sm font-semibold text-slate-500 border border-slate-100">{personalInfo.phone}</span>}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-12">
                {/* Left Column - Main Details */}
                <div className="col-span-8 space-y-12">
                    <section className="bg-white rounded-[2.5rem] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-gray-50">
                        <h2 className="text-2xl font-black mb-8 flex items-center gap-4 text-slate-800" style={{ fontFamily: headingFont }}>
                            <div className="w-3 h-10 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                            Professional Path
                        </h2>
                        <div className="space-y-10">
                            {experience.map((exp) => (
                                <div key={exp.id} className="relative pl-8 border-l-2 border-slate-50 hover:border-orange-200 transition-colors">
                                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4" style={{ borderColor: colors.primary }}></div>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-xl font-bold text-slate-800">{exp.jobTitle}</h3>
                                        <span className="text-sm font-bold text-slate-300">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-orange-500 font-bold mb-3">{exp.company}</div>
                                    <p className="text-slate-500 leading-relaxed text-sm">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white rounded-[2.5rem] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-gray-50">
                        <h2 className="text-2xl font-black mb-8 flex items-center gap-4 text-slate-800" style={{ fontFamily: headingFont }}>
                            <div className="w-3 h-10 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                            Education
                        </h2>
                        <div className="grid grid-cols-2 gap-8">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h3 className="font-bold text-slate-800 text-lg">{edu.degree}</h3>
                                    <div className="text-sm font-semibold text-slate-400 mb-1">{edu.institution}</div>
                                    <div className="text-xs font-bold text-orange-400">{edu.startDate} - {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column - Skills & Bio */}
                <div className="col-span-4 space-y-12">
                    <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
                        <h2 className="text-xl font-bold mb-6 text-orange-400">About Me</h2>
                        <p className="text-sm text-slate-300 leading-relaxed font-medium">
                            {personalInfo.summary}
                        </p>
                    </section>

                    <section className="bg-white rounded-[2.5rem] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-gray-50">
                        <h2 className="text-xl font-black mb-6 text-slate-800" style={{ fontFamily: headingFont }}>Capabilities</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="px-4 py-2 bg-orange-50 text-orange-600 rounded-2xl text-xs font-bold border border-orange-100">
                                    {getSkillName(skill)}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Modern5;
