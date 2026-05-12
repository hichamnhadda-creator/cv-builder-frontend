import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Designer3 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [], education = [] } = data || {};

    return (
        <div className="bg-[#f8fafc] min-h-full p-8 w-full flex flex-col gap-8 font-['Outfit']">
            {/* Split Header */}
            <header className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <div className="bg-[#0f172a] p-12 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-8 justify-center shadow-2xl">
                    {personalInfo?.photo && (
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-400/30 flex-shrink-0">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-6xl font-black mb-4 tracking-tighter leading-none">{personalInfo.fullName}</h1>
                        <p className="text-xl text-cyan-400 font-bold uppercase tracking-widest">{experience?.[0]?.jobTitle}</p>
                    </div>
                </div>
                <div className="bg-cyan-400 p-12 rounded-[3rem] text-[#0f172a] flex flex-col justify-center shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 text-[10rem] font-black opacity-10 leading-none -mr-10 -mt-10">HI</div>
                    <p className="text-lg font-bold leading-relaxed relative z-10 italic">
                        "{personalInfo.summary}"
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Col: Projects & Experience */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                        <h2 className="text-3xl font-black text-[#0f172a] mb-10 flex justify-between items-center">
                            {t('editor.sections.experience')}
                            <span className="text-xs bg-slate-100 px-4 py-2 rounded-full text-slate-400 uppercase tracking-widest">Chronology</span>
                        </h2>
                        <div className="space-y-12">
                            {experience.map((exp, i) => (
                                <div key={i} className="flex gap-8 group">
                                    <div className="text-xs font-black text-cyan-500 uppercase vertical-text pt-2 group-hover:text-[#0f172a] transition-colors">{exp.startDate}</div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-black text-[#0f172a] mb-1">{exp.jobTitle}</h3>
                                        <div className="text-sm font-bold text-slate-400 mb-4">{exp.company}</div>
                                        <p className="text-sm text-slate-500 leading-relaxed">{exp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Col: Skills & Education */}
                <div className="space-y-8">
                    <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                        <h2 className="text-xl font-black text-[#0f172a] mb-8 uppercase tracking-widest">Toolkit</h2>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((s, i) => (
                                <span key={i} className="px-5 py-3 bg-[#0f172a] text-white rounded-2xl text-[10px] font-black uppercase hover:bg-cyan-400 hover:text-[#0f172a] transition-all cursor-default">
                                    {getSkillName(s)}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="bg-cyan-400/10 p-10 rounded-[3rem] border-4 border-dashed border-cyan-400/30">
                        <h2 className="text-xl font-black text-[#0f172a] mb-6 uppercase tracking-widest">{t('editor.sections.education')}</h2>
                        <div className="space-y-6">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-black text-[#0f172a] text-sm">{edu.institution}</h3>
                                    <p className="text-xs font-bold text-cyan-600 mt-1 uppercase">{edu.degree}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Designer3;
