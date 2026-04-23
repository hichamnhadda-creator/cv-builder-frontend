import React from 'react';
import { useTranslation } from 'react-i18next';

const Modern2 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#3b82f6', secondary: '#475569' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    return (
        <div className="flex flex-col h-full bg-white shadow-lg overflow-hidden break-words max-w-full" style={{ fontFamily }}>
            {/* Header */}
            <div className="p-8 text-white flex justify-between items-center" style={{ backgroundColor: colors.primary }}>
                <div>
                    <h1 className="text-4xl font-bold mb-1" style={{ fontFamily: headingFont }}>
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    <p className="text-xl opacity-90">
                        {experience?.[0]?.jobTitle || 'Professional Title'}
                    </p>
                </div>
                <div className="text-right text-sm space-y-1 opacity-90">
                    {personalInfo?.email && <div>{personalInfo.email}</div>}
                    {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo?.location && <div>{personalInfo.location}</div>}
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Column */}
                <div className="w-2/3 p-8 border-r border-gray-100 overflow-y-auto">
                    {personalInfo?.summary && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4 uppercase tracking-wider" style={{ color: colors.primary, fontFamily: headingFont }}>
                                {t('editor.sections.summary')}
                            </h2>
                            <p className="text-gray-600 leading-relaxed italic border-l-4 pl-4" style={{ borderColor: colors.primary }}>
                                {personalInfo.summary}
                            </p>
                        </div>
                    )}

                    {experience && experience.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-6 uppercase tracking-wider" style={{ color: colors.primary, fontFamily: headingFont }}>
                                {t('editor.sections.experience')}
                            </h2>
                            <div className="space-y-8">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full" style={{ '--tw-before-bg': colors.primary }}>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="font-bold text-gray-800 text-lg">{exp.jobTitle}</h3>
                                            <span className="text-sm font-semibold px-2 py-1 rounded bg-gray-100 text-gray-600">
                                                {exp.startDate} - {exp.current ? t('editor.common.present') : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-md font-medium mb-3" style={{ color: colors.secondary }}>{exp.company} | {exp.location}</div>
                                        <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="w-1/3 p-8 bg-gray-50 overflow-y-auto">
                    {skills && skills.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-lg font-bold mb-4 uppercase tracking-wider" style={{ color: colors.primary, fontFamily: headingFont }}>
                                {t('editor.sections.skills')}
                            </h2>
                            <div className="space-y-3">
                                {skills.map((skill, index) => {
                                    const name = getSkillName(skill);
                                    return name ? (
                                        <div key={index}>
                                            <div className="flex justify-between text-xs font-bold mb-1 uppercase text-gray-500">
                                                <span>{name}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                                <div className="h-full rounded-full transition-all duration-500" style={{ backgroundColor: colors.primary, width: '85%' }}></div>
                                            </div>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    )}

                    {education && education.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-lg font-bold mb-4 uppercase tracking-wider" style={{ color: colors.primary, fontFamily: headingFont }}>
                                {t('editor.sections.education')}
                            </h2>
                            <div className="space-y-6">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-gray-800 text-sm">{edu.degree}</h3>
                                        <div className="text-xs text-gray-600 font-medium">{edu.institution}</div>
                                        <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">
                                            {edu.startDate} - {edu.endDate}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modern2;
