import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

// LAYOUT: Minimal — NO image, pure typography, single column, elegant spacing
const Minimal1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#111827', secondary: '#6b7280' };
    const fontFamily = customization?.fonts?.body || 'Georgia, serif';
    const headingFont = customization?.fonts?.heading || 'Georgia, serif';

    return (
        <div className="min-h-full bg-white text-gray-900 overflow-hidden" style={{ fontFamily }}>
            {/* MINIMAL HEADER — no photo, centered text, just name + divider */}
            <div className="px-16 pt-14 pb-8">
                <div className="text-center mb-6">
                    <h1 className="text-5xl font-black tracking-tight mb-2" style={{ fontFamily: headingFont, color: colors.primary }}>
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    <p className="text-base font-medium tracking-widest uppercase" style={{ color: colors.secondary }}>
                        {experience?.[0]?.jobTitle || 'Professional Title'}
                    </p>
                </div>

                {/* Contact row — horizontal inline */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 pb-6 border-b border-gray-200">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo?.address && <span>{personalInfo.address}</span>}
                    {personalInfo?.website && <span>{personalInfo.website}</span>}
                </div>
            </div>

            {/* BODY — single column, generous spacing */}
            <div className="px-16 pb-14 space-y-10">
                {personalInfo?.summary && (
                    <section>
                        <p className="text-base leading-loose text-gray-600 italic border-l-4 pl-5" style={{ borderColor: colors.primary }}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {experience?.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-5">
                            {t('editor.sections.experience')}
                        </h3>
                        <div className="space-y-6">
                            {experience.map((exp, idx) => (
                                <div key={exp.id || idx} className="grid grid-cols-4 gap-4">
                                    <div className="col-span-1 text-right text-xs text-gray-400 pt-1 leading-relaxed">
                                        <div>{exp.startDate}</div>
                                        <div>—</div>
                                        <div>{exp.current ? 'Present' : exp.endDate}</div>
                                    </div>
                                    <div className="col-span-3">
                                        <h4 className="font-bold text-gray-900 text-base">{exp.jobTitle}</h4>
                                        <div className="text-sm text-gray-500 mb-2">{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
                                        <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {education?.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-5">
                            {t('editor.sections.education')}
                        </h3>
                        <div className="space-y-4">
                            {education.map((edu, idx) => (
                                <div key={edu.id || idx} className="grid grid-cols-4 gap-4">
                                    <div className="col-span-1 text-right text-xs text-gray-400 pt-1">
                                        <div>{edu.startDate}</div>
                                        {edu.endDate && <div>— {edu.current ? 'Present' : edu.endDate}</div>}
                                    </div>
                                    <div className="col-span-3">
                                        <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                                        <div className="text-sm text-gray-500">{edu.institution}</div>
                                        {edu.description && <p className="text-xs text-gray-400 mt-1">{edu.description}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills & Languages in a clean 2-col row */}
                {(skills?.length > 0 || languages?.length > 0) && (
                    <div className="grid grid-cols-2 gap-10 pt-4 border-t border-gray-100">
                        {skills?.length > 0 && (
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                                    {t('editor.sections.skills')}
                                </h3>
                                <div className="flex flex-wrap gap-x-4 gap-y-1">
                                    {skills.map((skill, idx) => {
                                        const name = getSkillName(skill);
                                        return name ? (
                                            <span key={idx} className="text-sm text-gray-600">
                                                {name}{idx < skills.length - 1 ? ',' : ''}
                                            </span>
                                        ) : null;
                                    })}
                                </div>
                            </section>
                        )}

                        {languages?.length > 0 && (
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                                    {t('editor.sections.languages')}
                                </h3>
                                <div className="space-y-1">
                                    {languages.map((lang, idx) => {
                                        const name = getLangName(lang);
                                        const level = getLangLevel(lang);
                                        return name ? (
                                            <div key={idx} className="text-sm text-gray-600 flex gap-2">
                                                <span>{name}</span>
                                                <span className="text-gray-400">·</span>
                                                <span className="text-gray-400">{level}</span>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            </section>
                        )}
                    </div>
                )}

                {certifications?.length > 0 && (
                    <section className="pt-4 border-t border-gray-100">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                            {t('editor.sections.certifications')}
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {certifications.map((cert, idx) => (
                                <div key={cert.id || idx} className="text-sm">
                                    <span className="font-medium text-gray-800">{cert.name || cert.degree}</span>
                                    <span className="text-gray-400"> · {cert.issuer || cert.institution}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Minimal1;
