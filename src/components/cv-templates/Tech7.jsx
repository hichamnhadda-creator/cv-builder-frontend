import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Tech7 = ({ data }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [] } = data || {};

    return (
        <div className="bg-[#000] h-full p-8 w-full font-mono text-[#00ff41] flex flex-col gap-8">
            <header className="border border-[#00ff41] p-8 shadow-[0_0_20px_rgba(0,255,65,0.2)] flex flex-col md:flex-row gap-8 items-center">
                {personalInfo?.photo && (
                    <div className="w-24 h-24 border border-[#00ff41] p-1 flex-shrink-0 grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all">
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-4xl font-bold uppercase tracking-tighter mb-2">
                                &gt; {personalInfo.fullName}
                            </h1>
                            <p className="text-lg bg-[#00ff41] text-black px-3 font-bold w-fit">
                                ROLE: {experience?.[0]?.jobTitle?.toUpperCase()}
                            </p>
                        </div>
                        <div className="text-[10px] text-right leading-relaxed opacity-70">
                            <div>ID_TOKEN: {Math.random().toString(36).substring(7).toUpperCase()}</div>
                            <div>STATUS: VERIFIED</div>
                        </div>
                    </div>
                    <div className="text-xs space-x-6 border-t border-[#00ff41]/30 pt-4 opacity-70">
                        <span>EMAIL: {personalInfo.email}</span>
                        <span>TEL: {personalInfo.phone}</span>
                        <span>LOC: {personalInfo.location}</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <main className="lg:col-span-8 space-y-8">
                    <section className="border border-[#00ff41]/30 p-6">
                        <h2 className="text-sm font-bold uppercase mb-8 border-b border-[#00ff41] pb-2 flex justify-between">
                            <span>01_WORK_HISTORY</span>
                            <span className="opacity-30">LOAD_COMPLETE</span>
                        </h2>
                        <div className="space-y-10">
                            {experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h3 className="text-xl font-bold underline">{exp.jobTitle}</h3>
                                        <span className="text-[10px]">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-xs font-bold mb-4 opacity-80">STATION: {exp.company}</div>
                                    <p className="text-xs leading-relaxed opacity-70 border-l-2 border-[#00ff41]/20 pl-4">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                <aside className="lg:col-span-4 space-y-8">
                    <section className="border border-[#00ff41]/30 p-6 bg-[#00ff41]/5">
                        <h2 className="text-xs font-bold uppercase mb-6 tracking-widest border-b border-[#00ff41]/30 pb-2">SKILL_MANIFEST</h2>
                        <div className="space-y-3">
                            {skills.map((s, i) => (
                                <div key={i} className="flex items-center gap-3 group">
                                    <span className="text-xs opacity-30">#</span>
                                    <span className="text-sm font-bold group-hover:bg-[#00ff41] group-hover:text-black transition-all px-1 uppercase">{getSkillName(s)}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="border border-[#00ff41]/30 p-6">
                        <h2 className="text-xs font-bold uppercase mb-4 opacity-50">MEM_DUMP</h2>
                        <p className="text-xs leading-relaxed opacity-60 italic">
                            "{personalInfo.summary}"
                        </p>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default Tech7;
