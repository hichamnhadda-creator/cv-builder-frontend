import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const CreativeTemplate = ({ data, customization }) => {
    const { t } = useTranslation();
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], projects = [], certifications = [] } = data || {};
    const colors = customization?.colors || { primary: '#ec4899', secondary: '#8b5cf6' };
    const fontFamily = customization?.fonts?.body || 'sans-serif';
    const headingFont = customization?.fonts?.heading || 'sans-serif';

    return (
        <div className="bg-slate-50 min-h-full shadow-lg overflow-hidden break-words max-w-full flex flex-col" style={{ fontFamily }}>
            {/* Asymmetrical Header */}
            <header className="relative h-64 flex-shrink-0 overflow-hidden">
                <div 
                    className="absolute inset-0 z-0" 
                    style={{ 
                        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                        clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)'
                    }}
                ></div>
                
                <div className="relative z-10 p-10 flex justify-between items-start text-white">
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter mb-2" style={{ fontFamily: headingFont }}>
                            {personalInfo?.fullName || 'Your Name'}
                        </h1>
                        <p className="text-xl font-bold opacity-80 uppercase tracking-widest">
                            {experience?.[0]?.jobTitle || 'Creative Professional'}
                        </p>
                    </div>
                    {personalInfo?.photo && (
                        <div className="w-40 h-40 rounded-full border-8 border-white shadow-2xl overflow-hidden flex-shrink-0 -mt-2">
                            <img
                                src={personalInfo.photo}
                                alt={personalInfo.fullName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>
            </header>

            {/* Floating Summary Card */}
            {personalInfo?.summary && (
                <div className="relative z-20 -mt-20 px-10">
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-300 mb-4">
                            {t('editor.sections.summary')}
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed italic">
                            {personalInfo.summary}
                        </p>
                    </div>
                </div>
            )}

            {/* Content Grid */}
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Column */}
                <div className="space-y-10">
                    {experience && experience.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black mb-6 text-slate-800" style={{ color: colors.primary }}>
                                {t('editor.sections.experience')}
                            </h2>
                            <div className="space-y-8">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="relative pl-6 border-l-4" style={{ borderColor: colors.secondary }}>
                                        <div className="text-sm font-black text-slate-400 mb-1 uppercase tracking-widest">
                                            {exp.startDate} — {exp.endDate}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-1">{exp.jobTitle}</h3>
                                        <div className="text-base font-bold text-slate-500 mb-3">{exp.company}</div>
                                        <p className="text-slate-600 text-sm">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column */}
                <div className="space-y-10">
                    {education && education.length > 0 && (
                        <section className="bg-white p-8 rounded-3xl shadow-lg">
                            <h2 className="text-2xl font-black mb-6 text-slate-800" style={{ color: colors.secondary }}>
                                {t('editor.sections.education')}
                            </h2>
                            <div className="space-y-6">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="text-lg font-bold text-slate-800">{edu.degree}</h3>
                                        <div className="text-sm font-bold text-slate-400">{edu.institution}</div>
                                        <div className="text-xs font-bold text-slate-300 mt-1 uppercase">
                                            {edu.startDate} — {edu.endDate}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills Grid */}
                    {skills && skills.length > 0 && (
                        <section className="bg-slate-800 p-8 rounded-3xl shadow-xl text-white">
                            <h2 className="text-xl font-black mb-6 uppercase tracking-widest opacity-50">
                                {t('editor.sections.skills')}
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => {
                                    const name = getSkillName(skill);
                                    return name ? (
                                        <span key={index} className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-tighter" style={{ backgroundColor: colors.primary }}>
                                            {name}
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        </section>
                    )}

                    {/* Contact Block */}
                    <section className="bg-white p-8 rounded-3xl shadow-lg">
                        <h2 className="text-sm font-black uppercase tracking-widest text-slate-300 mb-6">
                            Contact Info
                        </h2>
                        <div className="space-y-4 text-sm font-bold text-slate-500">
                            {personalInfo?.email && <div className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">✉️</span> {personalInfo.email}</div>}
                            {personalInfo?.phone && <div className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">📱</span> {personalInfo.phone}</div>}
                            {personalInfo?.address && <div className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">📍</span> {personalInfo.address}</div>}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CreativeTemplate;
