import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

// LAYOUT: Basic and simple for free tier
const Modern1 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    // Use very basic styling
    const textColor = '#333';
    const accentColor = '#555';

    return (
        <div className="min-h-full bg-white text-gray-800 p-8 font-sans">
            {/* Basic Header */}
            <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
                {personalInfo?.photo && (
                    <img
                        src={personalInfo.photo}
                        alt={personalInfo.fullName}
                        className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                    />
                )}
                <h1 className="text-3xl font-bold mb-1" style={{ color: textColor }}>
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                <h2 className="text-lg font-medium mb-3" style={{ color: accentColor }}>
                    {experience?.[0]?.jobTitle || 'Professional Title'}
                </h2>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo?.address && <span>{personalInfo.address}</span>}
                    {personalInfo?.website && <span>{personalInfo.website}</span>}
                </div>
            </div>

            {/* Basic Body */}
            <div className="space-y-6">
                {personalInfo?.summary && (
                    <section>
                        <h3 className="text-lg font-bold border-b border-gray-200 mb-2 pb-1" style={{ color: accentColor }}>
                            {t('editor.sections.summary')}
                        </h3>
                        <p className="text-sm text-gray-700">{personalInfo.summary}</p>
                    </section>
                )}

                {experience?.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold border-b border-gray-200 mb-2 pb-1" style={{ color: accentColor }}>
                            {t('editor.sections.experience')}
                        </h3>
                        <div className="space-y-4">
                            {experience.map((exp, idx) => (
                                <div key={exp.id || idx}>
                                    <div className="flex justify-between font-bold">
                                        <span>{exp.jobTitle}</span>
                                        <span className="text-sm font-normal text-gray-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                                    </div>
                                    <div className="text-sm font-medium mb-1">{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
                                    <p className="text-sm text-gray-700">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {education?.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold border-b border-gray-200 mb-2 pb-1" style={{ color: accentColor }}>
                            {t('editor.sections.education')}
                        </h3>
                        <div className="space-y-3">
                            {education.map((edu, idx) => (
                                <div key={edu.id || idx}>
                                    <div className="flex justify-between font-bold">
                                        <span>{edu.degree}</span>
                                        <span className="text-sm font-normal text-gray-500">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</span>
                                    </div>
                                    <div className="text-sm">{edu.institution}</div>
                                    {edu.description && <p className="text-sm text-gray-700 mt-1">{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {skills?.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold border-b border-gray-200 mb-2 pb-1" style={{ color: accentColor }}>
                            {t('editor.sections.skills')}
                        </h3>
                        <div className="text-sm text-gray-700">
                            {skills.map(s => getSkillName(s)).filter(Boolean).join(' • ')}
                        </div>
                    </section>
                )}

                {languages?.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold border-b border-gray-200 mb-2 pb-1" style={{ color: accentColor }}>
                            {t('editor.sections.languages')}
                        </h3>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                            {languages.map((lang, idx) => {
                                const name = getLangName(lang);
                                const level = getLangLevel(lang);
                                return name ? (
                                    <div key={idx}>
                                        <span className="font-semibold">{name}</span>: {level}
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Modern1;

