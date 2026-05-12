import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Modern1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { 
        personalInfo = {}, 
        experience = [], 
        education = [], 
        skills = [], 
        languages = [], 
        projects = [] 
    } = data || {};
    
    const colors = customization?.colors || { primary: '#0ea5e9', secondary: '#1e293b' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    // Safe data access
    const safeExperience = Array.isArray(experience) ? experience : [];
    const safeEducation = Array.isArray(education) ? education : [];
    const safeSkills = Array.isArray(skills) ? skills : [];
    const safeLanguages = Array.isArray(languages) ? languages : [];
    const safeProjects = Array.isArray(projects) ? projects : [];

    return (
        <div className="cv-template-modern-1 bg-white min-h-full p-6 md:p-10 shadow-lg overflow-hidden flex flex-col gap-10 w-full max-w-full" style={{ fontFamily }}>
            {/* Top Header: Balanced Grid */}
            <header className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 border-b pb-10 w-full">
                <div className="flex items-center gap-6 min-w-0">
                    {personalInfo?.photo && (
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-slate-50 flex-shrink-0">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="min-w-0">
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight mb-2 truncate" style={{ fontFamily: headingFont }}>
                            {personalInfo?.fullName || 'Your Name'}
                        </h1>
                        <p className="text-base md:text-lg font-semibold uppercase tracking-widest truncate" style={{ color: colors.primary }}>
                            {safeExperience?.[0]?.jobTitle || 'Professional'}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest md:justify-items-end w-full">
                    {personalInfo?.email && <div className="flex items-center gap-2 truncate"><span>✉️</span> {personalInfo.email}</div>}
                    {personalInfo?.phone && <div className="flex items-center gap-2 truncate"><span>📱</span> {personalInfo.phone}</div>}
                    {personalInfo?.website && <div className="flex items-center gap-2 truncate"><span>🌐</span> {personalInfo.website}</div>}
                    {personalInfo?.address && <div className="flex items-center gap-2 truncate"><span>📍</span> {personalInfo.address}</div>}
                </div>
            </header>

            {/* Triple Column Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 flex-1 w-full">
                {/* Col 1: Main Experience */}
                <div className="md:col-span-1 space-y-8 min-w-0">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 mb-6 flex items-center gap-3" style={{ fontFamily: headingFont }}>
                            <span className="w-8 h-px bg-slate-200"></span>
                            {t('editor.sections.experience')}
                        </h2>
                        <div className="space-y-6">
                            {safeExperience.slice(0, 3).map((exp, idx) => (
                                <div key={exp.id || idx} className="min-w-0">
                                    <h3 className="font-bold text-slate-800 leading-tight mb-1 break-words">{exp.jobTitle}</h3>
                                    <div className="text-[10px] font-bold mb-2 uppercase truncate" style={{ color: colors.primary }}>{exp.company}</div>
                                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-4 break-words">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>


                {/* Col 2: Education & Projects */}
                <div className="md:col-span-1 space-y-8 min-w-0">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 mb-6 flex items-center gap-3" style={{ fontFamily: headingFont }}>
                            <span className="w-8 h-px bg-slate-200"></span>
                            {t('editor.sections.education')}
                        </h2>
                        <div className="space-y-4">
                            {safeEducation.map((edu, idx) => (
                                <div key={edu.id || idx} className="min-w-0">
                                    <h3 className="font-bold text-slate-800 text-sm break-words">{edu.institution}</h3>
                                    <div className="text-[10px] font-black text-slate-400 uppercase mt-1 break-words">{edu.degree}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 mb-6 flex items-center gap-3" style={{ fontFamily: headingFont }}>
                            <span className="w-8 h-px bg-slate-200"></span>
                            {t('editor.sections.projects')}
                        </h2>
                        <div className="space-y-4">
                            {safeProjects.map((proj, idx) => (
                                <div key={proj.id || idx} className="min-w-0">
                                    <h3 className="font-bold text-slate-800 text-sm break-words">{proj.name}</h3>
                                    <p className="text-slate-500 text-[10px] leading-relaxed mt-1 break-words">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Col 3: Skills, Languages & Summary */}
                <div className="md:col-span-1 space-y-8 bg-slate-50/50 p-6 rounded-3xl min-w-0">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 mb-4" style={{ fontFamily: headingFont }}>
                            {t('editor.sections.summary')}
                        </h2>
                        <p className="text-slate-600 text-xs leading-relaxed italic break-words">
                            "{personalInfo.summary || 'Summary placeholder...'}"
                        </p>
                    </section>
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 mb-4" style={{ fontFamily: headingFont }}>
                            {t('editor.sections.skills')}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {safeSkills.map((s, i) => (
                                <span key={i} className="px-2 py-1 bg-white rounded-lg border border-slate-100 text-[10px] font-bold text-slate-600 shadow-sm whitespace-nowrap">
                                    {getSkillName(s)}
                                </span>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 mb-4" style={{ fontFamily: headingFont }}>
                            {t('editor.sections.languages')}
                        </h2>
                        <div className="space-y-2">
                            {safeLanguages.map((l, i) => (
                                <div key={i} className="flex justify-between text-[10px] font-bold min-w-0">
                                    <span className="text-slate-600 uppercase tracking-tighter truncate mr-2">{getLangName(l)}</span>
                                    <span className="text-slate-400 whitespace-nowrap">{getLangLevel(l)}</span>
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
