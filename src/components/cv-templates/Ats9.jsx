import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Ats9 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [] } = data || {};
    
    return (
        <div className="bg-white h-full p-10 w-full text-slate-800" style={{ fontFamily: 'Verdana, sans-serif' }}>
            <div className="border-2 border-slate-800 p-6 mb-8 flex flex-col md:flex-row items-center justify-center gap-8">
                {personalInfo?.photo && (
                    <div className="w-20 h-20 border-2 border-slate-800 p-1 flex-shrink-0">
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="text-center">
                    <h1 className="text-3xl font-black uppercase mb-2 tracking-widest">{personalInfo.fullName}</h1>
                    <p className="text-sm font-bold text-slate-500">{personalInfo.email} | {personalInfo.phone} | {personalInfo.address}</p>
                </div>
            </div>

            <section className="mb-8">
                <h2 className="text-sm font-black bg-slate-800 text-white px-4 py-1 mb-4 uppercase tracking-widest">{t('editor.sections.experience')}</h2>
                <div className="space-y-6">
                    {experience.map((exp, i) => (
                        <div key={i}>
                            <div className="flex justify-between font-bold text-sm uppercase">
                                <span>{exp.jobTitle}</span>
                                <span>{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <div className="text-xs font-bold text-slate-500 mb-2 italic">{exp.company}</div>
                            <p className="text-xs leading-relaxed text-slate-700">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-sm font-black bg-slate-800 text-white px-4 py-1 mb-4 uppercase tracking-widest">{t('editor.sections.skills')}</h2>
                <div className="flex flex-wrap gap-4 px-4">
                    {skills.map((s, i) => (
                        <div key={i} className="text-xs font-bold flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
                            {getSkillName(s)}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Ats9;
