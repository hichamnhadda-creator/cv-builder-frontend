import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Designer4 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [] } = data || {};

    return (
        <div className="bg-white min-h-full p-12 w-full font-['Syne'] text-black flex flex-col gap-20">
            <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-b-8 border-black pb-12">
                <div className="flex-1 flex flex-col md:flex-row items-end gap-8">
                    {personalInfo?.photo && (
                        <div className="w-32 h-32 bg-black p-1 flex-shrink-0">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-8xl font-black leading-none tracking-tighter mb-4">{personalInfo.fullName}</h1>
                        <div className="flex gap-4 text-sm font-bold uppercase tracking-widest bg-black text-white px-6 py-2 w-fit">
                            {experience?.[0]?.jobTitle}
                        </div>
                    </div>
                </div>
                <div className="text-right text-sm font-bold uppercase tracking-widest space-y-1">
                    <div>{personalInfo.location}</div>
                    <div>{personalInfo.email}</div>
                    <div>{personalInfo.phone}</div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
                <section className="lg:col-span-3">
                    <div className="flex items-baseline gap-4 mb-12">
                        <span className="text-6xl font-black opacity-10">01</span>
                        <h2 className="text-4xl font-black uppercase tracking-tighter">{t('editor.sections.experience')}</h2>
                    </div>
                    <div className="space-y-16">
                        {experience.map((exp, i) => (
                            <div key={i} className="relative group">
                                <div className="flex justify-between items-baseline mb-4">
                                    <h3 className="text-3xl font-black group-hover:bg-yellow-300 transition-colors px-2 ml-[-8px]">{exp.jobTitle}</h3>
                                    <span className="text-sm font-bold uppercase tracking-widest">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="text-lg font-bold mb-6 text-gray-400 italic">@ {exp.company}</div>
                                <p className="text-lg leading-relaxed max-w-2xl">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <aside className="space-y-16 pt-2">
                    <section>
                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-4xl font-black opacity-10">02</span>
                            <h2 className="text-xl font-black uppercase tracking-tighter">Stack</h2>
                        </div>
                        <div className="flex flex-col gap-4">
                            {skills.map((s, i) => (
                                <div key={i} className="text-lg font-bold border-b border-black pb-2 hover:translate-x-2 transition-transform cursor-default">
                                    {getSkillName(s)}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-4xl font-black opacity-10">03</span>
                            <h2 className="text-xl font-black uppercase tracking-tighter">About</h2>
                        </div>
                        <p className="text-sm font-bold leading-relaxed">
                            {personalInfo.summary}
                        </p>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default Designer4;
