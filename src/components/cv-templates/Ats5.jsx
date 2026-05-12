import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Ats5 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [] } = data || {};
    
    const fontFamily = customization?.fonts?.body || 'Tahoma, sans-serif';
    const headingFont = customization?.fonts?.heading || 'Tahoma, sans-serif';

    return (
        <div className="bg-white min-h-full p-6 w-full text-gray-900" style={{ fontFamily }}>
            <header className="flex items-center justify-between gap-6 mb-4">
                <div className="flex-1 text-center">
                    <h1 className="text-2xl font-bold border-b border-black inline-block px-4 mb-2">
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    <div className="text-[11px] text-gray-600 flex justify-center gap-3">
                        <span>{personalInfo.email}</span>
                        <span>|</span>
                        <span>{personalInfo.phone}</span>
                        <span>|</span>
                        <span>{personalInfo.address}</span>
                    </div>
                </div>
                {personalInfo?.photo && (
                    <div className="w-16 h-16 rounded overflow-hidden border border-gray-300 flex-shrink-0">
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                    </div>
                )}
            </header>

            <div className="space-y-4">
                <section>
                    <h2 className="text-xs font-bold bg-gray-100 p-1 mb-2 uppercase text-center">{t('editor.sections.experience')}</h2>
                    <div className="space-y-3">
                        {experience.map((exp, idx) => (
                            <div key={exp.id || idx}>
                                <div className="flex justify-between font-bold text-xs">
                                    <span>{exp.jobTitle} - {exp.company}</span>
                                    <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                                </div>
                                <p className="text-[11px] leading-tight text-gray-700 mt-1">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-xs font-bold bg-gray-100 p-1 mb-2 uppercase text-center">{t('editor.sections.skills')}</h2>
                    <p className="text-[11px] leading-relaxed text-center">
                        {skills.map(s => getSkillName(s)).join(' • ')}
                    </p>
                </section>

                <section>
                    <h2 className="text-xs font-bold bg-gray-100 p-1 mb-2 uppercase text-center">{t('editor.sections.education')}</h2>
                    <div className="space-y-2">
                        {education.map((edu, idx) => (
                            <div key={edu.id || idx} className="flex justify-between text-[11px]">
                                <span className="font-bold">{edu.institution} - {edu.degree}</span>
                                <span className="italic">{edu.startDate} - {edu.endDate}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Ats5;
