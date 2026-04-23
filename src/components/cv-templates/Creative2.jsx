import React from 'react';
import { useTranslation } from 'react-i18next';

const Creative2 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], diplomas = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#8b5cf6', secondary: '#1f2937' };
    const fontFamily = customization?.fonts?.body || 'Outfit';
    const headingFont = customization?.fonts?.heading || 'Unbounded';

    const getSkillName = (skill) => {
        if (!skill) return '';
        if (typeof skill === 'object') return skill.name || skill.label || '';
        return skill;
    };

    return (
        <div className="h-full bg-[#fafafa] shadow-2xl max-w-full overflow-hidden relative" style={{ fontFamily }}>
            {/* Background Blobs */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200 rounded-full blur-[120px] opacity-40"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200 rounded-full blur-[100px] opacity-40"></div>

            <div className="relative h-full overflow-y-auto p-12">
                <header className="mb-16 flex justify-between items-end">
                    <div className="max-w-2xl">
                        <div className="inline-block px-4 py-1 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6 rounded-sm">
                            Available for hire
                        </div>
                        <h1 className="text-7xl font-black tracking-tighter leading-tight mb-4 uppercase" style={{ color: colors.secondary, fontFamily: headingFont }}>
                            {personalInfo?.fullName}
                        </h1>
                        <p className="text-2xl font-bold tracking-widest text-slate-400 uppercase">
                            {experience?.[0]?.jobTitle}
                        </p>
                    </div>
                    {personalInfo?.photo && (
                        <div className="w-48 h-48 rounded-[3rem] overflow-hidden border-[10px] border-white shadow-2xl rotate-6">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                </header>

                <div className="grid grid-cols-12 gap-12">
                    {/* Main Section */}
                    <div className="col-span-8 space-y-12">
                        <section className="bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] border border-white/50 shadow-sm">
                            <h2 className="text-xl font-black mb-8 uppercase tracking-tighter flex items-center gap-3">
                                <div className="w-10 h-1.5 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                                Work Experience
                            </h2>
                            <div className="space-y-12">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="relative">
                                        <div className="flex justify-between items-baseline mb-4">
                                            <h3 className="text-2xl font-black text-slate-800">{exp.jobTitle}</h3>
                                            <span className="text-sm font-black text-slate-300 italic">{exp.startDate} - {exp.endDate}</span>
                                        </div>
                                        <div className="text-lg font-bold mb-4" style={{ color: colors.primary }}>{exp.company}</div>
                                        <p className="text-slate-500 font-medium leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Section */}
                    <div className="col-span-4 space-y-12">
                        <section className="bg-black p-10 rounded-[3rem] text-white shadow-2xl">
                            <h2 className="text-sm font-black mb-6 uppercase tracking-widest text-slate-500">About</h2>
                            <p className="text-sm font-medium leading-relaxed opacity-80">
                                {personalInfo.summary}
                            </p>
                        </section>

                        <section className="p-10 rounded-[3rem] bg-[#f0f0f0] border border-white">
                            <h2 className="text-sm font-black mb-8 uppercase tracking-widest text-slate-400">Capabilities</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span key={index} className="px-5 py-2.5 bg-white rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 shadow-sm hover:scale-110 transition-transform cursor-pointer">
                                        {getSkillName(skill)}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section className="p-10">
                            <h2 className="text-sm font-black mb-8 uppercase tracking-widest text-slate-300">Contact</h2>
                            <div className="space-y-4 text-slate-600 font-bold">
                                {personalInfo.email && <div className="truncate">{personalInfo.email}</div>}
                                {personalInfo.phone && <div>{personalInfo.phone}</div>}
                                {personalInfo.location && <div>{personalInfo.location}</div>}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Creative2;
