import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Modern2 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { 
        personalInfo = {}, 
        experience = [], 
        education = [], 
        skills = [], 
        languages = [], 
        projects = [] 
    } = data || {};
    
    const colors = customization?.colors || { primary: '#6366f1', secondary: '#1e293b' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    // Safe data access
    const safeExperience = Array.isArray(experience) ? experience : [];
    const safeEducation = Array.isArray(education) ? education : [];
    const safeSkills = Array.isArray(skills) ? skills : [];
    const safeLanguages = Array.isArray(languages) ? languages : [];

    return (
        <div className="cv-template-modern-2 flex flex-col md:flex-row h-full bg-slate-50 overflow-hidden shadow-lg w-full max-w-full" style={{ fontFamily }}>
            {/* Sidebar: Deep Navigation Style */}
            <div className="w-full md:w-1/3 bg-slate-900 p-8 text-white flex flex-col gap-10 min-w-0">
                <div className="text-center min-w-0">
                    {personalInfo?.photo && (
                        <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full border-4 border-slate-800 shadow-2xl overflow-hidden mb-6 flex-shrink-0">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <h1 className="text-xl md:text-2xl font-black mb-1 break-words" style={{ fontFamily: headingFont }}>{personalInfo?.fullName || 'Your Name'}</h1>
                    <p className="text-xs font-bold opacity-40 uppercase tracking-[0.2em] truncate">{safeExperience?.[0]?.jobTitle || 'Expert'}</p>
                </div>

                <div className="space-y-6 min-w-0">
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">Contact</h2>
                        <div className="space-y-3 text-xs font-medium opacity-80">
                            {personalInfo?.email && <div className="flex items-center gap-3 truncate"><span>✉️</span> {personalInfo.email}</div>}
                            {personalInfo?.phone && <div className="flex items-center gap-3 truncate"><span>📱</span> {personalInfo.phone}</div>}
                            {personalInfo?.website && <div className="flex items-center gap-3 truncate"><span>🌐</span> {personalInfo.website}</div>}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4" style={{ fontFamily: headingFont }}>{t('editor.sections.skills')}</h2>
                        <div className="flex flex-wrap gap-2">
                            {safeSkills.map((s, i) => (
                                <span key={i} className="px-2 py-1 bg-slate-800 rounded text-[9px] font-black uppercase tracking-tighter border border-slate-700 whitespace-nowrap">
                                    {getSkillName(s)}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="mt-auto">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4" style={{ fontFamily: headingFont }}>{t('editor.sections.languages')}</h2>
                        <div className="space-y-3">
                            {safeLanguages.map((l, i) => (
                                <div key={i} className="min-w-0">
                                    <div className="flex justify-between text-[10px] font-bold mb-1 uppercase tracking-tighter">
                                        <span className="truncate mr-2">{getLangName(l)}</span>
                                        <span className="whitespace-nowrap">{getLangLevel(l)}</span>
                                    </div>
                                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full" style={{ width: '80%', backgroundColor: colors.primary }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* Main Content: Card-Based Flow */}
            <div className="w-full md:flex-1 p-6 md:p-10 overflow-y-auto space-y-10 min-w-0">
                <section>
                    <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-4" style={{ fontFamily: headingFont }}>
                        {t('editor.sections.summary')}
                        <div className="h-1 flex-1 bg-indigo-100 rounded-full" style={{ backgroundColor: `${colors.primary}20` }}></div>
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed break-words">{personalInfo.summary || 'Summary placeholder...'}</p>
                </section>

                <section>
                    <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-4" style={{ fontFamily: headingFont }}>
                        {t('editor.sections.experience')}
                        <div className="h-1 flex-1 bg-indigo-100 rounded-full" style={{ backgroundColor: `${colors.primary}20` }}></div>
                    </h2>
                    <div className="space-y-4">
                        {safeExperience.map((exp, idx) => (
                            <div key={exp.id || idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow min-w-0">
                                <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-1">
                                    <h3 className="font-bold text-slate-800 break-words">{exp.jobTitle}</h3>
                                    <span className="text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest whitespace-nowrap" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                        {exp.startDate} - {exp.endDate}
                                    </span>
                                </div>
                                <div className="text-xs font-bold text-slate-400 uppercase mb-3 truncate">{exp.company}</div>
                                <p className="text-slate-500 text-xs leading-relaxed break-words">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-4" style={{ fontFamily: headingFont }}>
                        {t('editor.sections.education')}
                        <div className="h-1 flex-1 bg-indigo-100 rounded-full" style={{ backgroundColor: `${colors.primary}20` }}></div>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {safeEducation.map((edu, idx) => (
                            <div key={edu.id || idx} className="bg-white p-5 rounded-2xl border border-slate-100 min-w-0">
                                <h3 className="font-bold text-slate-800 text-sm break-words">{edu.institution}</h3>
                                <div className="text-[10px] font-bold mt-1 uppercase tracking-tighter truncate" style={{ color: colors.primary }}>{edu.degree}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Modern2;
