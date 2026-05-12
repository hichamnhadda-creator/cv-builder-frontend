import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Ats10 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [] } = data || {};
    
    return (
        <div className="bg-white min-h-full p-10 w-full text-zinc-900" style={{ fontFamily: 'Georgia, serif' }}>
            <header className="mb-10 text-center border-b-2 border-zinc-200 pb-6 flex flex-col items-center">
                {personalInfo?.photo && (
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-6 ring-4 ring-zinc-50">
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                    </div>
                )}
                <h1 className="text-4xl font-serif mb-3 tracking-tight">{personalInfo.fullName}</h1>
                <p className="text-sm font-medium text-zinc-500 italic">
                    {personalInfo.address} • {personalInfo.phone} • {personalInfo.email}
                </p>
            </header>

            <div className="space-y-10">
                <section>
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 text-center">Professional History</h2>
                    <div className="space-y-8">
                        {experience.map((exp, i) => (
                            <div key={i} className="max-w-2xl mx-auto">
                                <div className="text-center mb-2">
                                    <h3 className="text-lg font-bold">{exp.jobTitle}</h3>
                                    <div className="text-sm italic text-zinc-600">{exp.company} | {exp.startDate} - {exp.endDate}</div>
                                </div>
                                <p className="text-sm leading-relaxed text-zinc-700 text-center px-4">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="max-w-2xl mx-auto border-t border-zinc-100 pt-8">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 text-center">{t('editor.sections.skills')}</h2>
                    <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-sm font-medium italic text-zinc-600">
                        {skills.map((s, i) => <span key={i}>{getSkillName(s)}</span>)}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Ats10;
