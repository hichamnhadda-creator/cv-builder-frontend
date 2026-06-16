import React from 'react';
import { useTranslation } from 'react-i18next';

const Ats8 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [] } = data || {};
    
    return (
        <div className="bg-white h-full p-12 w-full text-gray-800" style={{ fontFamily: 'monospace' }}>
            <div className="flex justify-between items-start mb-10">
                <div className="flex gap-6 items-start">
                    {personalInfo?.photo && (
                        <div className="w-20 h-20 rounded overflow-hidden border border-gray-800 flex-shrink-0">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-4xl font-bold mb-1 tracking-tighter">{personalInfo.fullName}</h1>
                        <p className="text-lg font-bold text-gray-500 uppercase">{experience?.[0]?.jobTitle}</p>
                    </div>
                </div>
                <div className="text-right text-xs space-y-1">
                    <div>{personalInfo.email}</div>
                    <div>{personalInfo.phone}</div>
                    <div>{personalInfo.address}</div>
                </div>
            </div>

            <section className="mb-10">
                <h2 className="text-lg font-bold border-l-4 border-gray-800 pl-4 mb-4 uppercase">{t('editor.sections.experience')}</h2>
                <div className="space-y-8">
                    {experience.map((exp, i) => (
                        <div key={i}>
                            <h3 className="font-bold text-gray-900">{exp.jobTitle} <span className="text-gray-400 mx-2">@</span> {exp.company}</h3>
                            <div className="text-[10px] text-gray-500 mb-2 font-bold">{exp.startDate} - {exp.endDate}</div>
                            <p className="text-xs leading-relaxed border-l border-gray-100 pl-4">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-lg font-bold border-l-4 border-gray-800 pl-4 mb-4 uppercase">{t('editor.sections.education')}</h2>
                {education.map((edu, i) => (
                    <div key={i} className="mb-4">
                        <div className="font-bold text-sm">{edu.institution}</div>
                        <div className="text-xs italic">{edu.degree} ({edu.startDate} - {edu.endDate})</div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Ats8;
