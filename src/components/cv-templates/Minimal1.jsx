import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Minimal1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [] } = data || {};
    const colors = customization?.colors || { primary: '#000000', secondary: '#737373' };
    const fontFamily = customization?.fonts?.body || 'serif';
    const headingFont = customization?.fonts?.heading || 'serif';

    return (
        <div className="bg-white min-h-full p-16 md:p-24 lg:p-32 shadow-lg flex flex-col items-center text-neutral-800" style={{ fontFamily }}>
            <div className="max-w-xl w-full flex flex-col gap-20">
                {/* Header: Pure Typography */}
                <header className="text-center space-y-4">
                    <h1 className="text-4xl font-light tracking-tighter text-neutral-900" style={{ fontFamily: headingFont }}>
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    <div className="h-px w-12 bg-neutral-200 mx-auto"></div>
                    <div className="text-[10px] font-medium uppercase tracking-[0.4em] text-neutral-400 flex flex-wrap justify-center gap-x-8 gap-y-2">
                        {personalInfo?.email && <span>{personalInfo.email}</span>}
                        {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo?.address && <span>{personalInfo.address}</span>}
                    </div>
                </header>

                {/* Content: Single Column List */}
                <section className="space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-300 text-center mb-8">{t('editor.sections.summary')}</h2>
                        <p className="text-sm leading-loose text-neutral-500 text-center font-light">
                            {personalInfo.summary}
                        </p>
                    </div>

                    <div className="space-y-16">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-300 text-center">{t('editor.sections.experience')}</h2>
                        {experience.map((exp) => (
                            <div key={exp.id} className="space-y-3">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-sm font-bold tracking-tight text-neutral-900">{exp.jobTitle}</h3>
                                    <span className="text-[10px] text-neutral-300 font-medium italic">{exp.startDate} — {exp.endDate}</span>
                                </div>
                                <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-widest">{exp.company}</div>
                                <p className="text-[12px] leading-relaxed text-neutral-500 font-light text-justify">{exp.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-12 pt-10">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-300 text-center">{t('editor.sections.education')}</h2>
                        <div className="space-y-8">
                            {education.map((edu) => (
                                <div key={edu.id} className="text-center">
                                    <h3 className="text-sm font-bold text-neutral-900 mb-1">{edu.degree}</h3>
                                    <div className="text-[11px] text-neutral-400 italic">{edu.institution}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-12 pt-10">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-300 text-center">{t('editor.sections.skills')}</h2>
                        <div className="text-[11px] font-medium text-neutral-400 text-center leading-relaxed tracking-wider">
                            {skills.map(s => getSkillName(s)).filter(Boolean).join(' / ')}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Minimal1;
