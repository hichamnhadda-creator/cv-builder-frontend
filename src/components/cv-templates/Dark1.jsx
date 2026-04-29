import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Dark1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [] } = data || {};
    const colors = customization?.colors || { primary: '#22d3ee', secondary: '#1e293b' };
    const fontFamily = customization?.fonts?.body || 'JetBrains Mono, monospace';

    return (
        <div className="bg-[#0f172a] min-h-full p-8 md:p-12 shadow-2xl overflow-hidden flex flex-col gap-10 text-slate-300" style={{ fontFamily }}>
            {/* Tech Header */}
            <header className="flex flex-col md:flex-row items-center gap-10 bg-[#1e293b] p-10 rounded-3xl border border-slate-800 shadow-[0_0_50px_-12px_rgba(34,211,238,0.15)]">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-slate-700 bg-[#0f172a]">
                        {personalInfo?.photo ? (
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl">👨‍💻</div>
                        )}
                    </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2 uppercase">
                        {personalInfo?.fullName || 'User_Name'}
                    </h1>
                    <p className="text-cyan-400 font-bold uppercase tracking-[0.2em] mb-4 text-sm">
                        {experience?.[0]?.jobTitle || 'Full_Stack_Dev'}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {personalInfo?.email && <div className="bg-[#0f172a] px-3 py-1 rounded-full border border-slate-800">{personalInfo.email}</div>}
                        {personalInfo?.phone && <div className="bg-[#0f172a] px-3 py-1 rounded-full border border-slate-800">{personalInfo.phone}</div>}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                {/* Main Content (Left) */}
                <div className="md:col-span-8 space-y-10">
                    <section>
                        <h2 className="text-xs font-black text-cyan-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-4">
                            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]"></span>
                            {t('editor.sections.experience')}
                        </h2>
                        <div className="space-y-8">
                            {experience.map((exp) => (
                                <div key={exp.id} className="relative pl-8 border-l border-slate-800">
                                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-800 border border-cyan-500/50"></div>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-lg font-bold text-white">{exp.jobTitle}</h3>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-tighter">{exp.company}</div>
                                    <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar (Right) */}
                <div className="md:col-span-4 space-y-10">
                    <section className="bg-[#1e293b] p-8 rounded-3xl border border-slate-800">
                        <h2 className="text-xs font-black text-cyan-500 uppercase tracking-[0.4em] mb-6">
                            Skills.exe
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((s, i) => (
                                <span key={i} className="px-2 py-1 bg-[#0f172a] rounded text-[10px] font-bold text-slate-400 border border-slate-800 hover:border-cyan-500 transition-colors">
                                    {getSkillName(s)}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="bg-[#1e293b] p-8 rounded-3xl border border-slate-800">
                        <h2 className="text-xs font-black text-cyan-500 uppercase tracking-[0.4em] mb-6">
                            {t('editor.sections.education')}
                        </h2>
                        <div className="space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h3 className="text-sm font-bold text-white leading-tight">{edu.degree}</h3>
                                    <div className="text-[10px] font-black text-slate-500 uppercase mt-1">{edu.institution}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-gradient-to-br from-cyan-500 to-blue-600 p-8 rounded-3xl text-white shadow-lg shadow-cyan-500/10">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-4 opacity-50">
                            Core_Summary
                        </h2>
                        <p className="text-xs font-bold leading-relaxed italic opacity-90">
                            {personalInfo.summary}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Dark1;
