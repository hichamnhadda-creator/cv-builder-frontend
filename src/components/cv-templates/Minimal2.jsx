import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Minimal2 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [] } = data || {};
    const colors = customization?.colors || { primary: '#0ea5e9', secondary: '#f8fafc' };
    const fontFamily = customization?.fonts?.body || 'Inter, sans-serif';

    return (
        <div className="bg-[#fcfcfc] min-h-full p-12 md:p-20 shadow-lg flex flex-col items-center" style={{ fontFamily }}>
            <div className="max-w-3xl w-full">
                {/* Header with small subtle image */}
                <header className="flex items-center gap-8 mb-20 border-b border-neutral-100 pb-10">
                    {personalInfo?.photo && (
                        <div className="w-16 h-16 rounded-full overflow-hidden grayscale contrast-125">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-neutral-800">{personalInfo?.fullName || 'Your Name'}</h1>
                        <p className="text-sm font-medium text-neutral-400 mt-1 uppercase tracking-widest">{experience?.[0]?.jobTitle || 'Professional'}</p>
                    </div>
                    <div className="ml-auto text-right text-[10px] font-bold text-neutral-300 uppercase tracking-widest leading-relaxed">
                        {personalInfo?.email && <div>{personalInfo.email}</div>}
                        {personalInfo?.phone && <div>{personalInfo.phone}</div>}
                    </div>
                </header>

                {/* Timeline Structure */}
                <div className="space-y-16">
                    <section className="grid grid-cols-4 gap-12">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-200 pt-1">
                            {t('editor.sections.summary')}
                        </div>
                        <div className="col-span-3 text-sm text-neutral-500 leading-relaxed font-medium">
                            {personalInfo.summary}
                        </div>
                    </section>

                    <section className="grid grid-cols-4 gap-12">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-200 pt-1">
                            {t('editor.sections.experience')}
                        </div>
                        <div className="col-span-3 space-y-10 border-l border-neutral-100 pl-8 ml-px">
                            {experience.map((exp) => (
                                <div key={exp.id} className="relative">
                                    <div className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-full bg-neutral-200"></div>
                                    <h3 className="text-sm font-bold text-neutral-800 mb-1">{exp.jobTitle}</h3>
                                    <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-tighter mb-3">{exp.company} / {exp.startDate} — {exp.endDate}</div>
                                    <p className="text-[12px] text-neutral-500 leading-relaxed font-light">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="grid grid-cols-4 gap-12">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-200 pt-1">
                            {t('editor.sections.skills')}
                        </div>
                        <div className="col-span-3 flex flex-wrap gap-x-4 gap-y-2">
                            {skills.map((s, i) => (
                                <span key={i} className="text-xs font-bold text-neutral-500">{getSkillName(s)}</span>
                            ))}
                        </div>
                    </section>

                    <section className="grid grid-cols-4 gap-12">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-200 pt-1">
                            {t('editor.sections.education')}
                        </div>
                        <div className="col-span-3 space-y-6 border-l border-neutral-100 pl-8 ml-px">
                            {education.map((edu) => (
                                <div key={edu.id} className="relative">
                                    <div className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-full bg-neutral-200"></div>
                                    <h3 className="text-sm font-bold text-neutral-800">{edu.degree}</h3>
                                    <div className="text-[11px] font-medium text-neutral-400">{edu.institution}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Minimal2;
