import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel, getLangLabel } from './components/utils';

const Executive11 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#1e3a8a', secondary: '#475569' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Georgia, serif';

    return (
        <div className="flex-1 w-full h-full flex flex-row-reverse text-gray-800 bg-white font-sans border-t-8" style={{ fontFamily, borderColor: colors.primary }}>
            {/* Right Sidebar: Photo and details */}
            <div className="w-1/3 p-8 bg-gray-50 flex flex-col border-l border-gray-200">
                {personalInfo?.photo && (
                    <div className="w-full aspect-square rounded-full overflow-hidden mb-8 shadow-md border-4 flex-shrink-0 mx-auto max-w-[200px]" style={{ borderColor: 'white' }}>
                        <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-full h-full object-cover" />
                    </div>
                )}
                
                <div className="space-y-4 text-sm font-medium mb-10 text-gray-600">
                    {personalInfo?.email && <div className="flex flex-col"><span className="text-xs uppercase font-bold tracking-widest mb-1" style={{ color: colors.primary }}>Email</span> {personalInfo.email}</div>}
                    {personalInfo?.phone && <div className="flex flex-col"><span className="text-xs uppercase font-bold tracking-widest mb-1 mt-2" style={{ color: colors.primary }}>Phone</span> {personalInfo.phone}</div>}
                    {personalInfo?.address && <div className="flex flex-col"><span className="text-xs uppercase font-bold tracking-widest mb-1 mt-2" style={{ color: colors.primary }}>Location</span> {personalInfo.address}</div>}
                    {personalInfo?.website && <div className="flex flex-col"><span className="text-xs uppercase font-bold tracking-widest mb-1 mt-2" style={{ color: colors.primary }}>Website</span> {personalInfo.website}</div>}
                </div>

                {skills?.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-sm uppercase tracking-widest font-bold mb-4 pb-2 border-b-2" style={{ color: colors.primary, borderColor: colors.primary }}>
                            {t('editor.sections.skills')}
                        </h3>
                        <div className="flex flex-col gap-2">
                            {skills.map((skill, idx) => {
                                const name = getSkillName(skill);
                                return name ? (
                                    <span key={idx} className="text-sm font-semibold text-gray-700">
                                        • {name}
                                    </span>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}

                {languages?.length > 0 && (
                    <div>
                        <h3 className="text-sm uppercase tracking-widest font-bold mb-4 pb-2 border-b-2" style={{ color: colors.primary, borderColor: colors.primary }}>
                            {t('editor.sections.languages')}
                        </h3>
                        <div className="space-y-3">
                            {languages.map((lang, idx) => {
                                const name = getLangName(lang);
                                const level = getLangLevel(lang);
                                const label = getLangLabel(level);
                                return name ? (
                                    <div key={idx} className="flex flex-col">
                                        <span className="font-bold text-gray-800 text-sm">{name}</span>
                                        <span className="text-xs text-gray-500 italic">
                                            {t(`editor.languages.levels.${label}`, { defaultValue: label })}
                                        </span>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Left Main Content */}
            <div className="w-2/3 p-10">
                <header className="mb-12">
                    <h1 className="text-5xl font-bold mb-3" style={{ fontFamily: headingFont, color: colors.primary }}>
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    <h2 className="text-xl tracking-widest uppercase font-semibold" style={{ color: colors.secondary }}>
                        {experience?.[0]?.jobTitle || 'Professional Title'}
                    </h2>
                </header>

                {personalInfo?.summary && (
                    <section className="mb-10">
                        <h3 className="text-2xl font-bold mb-4 pb-2 border-b" style={{ fontFamily: headingFont, color: colors.primary, borderColor: '#e5e7eb' }}>
                            {t('editor.sections.summary')}
                        </h3>
                        <p className="leading-relaxed text-gray-700 text-justify">{personalInfo.summary}</p>
                    </section>
                )}

                {experience?.length > 0 && (
                    <section className="mb-10">
                        <h3 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ fontFamily: headingFont, color: colors.primary, borderColor: '#e5e7eb' }}>
                            {t('editor.sections.experience')}
                        </h3>
                        <div className="space-y-8">
                            {experience.map((exp, idx) => (
                                <div key={exp.id || idx}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="text-xl font-bold text-gray-900">{exp.jobTitle}</h4>
                                        <span className="text-sm font-bold text-gray-500">
                                            {exp.startDate} - {exp.current ? t('editor.common.present') : exp.endDate}
                                        </span>
                                    </div>
                                    <div className="text-md font-semibold mb-3 uppercase tracking-wide" style={{ color: colors.secondary }}>
                                        {exp.company} {exp.location && `| ${exp.location}`}
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-700">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {education?.length > 0 && (
                    <section>
                        <h3 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ fontFamily: headingFont, color: colors.primary, borderColor: '#e5e7eb' }}>
                            {t('editor.sections.education')}
                        </h3>
                        <div className="space-y-6">
                            {education.map((edu, idx) => (
                                <div key={edu.id || idx}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="text-lg font-bold text-gray-900">{edu.degree}</h4>
                                        <span className="text-sm font-bold text-gray-500">
                                            {edu.startDate} - {edu.current ? t('editor.common.present') : edu.endDate}
                                        </span>
                                    </div>
                                    <div className="font-semibold uppercase tracking-wide mb-2" style={{ color: colors.secondary, fontSize: '0.85rem' }}>
                                        {edu.institution}
                                    </div>
                                    {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {projects?.length > 0 && (
                    <section className="mb-10 mt-10">
                        <h3 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ fontFamily: headingFont, color: colors.primary, borderColor: '#e5e7eb' }}>
                            {t('editor.sections.projects')}
                        </h3>
                        <div className="space-y-6">
                            {projects.map((proj, idx) => (
                                <div key={proj.id || idx}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="text-lg font-bold text-gray-900">{proj.name}</h4>
                                        {proj.link && <a href={proj.link} className="text-sm font-bold text-gray-500 hover:underline">{proj.link}</a>}
                                    </div>
                                    {proj.description && <p className="text-sm text-gray-700">{proj.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {certifications?.length > 0 && (
                    <section className="mt-10">
                        <h3 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ fontFamily: headingFont, color: colors.primary, borderColor: '#e5e7eb' }}>
                            {t('editor.sections.certifications')}
                        </h3>
                        <div className="space-y-6">
                            {certifications.map((cert, idx) => (
                                <div key={cert.id || idx}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="text-md font-bold text-gray-900">{cert.name || cert.degree}</h4>
                                        <span className="text-sm font-bold text-gray-500">
                                            {cert.year || cert.startDate}
                                        </span>
                                    </div>
                                    <div className="font-semibold uppercase tracking-wide mb-2" style={{ color: colors.secondary, fontSize: '0.85rem' }}>
                                        {cert.issuer || cert.institution}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Executive11;
