import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

// LAYOUT: Sidebar — bold left panel with photo, contact & skills; main content on right
const Professional1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#7c3aed', secondary: '#1e1b4b' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    return (
        <div className="min-h-full flex overflow-hidden" style={{ fontFamily }}>
            {/* LEFT SIDEBAR — colored panel */}
            <div className="w-64 flex-shrink-0 flex flex-col px-6 py-8" style={{ backgroundColor: colors.secondary, color: 'white' }}>
                {/* Photo */}
                {personalInfo?.photo ? (
                    <img
                        src={personalInfo.photo}
                        alt={personalInfo.fullName}
                        className="w-32 h-32 rounded-2xl object-cover mb-5 mx-auto shadow-xl"
                        style={{ border: `3px solid ${colors.primary}` }}
                    />
                ) : (
                    <div className="w-32 h-32 rounded-2xl mx-auto mb-5 flex items-center justify-center text-3xl font-black"
                        style={{ backgroundColor: colors.primary }}>
                        {(personalInfo?.fullName || 'U')[0]}
                    </div>
                )}

                {/* Name & Title */}
                <h1 className="text-xl font-black text-center mb-1" style={{ fontFamily: headingFont }}>
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                <p className="text-sm text-center mb-6 opacity-70" style={{ color: colors.primary === '#7c3aed' ? '#c4b5fd' : `${colors.primary}cc` }}>
                    {experience?.[0]?.jobTitle || 'Professional Title'}
                </p>

                {/* Contact info */}
                <div className="space-y-2 mb-6">
                    <div className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Contact</div>
                    {personalInfo?.email && (
                        <div className="text-xs opacity-80 break-all">✉ {personalInfo.email}</div>
                    )}
                    {personalInfo?.phone && (
                        <div className="text-xs opacity-80">☎ {personalInfo.phone}</div>
                    )}
                    {personalInfo?.address && (
                        <div className="text-xs opacity-80">📍 {personalInfo.address}</div>
                    )}
                    {personalInfo?.website && (
                        <div className="text-xs opacity-80 break-all">🌐 {personalInfo.website}</div>
                    )}
                </div>

                {/* Skills */}
                {skills?.length > 0 && (
                    <div className="mb-6">
                        <div className="text-xs font-bold uppercase tracking-widest opacity-50 mb-3">{t('editor.sections.skills')}</div>
                        <div className="space-y-2">
                            {skills.map((skill, idx) => {
                                const name = getSkillName(skill);
                                return name ? (
                                    <div key={idx} className="text-xs opacity-90 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: colors.primary }} />
                                        {name}
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {languages?.length > 0 && (
                    <div className="mb-6">
                        <div className="text-xs font-bold uppercase tracking-widest opacity-50 mb-3">{t('editor.sections.languages')}</div>
                        <div className="space-y-2">
                            {languages.map((lang, idx) => {
                                const name = getLangName(lang);
                                const level = getLangLevel(lang);
                                return name ? (
                                    <div key={idx} className="flex justify-between text-xs">
                                        <span className="opacity-90">{name}</span>
                                        <span className="opacity-50">{level}</span>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}

                {/* Certifications */}
                {certifications?.length > 0 && (
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest opacity-50 mb-3">{t('editor.sections.certifications')}</div>
                        <div className="space-y-3">
                            {certifications.map((cert, idx) => (
                                <div key={cert.id || idx} className="text-xs opacity-80">
                                    <div className="font-bold">{cert.name || cert.degree}</div>
                                    <div className="opacity-60">{cert.issuer || cert.institution}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT MAIN CONTENT */}
            <div className="flex-1 bg-white px-10 py-8 space-y-8">
                {personalInfo?.summary && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: colors.primary, fontFamily: headingFont }}>
                            <span className="w-6 h-0.5 inline-block" style={{ backgroundColor: colors.primary }} />
                            {t('editor.sections.summary')}
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-600">{personalInfo.summary}</p>
                    </section>
                )}

                {experience?.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: colors.primary, fontFamily: headingFont }}>
                            <span className="w-6 h-0.5 inline-block" style={{ backgroundColor: colors.primary }} />
                            {t('editor.sections.experience')}
                        </h3>
                        <div className="space-y-5">
                            {experience.map((exp, idx) => (
                                <div key={exp.id || idx} className="relative pl-5 border-l-2" style={{ borderColor: `${colors.primary}40` }}>
                                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }} />
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-gray-900">{exp.jobTitle}</h4>
                                            <div className="text-sm font-medium mt-0.5" style={{ color: colors.primary }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
                                        </div>
                                        <span className="text-xs text-gray-400 shrink-0 ml-4 bg-gray-100 px-2 py-0.5 rounded">
                                            {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {education?.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: colors.primary, fontFamily: headingFont }}>
                            <span className="w-6 h-0.5 inline-block" style={{ backgroundColor: colors.primary }} />
                            {t('editor.sections.education')}
                        </h3>
                        <div className="space-y-4">
                            {education.map((edu, idx) => (
                                <div key={edu.id || idx} className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                                        <div className="text-sm" style={{ color: colors.primary }}>{edu.institution}</div>
                                        {edu.description && <p className="text-xs text-gray-500 mt-1">{edu.description}</p>}
                                    </div>
                                    <span className="text-xs text-gray-400 shrink-0 ml-4">{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {projects?.length > 0 && (
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: colors.primary, fontFamily: headingFont }}>
                            <span className="w-6 h-0.5 inline-block" style={{ backgroundColor: colors.primary }} />
                            {t('editor.sections.projects')}
                        </h3>
                        <div className="space-y-3">
                            {projects.map((proj, idx) => (
                                <div key={proj.id || idx}>
                                    <h4 className="font-bold text-sm text-gray-900">{proj.name}</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Professional1;
