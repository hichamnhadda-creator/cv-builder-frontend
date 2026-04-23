import React from 'react';
import { useTranslation } from 'react-i18next';

const Creative1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#ec4899', secondary: '#4b5563' };
    const fontFamily = customization?.fonts?.body || 'Outfit';
    const headingFont = customization?.fonts?.heading || 'Syne';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    return (
        <div className="h-full bg-white shadow-2xl max-w-full overflow-hidden flex" style={{ fontFamily }}>
            {/* Left Decorative Sidebar */}
            <div className="w-24 flex-shrink-0 flex flex-col items-center py-12 gap-8" style={{ backgroundColor: colors.primary }}>
                <div className="w-12 h-12 bg-white/20 rounded-full blur-xl animate-pulse"></div>
                <div className="[writing-mode:vertical-lr] rotate-180 text-white font-black uppercase tracking-[0.5em] text-lg opacity-40">
                    PORTFOLIO // 2024
                </div>
                <div className="mt-auto flex flex-col gap-4 text-white/60 text-xl font-black">
                    <span>*</span>
                    <span>*</span>
                    <span>*</span>
                </div>
            </div>

            {/* Main Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-16">
                <header className="mb-24 relative">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-50 rounded-full -z-10 opacity-50 blur-3xl"></div>
                    <h1 className="text-8xl font-black tracking-tighter leading-none mb-6 italic" style={{ color: colors.primary, fontFamily: headingFont }}>
                        {personalInfo?.fullName?.split(' ')[0]}<br/>
                        <span className="text-slate-200">{personalInfo?.fullName?.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <div className="flex items-center gap-6">
                        <div className="h-2 w-24 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                        <p className="text-2xl font-bold text-slate-400 uppercase tracking-widest">{experience?.[0]?.jobTitle}</p>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-16">
                    <div className="col-span-7 space-y-20">
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-10">01 // Experience</h2>
                            <div className="space-y-16">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="group">
                                        <div className="text-sm font-black text-pink-200 uppercase mb-2 group-hover:text-pink-500 transition-colors">{exp.startDate} - {exp.endDate}</div>
                                        <h3 className="text-3xl font-black text-slate-800 tracking-tight mb-2 uppercase">{exp.jobTitle}</h3>
                                        <div className="text-lg font-bold text-slate-400 mb-6">{exp.company} // {exp.location}</div>
                                        <p className="text-slate-500 leading-relaxed font-medium text-sm border-l-2 border-slate-50 pl-8 group-hover:border-pink-500 transition-all">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="col-span-5 space-y-20">
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-10">02 // Profile</h2>
                            <p className="text-xl font-bold text-slate-700 leading-relaxed italic">
                                "{personalInfo.summary}"
                            </p>
                        </header>

                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-10">03 // Skills</h2>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill, index) => (
                                    <span key={index} className="px-6 py-3 bg-slate-50 rounded-full text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-pink-500 hover:text-white transition-all cursor-default">
                                        {getSkillName(skill)}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-10">04 // Contact</h2>
                            <div className="space-y-4 font-black text-slate-400 text-sm">
                                {personalInfo.email && <div className="hover:text-pink-500 transition-colors">{personalInfo.email}</div>}
                                {personalInfo.phone && <div className="hover:text-pink-500 transition-colors">{personalInfo.phone}</div>}
                                {personalInfo.location && <div className="hover:text-pink-500 transition-colors">{personalInfo.location}</div>}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Creative1;
