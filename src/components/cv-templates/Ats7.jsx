import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Ats7 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [] } = data || {};
    
    return (
        <div className="bg-white min-h-full p-10 w-full text-gray-900" style={{ fontFamily: 'serif' }}>
            <header className="border-b-4 border-double border-black mb-8 flex flex-col items-center">
                {personalInfo?.photo && (
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-black mb-4">
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                    </div>
                )}
                <h1 className="text-4xl font-serif italic mb-2 text-center">{personalInfo.fullName}</h1>
                <div className="text-center text-xs tracking-widest text-gray-600 italic">
                    {personalInfo.address} • {personalInfo.email} • {personalInfo.phone}
                </div>
            </header>

            <section className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-gray-300">
                    {t('editor.sections.experience')}
                </h2>
                {experience.map((exp, i) => (
                    <div key={i} className="mb-6">
                        <div className="flex justify-between font-bold">
                            <span>{exp.jobTitle}</span>
                            <span>{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <div className="text-sm italic mb-2">{exp.company}</div>
                        <p className="text-sm leading-relaxed text-gray-800">{exp.description}</p>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-gray-300">
                    {t('editor.sections.skills')}
                </h2>
                <div className="grid grid-cols-3 gap-2 text-sm italic">
                    {skills.map((s, i) => (
                        <div key={i}>• {getSkillName(s)}</div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Ats7;
