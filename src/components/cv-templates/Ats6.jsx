import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Ats6 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [] } = data || {};
    const fontFamily = customization?.fonts?.body || 'Arial, sans-serif';

    return (
        <div className="bg-white h-full p-8 w-full text-gray-900 leading-tight" style={{ fontFamily }}>
            <header className="flex justify-between items-start mb-4 border-b-2 border-black pb-2">
                <div>
                    <h1 className="text-2xl font-bold">{personalInfo.fullName}</h1>
                    <p className="text-xs">{personalInfo.address} | {personalInfo.phone} | {personalInfo.email}</p>
                </div>
                {personalInfo?.photo && (
                    <div className="w-16 h-16 rounded overflow-hidden border border-gray-200 flex-shrink-0 ml-4">
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                    </div>
                )}
            </header>
            
            <section className="mb-4">
                <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-2">{t('editor.sections.experience')}</h2>
                {experience.map((exp, i) => (
                    <div key={i} className="mb-3">
                        <div className="flex justify-between font-bold text-xs">
                            <span>{exp.jobTitle}</span>
                            <span>{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <div className="text-xs italic mb-1">{exp.company}</div>
                        <p className="text-[11px] text-gray-700">{exp.description}</p>
                    </div>
                ))}
            </section>

            <section className="mb-4">
                <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-2">{t('editor.sections.skills')}</h2>
                <p className="text-xs">{skills.map(s => getSkillName(s)).join(' • ')}</p>
            </section>

            <section>
                <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-2">{t('editor.sections.education')}</h2>
                {education.map((edu, i) => (
                    <div key={i} className="flex justify-between text-xs mb-1">
                        <span>{edu.institution} - {edu.degree}</span>
                        <span>{edu.startDate} - {edu.endDate}</span>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Ats6;
