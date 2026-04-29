import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Modern1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [] } = data || {};
    const colors = customization?.colors || { primary: '#0ea5e9', secondary: '#1e293b' };
    const fontFamily = customization?.fonts?.body || 'Inter';

    return (
        <div className="bg-white min-h-full p-8 md:p-12 shadow-lg overflow-hidden flex flex-col gap-10" style={{ fontFamily }}>
            {/* Top Header: Balanced Grid */}
            <header className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 border-b pb-10">
                <div className="flex items-center gap-6">
                    {personalInfo?.photo && (
                        <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-slate-50">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900 leading-none mb-2">{personalInfo?.fullName || 'Your Name'}</h1>
                        <p className="text-lg font-semibold text-sky-600 uppercase tracking-widest">{experience?.[0]?.jobTitle || 'Professional'}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest md:justify-items-end">
                    {personalInfo?.email && <div className="flex items-center gap-2"><span>✉️</span> {personalInfo.email}</div>}
                    {personalInfo?.phone && <div className="flex items-center gap-2"><span>📱</span> {personalInfo.phone}</div>}
                    {personalInfo?.website && <div className="flex items-center gap-2"><span>🌐</span> {personalInfo.website}</div>}
                    {personalInfo?.address && <div className="flex items-center gap-2"><span>📍</span> {personalInfo.address}</div>}
                </div>
            </header>

            {/* Triple Column Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 flex-1">
                {/* Col 1: Main Experience */}
                <div className="md:col-span-1 space-y-8">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 mb-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-slate-200"></span>
                            {t('editor.sections.experience')}
                        </h2>
                        <div className="space-y-6">
                            {experience.slice(0, 3).map((exp) => (
                                <div key={exp.id}>
                                    <h3 className="font-bold text-slate-800 leading-tight mb-1">{exp.jobTitle}</h3>
                                    <div className="text-xs font-bold text-sky-600 mb-2 uppercase">{exp.company}</div>
                                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-4">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Col 2: Education & Projects */}
                <div className="md:col-span-1 space-y-8">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 mb-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-slate-200"></span>
                            {t('editor.sections.education')}
                        </h2>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h3 className="font-bold text-slate-800 text-sm">{edu.institution}</h3>
                                    <div className="text-[10px] font-black text-slate-400 uppercase mt-1">{edu.degree}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 mb-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-slate-200"></span>
                            {t('editor.sections.projects')}
                        </h2>
                        <div className="space-y-4">
                            {projects.map((proj) => (
                                <div key={proj.id}>
                                    <h3 className="font-bold text-slate-800 text-sm">{proj.name}</h3>
                                    <p className="text-slate-500 text-[10px] leading-relaxed mt-1">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Col 3: Skills, Languages & Summary */}
                <div className="md:col-span-1 space-y-8 bg-slate-50/50 p-6 rounded-3xl">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 mb-4">
                            {t('editor.sections.summary')}
                        </h2>
                        <p className="text-slate-600 text-xs leading-relaxed italic">
                            "{personalInfo.summary}"
                        </p>
                    </section>
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 mb-4">
                            {t('editor.sections.skills')}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((s, i) => (
                                <span key={i} className="px-2 py-1 bg-white rounded-lg border border-slate-100 text-[10px] font-bold text-slate-600 shadow-sm">
                                    {getSkillName(s)}
                                </span>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 mb-4">
                            {t('editor.sections.languages')}
                        </h2>
                        <div className="space-y-2">
                            {languages.map((l, i) => (
                                <div key={i} className="flex justify-between text-[10px] font-bold">
                                    <span className="text-slate-600 uppercase tracking-tighter">{getLangName(l)}</span>
                                    <span className="text-slate-400">{getLangLevel(l)}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Modern1;
