import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

// LAYOUT: Card-based Modern — each section is a colored card, bold grid layout, photo on right
const Creative1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#059669', secondary: '#064e3b' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    return (
        <div className="min-h-full bg-gray-100 overflow-hidden" style={{ fontFamily }}>
            {/* TOP HEADER CARD — name left, photo right */}
            <div className="px-8 py-8" style={{ background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)` }}>
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h1 className="text-4xl font-black text-white mb-1" style={{ fontFamily: headingFont }}>
                            {personalInfo?.fullName || 'Your Name'}
                        </h1>
                        <h2 className="text-lg font-medium mb-4" style={{ color: `${colors.primary === '#059669' ? '#6ee7b7' : '#fff'}` }}>
                            {experience?.[0]?.jobTitle || 'Professional Title'}
                        </h2>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-white/70">
                            {personalInfo?.email && <span>✉ {personalInfo.email}</span>}
                            {personalInfo?.phone && <span>☎ {personalInfo.phone}</span>}
                            {personalInfo?.address && <span>📍 {personalInfo.address}</span>}
                            {personalInfo?.website && <span>🌐 {personalInfo.website}</span>}
                        </div>
                    </div>
                    {personalInfo?.photo && (
                        <img
                            src={personalInfo.photo}
                            alt={personalInfo.fullName}
                            className="w-28 h-28 rounded-2xl object-cover flex-shrink-0 ml-6 shadow-2xl"
                            style={{ border: '3px solid rgba(255,255,255,0.3)' }}
                        />
                    )}
                </div>
            </div>

            {/* CARDS GRID BODY */}
            <div className="p-6 space-y-4">
                {/* Summary Card */}
                {personalInfo?.summary && (
                    <div className="bg-white rounded-2xl p-5 shadow-sm">
                        <h3 className="font-bold text-xs uppercase tracking-widest mb-3" style={{ color: colors.primary, fontFamily: headingFont }}>
                            {t('editor.sections.summary')}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{personalInfo.summary}</p>
                    </div>
                )}

                {/* Experience + Skills in 2-col grid */}
                <div className="grid grid-cols-3 gap-4">
                    {/* Experience — takes 2/3 */}
                    {experience?.length > 0 && (
                        <div className="col-span-2 bg-white rounded-2xl p-5 shadow-sm">
                            <h3 className="font-bold text-xs uppercase tracking-widest mb-4" style={{ color: colors.primary, fontFamily: headingFont }}>
                                {t('editor.sections.experience')}
                            </h3>
                            <div className="space-y-4">
                                {experience.map((exp, idx) => (
                                    <div key={exp.id || idx} className="p-3 rounded-xl" style={{ backgroundColor: `${colors.primary}08` }}>
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-sm text-gray-900">{exp.jobTitle}</h4>
                                            <span className="text-xs text-gray-400 ml-2 shrink-0">{exp.startDate}–{exp.current ? 'Now' : exp.endDate}</span>
                                        </div>
                                        <div className="text-xs font-semibold mb-1.5" style={{ color: colors.primary }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
                                        <p className="text-xs text-gray-500 leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills + Languages — takes 1/3 */}
                    <div className="col-span-1 space-y-4">
                        {skills?.length > 0 && (
                            <div className="bg-white rounded-2xl p-5 shadow-sm">
                                <h3 className="font-bold text-xs uppercase tracking-widest mb-3" style={{ color: colors.primary, fontFamily: headingFont }}>
                                    {t('editor.sections.skills')}
                                </h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {skills.map((skill, idx) => {
                                        const name = getSkillName(skill);
                                        return name ? (
                                            <span key={idx} className="text-xs px-2.5 py-1 rounded-full font-medium"
                                                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                                {name}
                                            </span>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        )}

                        {languages?.length > 0 && (
                            <div className="bg-white rounded-2xl p-5 shadow-sm">
                                <h3 className="font-bold text-xs uppercase tracking-widest mb-3" style={{ color: colors.primary, fontFamily: headingFont }}>
                                    {t('editor.sections.languages')}
                                </h3>
                                <div className="space-y-2">
                                    {languages.map((lang, idx) => {
                                        const name = getLangName(lang);
                                        const level = getLangLevel(lang);
                                        return name ? (
                                            <div key={idx} className="flex justify-between text-xs">
                                                <span className="font-medium text-gray-700">{name}</span>
                                                <span className="text-gray-400">{level}</span>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Education Row */}
                {education?.length > 0 && (
                    <div className="bg-white rounded-2xl p-5 shadow-sm">
                        <h3 className="font-bold text-xs uppercase tracking-widest mb-4" style={{ color: colors.primary, fontFamily: headingFont }}>
                            {t('editor.sections.education')}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {education.map((edu, idx) => (
                                <div key={edu.id || idx} className="flex gap-3 items-start p-3 rounded-xl" style={{ backgroundColor: `${colors.primary}08` }}>
                                    <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                                        style={{ backgroundColor: colors.primary }}>
                                        🎓
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-gray-900">{edu.degree}</h4>
                                        <div className="text-xs font-medium" style={{ color: colors.primary }}>{edu.institution}</div>
                                        <div className="text-xs text-gray-400 mt-0.5">{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications */}
                {certifications?.length > 0 && (
                    <div className="bg-white rounded-2xl p-5 shadow-sm">
                        <h3 className="font-bold text-xs uppercase tracking-widest mb-3" style={{ color: colors.primary, fontFamily: headingFont }}>
                            {t('editor.sections.certifications')}
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            {certifications.map((cert, idx) => (
                                <div key={cert.id || idx} className="text-xs p-2 rounded-xl text-center"
                                    style={{ backgroundColor: `${colors.primary}10`, color: colors.primary }}>
                                    <div className="font-bold">{cert.name || cert.degree}</div>
                                    <div className="opacity-60 mt-0.5">{cert.issuer || cert.institution}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Creative1;
