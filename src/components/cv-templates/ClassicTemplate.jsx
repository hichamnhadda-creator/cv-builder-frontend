import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const ClassicTemplate = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#111827', secondary: '#4b5563' };
    const fontFamily = customization?.fonts?.body || 'Georgia, serif';
    const headingFont = customization?.fonts?.heading || 'Georgia, serif';

    return (
        <div className="bg-white p-12 md:p-16 h-full shadow-lg overflow-hidden break-words max-w-full flex flex-col" style={{ fontFamily }}>
            {/* Centered Header */}
            <header className="text-center border-b-2 pb-8 mb-10" style={{ borderColor: colors.primary }}>
                {personalInfo?.photo && (
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm flex-shrink-0">
                        <img
                            src={personalInfo.photo}
                            alt={personalInfo.fullName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <h1 className="text-4xl font-bold mb-3 uppercase tracking-widest text-slate-900" style={{ fontFamily: headingFont }}>
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                <div className="text-base text-slate-500 font-medium mb-4 italic">
                    {experience?.[0]?.jobTitle || 'Professional Title'}
                </div>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-slate-600 font-medium uppercase tracking-wide">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo?.address && <span>{personalInfo.address}</span>}
                    {personalInfo?.website && <span>{personalInfo.website}</span>}
                </div>
            </header>

            <div className="flex-1 space-y-10 overflow-y-auto pr-2">
                {/* Summary */}
                {personalInfo?.summary && (
                    <section>
                        <h2 className="text-lg font-bold mb-3 uppercase tracking-widest border-b pb-1 text-slate-800" style={{ borderColor: '#e5e7eb' }}>
                            {t('editor.sections.summary')}
                        </h2>
                        <p className="text-slate-700 text-sm leading-relaxed text-justify">
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience && experience.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold mb-5 uppercase tracking-widest border-b pb-1 text-slate-800" style={{ borderColor: '#e5e7eb' }}>
                            {t('editor.sections.experience')}
                        </h2>
                        <div className="space-y-8">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-base font-bold text-slate-900 uppercase">{exp.jobTitle}</h3>
                                        <span className="text-sm font-bold text-slate-500">{exp.startDate} — {exp.endDate}</span>
                                    </div>
                                    <div className="text-sm font-bold text-slate-600 italic mb-3">
                                        {exp.company}, {exp.location}
                                    </div>
                                    <p className="text-slate-700 text-sm leading-relaxed text-justify">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold mb-5 uppercase tracking-widest border-b pb-1 text-slate-800" style={{ borderColor: '#e5e7eb' }}>
                            {t('editor.sections.education')}
                        </h2>
                        <div className="space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-base font-bold text-slate-900 uppercase">{edu.institution}</h3>
                                        <span className="text-sm font-bold text-slate-500">{edu.startDate} — {edu.endDate}</span>
                                    </div>
                                    <div className="text-sm font-bold text-slate-600 italic">{edu.degree}</div>
                                    {edu.description && <p className="text-slate-700 text-sm mt-2">{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Grid for Skills & Languages */}
                <div className="grid grid-cols-2 gap-10">
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold mb-4 uppercase tracking-widest border-b pb-1 text-slate-800" style={{ borderColor: '#e5e7eb' }}>
                                {t('editor.sections.skills')}
                            </h2>
                            <div className="text-sm text-slate-700 leading-loose list-disc list-inside">
                                {skills.map(s => getSkillName(s)).filter(Boolean).map((name, i) => (
                                    <div key={i} className="inline-block mr-4">• {name}</div>
                                ))}
                            </div>
                        </section>
                    )}
                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold mb-4 uppercase tracking-widest border-b pb-1 text-slate-800" style={{ borderColor: '#e5e7eb' }}>
                                {t('editor.sections.languages')}
                            </h2>
                            <div className="text-sm text-slate-700 space-y-1">
                                {languages.map((lang, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span className="font-bold">{getLangName(lang)}</span>
                                        <span className="italic text-slate-500">{getLangLevel(lang)}</span>
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

export default ClassicTemplate;
