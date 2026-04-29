import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Professional1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [] } = data || {};
    const colors = customization?.colors || { primary: '#1e293b', secondary: '#475569' };
    const fontFamily = customization?.fonts?.body || 'Inter';

    return (
        <div className="bg-white min-h-full p-12 md:p-16 shadow-lg flex flex-col gap-12" style={{ fontFamily }}>
            {/* Minimalist Corporate Header */}
            <header className="border-b-4 border-slate-900 pb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2 uppercase">{personalInfo?.fullName || 'Your Name'}</h1>
                    <p className="text-lg font-medium text-slate-500 italic">{experience?.[0]?.jobTitle || 'Executive'}</p>
                </div>
                <div className="text-right text-sm font-medium text-slate-600 space-y-1">
                    {personalInfo?.email && <div>{personalInfo.email}</div>}
                    {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo?.address && <div>{personalInfo.address}</div>}
                </div>
            </header>

            <div className="flex flex-col gap-12">
                {/* Summary: High Focus */}
                <section>
                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-4 border-b border-slate-100 pb-1">
                        {t('editor.sections.summary')}
                    </h2>
                    <p className="text-slate-800 text-base leading-relaxed text-justify max-w-4xl">
                        {personalInfo.summary}
                    </p>
                </section>

                {/* Experience: Dominant Section */}
                <section>
                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-6 border-b border-slate-100 pb-1">
                        {t('editor.sections.experience')}
                    </h2>
                    <div className="space-y-10">
                        {experience.map((exp) => (
                            <div key={exp.id} className="grid grid-cols-4 gap-8">
                                <div className="col-span-1 text-sm font-bold text-slate-400 uppercase tracking-widest pt-1">
                                    {exp.startDate} — {exp.endDate}
                                </div>
                                <div className="col-span-3">
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">{exp.jobTitle}</h3>
                                    <div className="text-sm font-black text-slate-500 uppercase mb-4 tracking-tighter">{exp.company} | {exp.location}</div>
                                    <p className="text-slate-700 text-sm leading-relaxed">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Secondary Sections: Grid Layout */}
                <div className="grid grid-cols-2 gap-16 border-t border-slate-100 pt-10">
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-6">
                            {t('editor.sections.education')}
                        </h2>
                        <div className="space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h3 className="font-bold text-slate-900 text-base">{edu.degree}</h3>
                                    <div className="text-sm font-medium text-slate-500 mt-1">{edu.institution}</div>
                                    <div className="text-xs font-bold text-slate-300 mt-2">{edu.startDate} — {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-6">
                            {t('editor.sections.skills')} & {t('editor.sections.languages')}
                        </h2>
                        <div className="space-y-8">
                            <div>
                                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold text-slate-700">
                                    {skills.map((s, i) => (
                                        <span key={i} className="border-b-2 border-slate-100 pb-0.5">{getSkillName(s)}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                {languages.map((l, i) => (
                                    <div key={i} className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                                        <span>{getLangName(l)}</span>
                                        <span className="text-slate-300">{getLangLevel(l)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Professional1;
