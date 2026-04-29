import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const MinimalTemplate = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#000000', secondary: '#525252' };
    const fontFamily = customization?.fonts?.body || 'serif';
    const headingFont = customization?.fonts?.heading || 'serif';

    return (
        <div className="bg-white p-12 md:p-16 lg:p-20 h-full shadow-lg overflow-hidden text-neutral-800 break-words max-w-full flex flex-col items-center" style={{ fontFamily }}>
            <div className="max-w-2xl w-full">
                {/* Header (No Photo) */}
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tighter" style={{ color: colors.primary, fontFamily: headingFont }}>
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    <div className="text-sm font-medium text-neutral-400 uppercase tracking-[0.2em] flex flex-wrap justify-center gap-x-6 gap-y-2">
                        {personalInfo?.email && <span>{personalInfo.email}</span>}
                        {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo?.address && <span>{personalInfo.address}</span>}
                        {personalInfo?.website && <span>{personalInfo.website}</span>}
                    </div>
                </header>

                <div className="space-y-16">
                    {/* Summary */}
                    {personalInfo?.summary && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-6 text-neutral-300 text-center">
                                {t('editor.sections.summary')}
                            </h2>
                            <p className="text-base leading-relaxed text-neutral-600 text-center italic max-w-xl mx-auto">
                                "{personalInfo.summary}"
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience && experience.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-neutral-300 text-center">
                                {t('editor.sections.experience')}
                            </h2>
                            <div className="space-y-12">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="text-center">
                                        <h3 className="text-xl font-bold text-neutral-800 mb-1">{exp.jobTitle}</h3>
                                        <div className="text-sm font-medium text-neutral-400 mb-4 uppercase tracking-widest">
                                            {exp.company} / {exp.startDate} — {exp.endDate}
                                        </div>
                                        <p className="text-neutral-600 text-sm leading-relaxed max-w-lg mx-auto">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-neutral-300 text-center">
                                {t('editor.sections.education')}
                            </h2>
                            <div className="space-y-8">
                                {education.map((edu) => (
                                    <div key={edu.id} className="text-center">
                                        <h3 className="text-lg font-bold text-neutral-800">{edu.institution}</h3>
                                        <div className="text-sm text-neutral-500">{edu.degree}</div>
                                        <div className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">
                                            {edu.startDate} — {edu.endDate}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills & Languages (Side by Side in minimal style) */}
                    <div className="grid grid-cols-2 gap-10">
                        {skills && skills.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-6 text-neutral-300">
                                    {t('editor.sections.skills')}
                                </h2>
                                <div className="text-sm text-neutral-600 leading-loose">
                                    {skills.map(s => getSkillName(s)).filter(Boolean).join(', ')}
                                </div>
                            </section>
                        )}
                        {languages && languages.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-6 text-neutral-300 text-right">
                                    {t('editor.sections.languages')}
                                </h2>
                                <div className="text-sm text-neutral-600 leading-loose text-right">
                                    {languages.map((lang, idx) => (
                                        <div key={idx}>{getLangName(lang)} ({getLangLevel(lang)})</div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MinimalTemplate;
