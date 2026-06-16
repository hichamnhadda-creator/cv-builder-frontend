import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel, getLangLabel } from './components/utils';

const Ats11 = ({ data, customization }) => {
    const { t, i18n } = useTranslation();
    const { 
        personalInfo = {}, 
        experience = [], 
        education = [], 
        skills = [], 
        languages = [], 
        projects = [] 
    } = data || {};
    
    const colors = customization?.colors || { primary: '#1f2937', secondary: '#4b5563' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Inter';

    const safeExperience = Array.isArray(experience) ? experience : [];
    const safeEducation = Array.isArray(education) ? education : [];
    const safeSkills = Array.isArray(skills) ? skills : [];
    const safeLanguages = Array.isArray(languages) ? languages : [];
    const safeProjects = Array.isArray(projects) ? projects : [];

    const isRtl = i18n.dir() === 'rtl';

    return (
        <div className="bg-white h-full p-10 w-full" style={{ fontFamily }} dir={i18n.dir()}>
            {/* Header: Simple & Clean */}
            <header className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                <div className="text-start">
                    <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-tight mb-1" style={{ fontFamily: headingFont }}>
                        {personalInfo?.fullName || t('common.yourName')}
                    </h1>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700 font-medium">
                        {personalInfo?.address && <span>{personalInfo.address}</span>}
                        {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo?.email && <span>{personalInfo.email}</span>}
                        {personalInfo?.website && <span>{personalInfo.website}</span>}
                    </div>
                </div>
                {personalInfo?.photo && (
                    <div className={`w-20 h-20 rounded-lg overflow-hidden border border-gray-200 ${isRtl ? 'mr-4' : 'ml-4'}`}>
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                    </div>
                )}
            </header>

            {/* Summary */}
            {personalInfo.summary && (
                <section className="mb-6 text-start">
                    <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-2" style={{ fontFamily: headingFont }}>
                        {t('editor.sections.summary')}
                    </h2>
                    <p className="text-sm leading-relaxed text-gray-800">{personalInfo.summary}</p>
                </section>
            )}

            {/* Experience */}
            <section className="mb-6 text-start">
                <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-3" style={{ fontFamily: headingFont }}>
                    {t('editor.sections.experience')}
                </h2>
                <div className="space-y-4">
                    {safeExperience.map((exp, idx) => (
                        <div key={exp.id || idx}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-gray-900">{exp.jobTitle}</h3>
                                <span className="text-xs text-gray-600 italic">{exp.startDate} - {exp.endDate || t('editor.common.present')}</span>
                            </div>
                            <div className="text-sm font-semibold text-gray-700 mb-1">{exp.company}</div>
                            <p className="text-sm text-gray-800 leading-relaxed">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section className="mb-6 text-start">
                <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-3" style={{ fontFamily: headingFont }}>
                    {t('editor.sections.skills')}
                </h2>
                <div className="text-sm text-gray-800 leading-relaxed">
                    <span className="font-bold">{t('editor.sections.skills')}: </span>
                    {safeSkills.map((s, i) => getSkillName(s)).join(', ')}
                </div>
            </section>

            {/* Education */}
            <section className="mb-6 text-start">
                <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-3" style={{ fontFamily: headingFont }}>
                    {t('editor.sections.education')}
                </h2>
                <div className="space-y-3">
                    {safeEducation.map((edu, idx) => (
                        <div key={edu.id || idx} className="flex justify-between items-baseline">
                            <div>
                                <h3 className="font-bold text-gray-900 inline">{edu.institution}</h3>
                                <span className="text-sm text-gray-700">, {edu.degree}</span>
                            </div>
                            <span className="text-xs text-gray-600 italic">{edu.startDate} - {edu.endDate}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Languages */}
            {safeLanguages.length > 0 && (
                <section className="text-start">
                    <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-2" style={{ fontFamily: headingFont }}>
                        {t('editor.sections.languages')}
                    </h2>
                    <div className="text-sm text-gray-800">
                        {safeLanguages.map((l, i) => `${getLangName(l)} (${t(`editor.languages.levels.${getLangLabel(getLangLevel(l))}`, { defaultValue: getLangLabel(getLangLevel(l)) })})`).join(', ')}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Ats11;
