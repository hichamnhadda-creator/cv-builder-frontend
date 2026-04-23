import React from 'react';
import { useTranslation } from 'react-i18next';

const Professional1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#1f2937', secondary: '#4b5563' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    return (
        <div className="h-full bg-white shadow-lg max-w-full overflow-y-auto p-12 text-gray-800" style={{ fontFamily }}>
            {/* Header Section */}
            <div className="border-b-4 pb-8 mb-10 flex justify-between items-end" style={{ borderColor: colors.primary }}>
                <div>
                    <h1 className="text-4xl font-bold uppercase tracking-tight mb-2" style={{ fontFamily: headingFont, color: colors.primary }}>
                        {personalInfo?.fullName}
                    </h1>
                    <p className="text-xl font-medium text-gray-500 uppercase tracking-widest">
                        {experience?.[0]?.jobTitle}
                    </p>
                </div>
                <div className="text-right text-sm space-y-1 font-medium text-gray-600">
                    {personalInfo?.email && <div>{personalInfo.email}</div>}
                    {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo?.location && <div>{personalInfo.location}</div>}
                    {personalInfo?.website && <div className="text-blue-600">{personalInfo.website}</div>}
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-10">
                {/* Summary */}
                {personalInfo?.summary && (
                    <section>
                        <h2 className="text-lg font-bold uppercase mb-4 tracking-widest border-l-4 pl-4" style={{ borderColor: colors.primary }}>
                            {t('editor.sections.summary')}
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-justify">
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience && experience.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase mb-6 tracking-widest border-l-4 pl-4" style={{ borderColor: colors.primary }}>
                            {t('editor.sections.experience')}
                        </h2>
                        <div className="space-y-8">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-xl font-bold">{exp.jobTitle}</h3>
                                        <span className="font-bold text-sm text-gray-500 uppercase">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-md font-bold italic mb-3" style={{ color: colors.primary }}>{exp.company} | {exp.location}</div>
                                    <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-12">
                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase mb-6 tracking-widest border-l-4 pl-4" style={{ borderColor: colors.primary }}>
                                {t('editor.sections.education')}
                            </h2>
                            <div className="space-y-6">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                                        <div className="text-sm font-medium text-gray-600 italic">{edu.institution}</div>
                                        <div className="text-xs text-gray-400 font-bold mt-1 uppercase">
                                            {edu.startDate} - {edu.endDate}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase mb-6 tracking-widest border-l-4 pl-4" style={{ borderColor: colors.primary }}>
                                {t('editor.sections.skills')}
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {skills.map((skill, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                                        {getSkillName(skill)}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Professional1;
