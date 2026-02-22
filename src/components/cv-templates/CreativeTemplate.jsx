import React from 'react';
import { useTranslation } from 'react-i18next';

const CreativeTemplate = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#ec4899', secondary: '#f59e0b' };
    const fontFamily = customization?.fonts?.body || 'Raleway';
    const headingFont = customization?.fonts?.heading || 'Montserrat';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    const getLangName = (lang) => {
        if (!lang) return '';
        if (typeof lang === 'object') return lang.language || lang.name || '';
        return lang;
    };

    const getLangLevel = (lang) => {
        if (!lang) return '';
        if (typeof lang === 'object') return lang.level || '';
        return '';
    };

    return (
        <div className="bg-white h-full shadow-lg overflow-hidden flex flex-col break-words max-w-full" style={{ fontFamily }}>
            {/* 1. Personal Information (Header / Banner) */}
            <div className="p-6 md:p-8 lg:p-10 text-white relative overflow-hidden flex-shrink-0">
                <div
                    className="absolute inset-0 z-0"
                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                ></div>

                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 z-0 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-8 -mb-8 z-0 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 lg:gap-8 max-w-full">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full p-1 shadow-xl flex-shrink-0 overflow-hidden">
                        {personalInfo?.photo ? (
                            <img
                                src={personalInfo.photo}
                                alt={personalInfo.fullName}
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400">
                                📷
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0 max-w-full text-center sm:text-left">
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-2 tracking-tight break-words max-w-full leading-tight" style={{ fontFamily: headingFont }}>
                            {personalInfo?.fullName || 'Your Name'}
                        </h1>
                        <p className="text-base md:text-xl lg:text-2xl font-light opacity-90 tracking-wider uppercase break-words max-w-full mb-4">
                            {experience?.[0]?.jobTitle || 'Creative Professional'}
                        </p>

                        {/* More Contact Info in Header for Creative */}
                        <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-xs md:text-sm opacity-90 break-words">
                            {personalInfo?.email && <div className="flex items-center gap-1"><span>✉️</span> {personalInfo.email}</div>}
                            {personalInfo?.phone && <div className="flex items-center gap-1"><span>📱</span> {personalInfo.phone}</div>}
                            {personalInfo?.address && <div className="flex items-center gap-1"><span>📍</span> {personalInfo.address}</div>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="flex-1 flex min-h-0">
                {/* Left Column (Main) */}
                <div className="w-7/12 p-8 border-r border-gray-100 flex flex-col overflow-y-auto">
                    {/* 2. Professional Summary */}
                    {personalInfo?.summary && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 uppercase" style={{ color: colors.primary, fontFamily: headingFont }}>
                                <span className="text-xl">👤</span> {t('editor.sections.summary')}
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-sm break-words text-justify">
                                {personalInfo.summary}
                            </p>
                        </div>
                    )}

                    {/* 4. Projects */}
                    {projects && projects.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 uppercase" style={{ color: colors.primary, fontFamily: headingFont }}>
                                <span className="text-xl">🚀</span> {t('editor.sections.projects')}
                            </h2>
                            <div className="space-y-6">
                                {projects.map((project) => (
                                    <div key={project.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-lg font-bold text-gray-800">{project.name}</h3>
                                            {project.link && (
                                                <span className="text-xs text-blue-500 truncate ml-2">{project.link}</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 break-words">{project.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 5. Experience */}
                    {experience && experience.length > 0 && (
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 uppercase" style={{ color: colors.primary, fontFamily: headingFont }}>
                                <span className="text-xl">⚡</span> {t('editor.sections.experience')}
                            </h2>
                            <div className="relative pl-4 border-l-2 border-gray-100 space-y-8">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="relative">
                                        <div
                                            className="absolute -left-[21px] top-1.5 w-4 h-4 rounded-full border-2 bg-white"
                                            style={{ borderColor: colors.primary }}
                                        ></div>
                                        <h3 className="text-lg font-bold text-gray-800">{exp.jobTitle}</h3>
                                        <p className="text-sm font-semibold mb-2" style={{ color: colors.secondary }}>
                                            {exp.company}
                                        </p>
                                        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">
                                            {exp.startDate} - {exp.current ? t('editor.common.present') : exp.endDate} | {exp.location}
                                        </p>
                                        <p className="text-sm text-gray-600 break-words">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column (Sidebar) */}
                <div className="w-5/12 bg-gray-50 p-8 flex flex-col overflow-y-auto">
                    <div className="flex-1 space-y-8">
                        {/* 3. Skills */}
                        {skills && skills.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold mb-4 border-b-2 pb-2 inline-block uppercase" style={{ color: colors.secondary, borderColor: colors.secondary, fontFamily: headingFont }}>
                                    {t('editor.sections.skills')}
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, index) => {
                                        const name = getSkillName(skill);
                                        return name ? (
                                            <span
                                                key={index}
                                                className="px-3 py-1 rounded text-xs font-semibold text-white shadow-sm"
                                                style={{ backgroundColor: colors.primary }}
                                            >
                                                {name}
                                            </span>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        )}

                        {/* 6. Education */}
                        {education && education.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold mb-4 border-b-2 pb-2 inline-block uppercase" style={{ color: colors.secondary, borderColor: colors.secondary, fontFamily: headingFont }}>
                                    {t('editor.sections.education')}
                                </h2>
                                <div className="space-y-4">
                                    {education.map((edu) => (
                                        <div key={edu.id} className="bg-white p-4 rounded-lg shadow-sm">
                                            <h3 className="font-bold text-gray-800 line-clamp-2">{edu.degree}</h3>
                                            <p className="text-sm text-gray-600 line-clamp-2">{edu.institution}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {edu.startDate} - {edu.current ? t('editor.common.present') : edu.endDate}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 7. Certifications */}
                        {(diplomas?.length > 0 || certifications?.length > 0) && (
                            <div>
                                <h2 className="text-xl font-bold mb-4 border-b-2 pb-2 inline-block uppercase" style={{ color: colors.secondary, borderColor: colors.secondary, fontFamily: headingFont }}>
                                    {t('editor.sections.certifications')}
                                </h2>
                                <div className="space-y-4">
                                    {[...(diplomas || []), ...(certifications || [])].map((cert, index) => (
                                        <div key={cert.id || index} className="bg-white p-4 rounded-lg shadow-sm">
                                            <h3 className="font-bold text-gray-800 line-clamp-2">{cert.degree || cert.name}</h3>
                                            <p className="text-sm text-gray-600 line-clamp-2">{cert.institution || cert.issuer}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {cert.startDate || cert.year} {cert.endDate ? `- ${cert.endDate}` : ''}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 8. Languages */}
                        {languages && languages.length > 0 && (
                            <div className="pb-4 mt-auto">
                                <h2 className="text-xl font-bold mb-4 border-b-2 pb-2 inline-block uppercase" style={{ color: colors.secondary, borderColor: colors.secondary, fontFamily: headingFont }}>
                                    {t('editor.sections.languages')}
                                </h2>
                                <div className="space-y-2">
                                    {languages.map((lang, index) => {
                                        const name = getLangName(lang);
                                        const level = getLangLevel(lang);
                                        return name ? (
                                            <div key={index} className="flex justify-between text-sm">
                                                <span className="font-medium">{name}</span>
                                                <span className="text-gray-500">{level}</span>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeTemplate;
