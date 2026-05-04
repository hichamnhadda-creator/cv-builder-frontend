import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Professional2 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [] } = data || {};
    const colors = customization?.colors || { primary: '#0f172a', secondary: '#334155' };
    const fontFamily = customization?.fonts?.body || 'serif';
    const headingFont = customization?.fonts?.heading || 'serif';

    return (
        <div className="bg-white min-h-full p-12 md:p-20 shadow-lg flex flex-col gap-12 text-slate-900" style={{ fontFamily }}>
            {/* Centered Authority Header */}
            <header className="text-center border-b-2 border-double border-slate-300 pb-10">
                <h1 className="text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: headingFont }}>{personalInfo?.fullName || 'Your Name'}</h1>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo?.address && <span>{personalInfo.address}</span>}
                </div>
            </header>

            {/* Profile Picture (Top Right small circle if exists) */}
            {personalInfo?.photo && (
                <div className="absolute top-20 right-20 w-16 h-16 rounded-full overflow-hidden border border-slate-200 grayscale opacity-80">
                    <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                </div>
            )}

            <div className="space-y-12">
                <section>
                    <h2 className="text-lg font-bold border-b border-slate-200 pb-2 mb-6" style={{ fontFamily: headingFont }}>
                        Professional Summary
                    </h2>
                    <p className="text-base leading-relaxed text-slate-700 italic">
                        {personalInfo.summary}
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold border-b border-slate-200 pb-2 mb-8" style={{ fontFamily: headingFont }}>
                        {t('editor.sections.experience')}
                    </h2>
                    <div className="space-y-10">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-xl font-bold">{exp.jobTitle}</h3>
                                    <span className="text-sm font-bold text-slate-500 italic">{exp.startDate} — {exp.endDate}</span>
                                </div>
                                <div className="text-base font-bold text-slate-600 mb-4">{exp.company}, {exp.location}</div>
                                <p className="text-slate-700 text-sm leading-relaxed text-justify">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-2 gap-12">
                    <section>
                        <h2 className="text-lg font-bold border-b border-slate-200 pb-2 mb-6" style={{ fontFamily: headingFont }}>
                            {t('editor.sections.education')}
                        </h2>
                        <div className="space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h3 className="font-bold text-base">{edu.degree}</h3>
                                    <div className="text-sm font-medium text-slate-500 mt-1">{edu.institution}</div>
                                    <div className="text-xs font-bold text-slate-400 mt-1">{edu.startDate} — {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold border-b border-slate-200 pb-2 mb-6" style={{ fontFamily: headingFont }}>
                            Technical Expertise
                        </h2>
                        <div className="grid grid-cols-1 gap-y-4">
                            <div>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((s, i) => (
                                        <span key={i} className="text-sm font-medium text-slate-700 underline decoration-slate-200 underline-offset-4">{getSkillName(s)}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2 border-t border-slate-50 pt-4">
                                {languages.map((l, i) => (
                                    <div key={i} className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                                        <span>{getLangName(l)}</span>
                                        <span>{getLangLevel(l)}</span>
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

export default Professional2;
