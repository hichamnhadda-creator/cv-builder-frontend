import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName } from './components/utils';

const Designer1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], skills = [], projects = [] } = data || {};
    
    const colors = customization?.colors || { primary: '#ec4899', secondary: '#1e293b' };
    const fontFamily = customization?.fonts?.body || 'Outfit';
    const headingFont = customization?.fonts?.heading || 'Syne';

    return (
        <div className="bg-slate-50 min-h-full p-8 w-full flex flex-col gap-12" style={{ fontFamily }}>
            {/* Bold Designer Header */}
            <header className="relative py-12 px-8 bg-white rounded-[3rem] shadow-xl overflow-hidden border border-slate-100">
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="relative flex flex-col md:flex-row items-center gap-10">
                    {personalInfo?.photo && (
                        <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 ring-8 ring-pink-500/10">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-none mb-4 tracking-tighter" style={{ fontFamily: headingFont }}>
                            {personalInfo?.fullName || 'Creative Name'}
                        </h1>
                        <p className="text-lg font-bold uppercase tracking-widest text-pink-500 mb-6">
                            {experience?.[0]?.jobTitle || 'Visual Designer'}
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-semibold text-slate-400 uppercase">
                            <span>{personalInfo.location}</span>
                            <span>•</span>
                            <span>{personalInfo.email}</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 px-4">
                <div className="lg:col-span-2 space-y-16">
                    {/* Experience Section */}
                    <section>
                        <h2 className="text-4xl font-black text-slate-900 mb-8 flex items-baseline gap-4" style={{ fontFamily: headingFont }}>
                            <span className="text-pink-500 text-6xl opacity-20">01</span>
                            {t('editor.sections.experience')}
                        </h2>
                        <div className="space-y-12">
                            {experience.map((exp, idx) => (
                                <div key={exp.id || idx} className="group relative pl-8 border-l-4 border-pink-500/20 hover:border-pink-500 transition-colors">
                                    <span className="absolute left-[-10px] top-0 w-4 h-4 bg-white border-4 border-pink-500 rounded-full group-hover:scale-150 transition-transform" />
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-2xl font-black text-slate-800">{exp.jobTitle}</h3>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{exp.startDate} — {exp.endDate}</span>
                                    </div>
                                    <div className="text-pink-500 font-bold mb-4 uppercase text-sm tracking-widest">{exp.company}</div>
                                    <p className="text-slate-500 text-sm leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Projects Section */}
                    <section>
                        <h2 className="text-4xl font-black text-slate-900 mb-8 flex items-baseline gap-4" style={{ fontFamily: headingFont }}>
                            <span className="text-pink-500 text-6xl opacity-20">02</span>
                            {t('editor.sections.projects')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {projects.map((proj, idx) => (
                                <div key={proj.id || idx} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all group">
                                    <h3 className="font-black text-xl mb-2 group-hover:text-pink-500 transition-colors">{proj.name}</h3>
                                    <p className="text-slate-500 text-xs leading-relaxed">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar: Skills & Summary */}
                <div className="space-y-12">
                    <section className="bg-pink-500 p-8 rounded-[3rem] text-white shadow-xl rotate-1">
                        <h2 className="text-xl font-black uppercase tracking-widest mb-6" style={{ fontFamily: headingFont }}>Expertise</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((s, i) => (
                                <span key={i} className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-colors">
                                    {getSkillName(s)}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="p-8">
                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-6" style={{ fontFamily: headingFont }}>Perspective</h2>
                        <p className="text-slate-500 text-sm leading-relaxed italic">
                            "{personalInfo.summary}"
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Designer1;
