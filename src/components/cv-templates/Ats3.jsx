import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Ats3 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { 
        personalInfo = {}, 
        experience = [], 
        education = [], 
        skills = [], 
        languages = [], 
        projects = [] 
    } = data || {};
    
    const colors = customization?.colors || { primary: '#2563eb', secondary: '#4b5563' };
    const fontFamily = customization?.fonts?.body || 'Arial, sans-serif';
    const headingFont = customization?.fonts?.heading || 'Arial, sans-serif';

    const safeExperience = Array.isArray(experience) ? experience : [];
    const safeEducation = Array.isArray(education) ? education : [];
    const safeSkills = Array.isArray(skills) ? skills : [];

    return (
        <div className="bg-white h-full p-8 w-full text-gray-800" style={{ fontFamily }}>
            {/* Header: Name and Contact Info Block */}
            <div className="mb-8 border-l-4 border-blue-600 pl-4 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: headingFont }}>
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    <p className="text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                        {safeExperience?.[0]?.jobTitle || 'Professional Title'}
                    </p>
                    <div className="text-xs text-gray-600 space-y-1">
                        {personalInfo?.email && <div>Email: {personalInfo.email}</div>}
                        {personalInfo?.phone && <div>Phone: {personalInfo.phone}</div>}
                        {personalInfo?.address && <div>Location: {personalInfo.address}</div>}
                    </div>
                </div>
                {personalInfo?.photo && (
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex-shrink-0 ml-4">
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>

            {/* Main Content Grid (Still ATS friendly) */}
            <div className="space-y-8">
                {/* Summary */}
                {personalInfo.summary && (
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">About Me</h2>
                        <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
                    </section>
                )}

                {/* Experience */}
                <section>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{t('editor.sections.experience')}</h2>
                    <div className="space-y-6">
                        {safeExperience.map((exp, idx) => (
                            <div key={exp.id || idx} className="grid grid-cols-4 gap-4">
                                <div className="text-xs font-bold text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</div>
                                <div className="col-span-3">
                                    <h3 className="font-bold text-sm text-gray-900">{exp.jobTitle}</h3>
                                    <div className="text-xs font-semibold mb-2" style={{ color: colors.primary }}>{exp.company}</div>
                                    <p className="text-xs leading-relaxed text-gray-700">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills Block */}
                <section>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">{t('editor.sections.skills')}</h2>
                    <div className="flex flex-wrap gap-2">
                        {safeSkills.map((s, i) => (
                            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded border border-gray-200">{getSkillName(s)}</span>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{t('editor.sections.education')}</h2>
                    <div className="space-y-4">
                        {safeEducation.map((edu, idx) => (
                            <div key={edu.id || idx} className="grid grid-cols-4 gap-4">
                                <div className="text-xs font-bold text-gray-500">{edu.startDate} - {edu.endDate}</div>
                                <div className="col-span-3">
                                    <h3 className="font-bold text-sm text-gray-900">{edu.institution}</h3>
                                    <p className="text-xs text-gray-700">{edu.degree}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Ats3;
