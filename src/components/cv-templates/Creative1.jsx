import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Creative1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [] } = data || {};
    const colors = customization?.colors || { primary: '#f43f5e', secondary: '#1e293b' };
    const fontFamily = customization?.fonts?.body || 'Outfit, sans-serif';

    return (
        <div className="bg-slate-50 min-h-full shadow-lg overflow-hidden flex flex-col break-words relative" style={{ fontFamily }}>
            {/* Background Accent Shapes */}
            <div className="absolute top-0 right-0 w-1/2 h-64 bg-rose-500 rounded-bl-[100px] z-0"></div>
            
            {/* Floating Header */}
            <header className="relative z-10 p-12 md:p-20 flex flex-col md:flex-row items-center gap-12">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-[40px] rotate-6 overflow-hidden border-8 border-white shadow-2xl flex-shrink-0 bg-white">
                    {personalInfo?.photo ? (
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover -rotate-6 scale-110" />
                    ) : (
                        <div className="w-full h-full bg-rose-100 flex items-center justify-center text-6xl">🎨</div>
                    )}
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-none mb-4 -ml-1 select-none">
                        {personalInfo?.fullName?.split(' ')[0] || 'Name'}
                        <br />
                        <span className="text-white drop-shadow-lg">{personalInfo?.fullName?.split(' ')[1] || 'Surname'}</span>
                    </h1>
                    <div className="bg-slate-900 text-rose-500 inline-block px-6 py-2 text-xl font-bold uppercase tracking-[0.3em] rounded-full rotate-2">
                        {experience?.[0]?.jobTitle || 'Creative'}
                    </div>
                </div>
            </header>

            {/* Asymmetrical Body */}
            <div className="p-12 md:p-20 grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10">
                {/* Offset Summary */}
                <div className="md:col-span-12 -mt-10 mb-10">
                    <div className="bg-white p-10 rounded-[50px] shadow-xl border border-slate-100 max-w-3xl transform -rotate-1">
                        <h2 className="text-xs font-black uppercase tracking-widest text-rose-300 mb-4">{t('editor.sections.summary')}</h2>
                        <p className="text-2xl font-bold text-slate-700 leading-relaxed italic">
                            "{personalInfo.summary}"
                        </p>
                    </div>
                </div>

                {/* Left Column (Experiences) */}
                <div className="md:col-span-7 space-y-12">
                    <section>
                        <h2 className="text-4xl font-black text-slate-900 mb-10 underline decoration-rose-500 decoration-8 underline-offset-8">
                            {t('editor.sections.experience')}
                        </h2>
                        <div className="space-y-16">
                            {experience.map((exp, idx) => (
                                <div key={exp.id} className={`relative ${idx % 2 === 0 ? 'pl-8' : 'pr-8 text-right'}`}>
                                    <div className={`absolute top-0 w-2 h-full bg-slate-200 ${idx % 2 === 0 ? 'left-0' : 'right-0'}`}>
                                        <div className="h-12 w-full bg-rose-500"></div>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-800 mb-1">{exp.jobTitle}</h3>
                                    <div className="text-lg font-bold text-rose-500 mb-4">{exp.company}</div>
                                    <p className="text-slate-500 text-sm leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column (Info) */}
                <div className="md:col-span-5 space-y-16">
                    <section className="bg-slate-900 p-10 rounded-[60px] text-white rotate-2 shadow-2xl">
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-8">{t('editor.sections.skills')}</h2>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((s, i) => (
                                <span key={i} className="px-4 py-2 bg-slate-800 rounded-2xl text-xs font-bold border border-slate-700 hover:bg-rose-500 transition-colors">
                                    {getSkillName(s)}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white p-10 rounded-[60px] shadow-lg -rotate-1 border border-slate-50">
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-300 mb-8">{t('editor.sections.education')}</h2>
                        <div className="space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h3 className="font-bold text-slate-800 text-lg">{edu.degree}</h3>
                                    <div className="text-sm font-bold text-rose-400 mt-1">{edu.institution}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="p-10 border-t-4 border-slate-900">
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-300 mb-6">Contact Info</h2>
                        <div className="space-y-4 font-bold text-slate-800">
                            {personalInfo?.email && <div className="flex items-center gap-4"><span className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white">✉️</span> {personalInfo.email}</div>}
                            {personalInfo?.phone && <div className="flex items-center gap-4"><span className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white">📱</span> {personalInfo.phone}</div>}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Creative1;
