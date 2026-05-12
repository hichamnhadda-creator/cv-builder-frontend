import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Professional1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { 
        personalInfo = {}, 
        experience = [], 
        education = [], 
        skills = [], 
        languages = [] 
    } = data || {};
    
    const colors = customization?.colors || { primary: '#1e293b', secondary: '#475569' };
    const fontFamily = customization?.fonts?.body || 'Inter';
    const headingFont = customization?.fonts?.heading || 'Poppins';

    // Safe data access
    const safeExperience = Array.isArray(experience) ? experience : [];
    const safeEducation = Array.isArray(education) ? education : [];
    const safeSkills = Array.isArray(skills) ? skills : [];
    const safeLanguages = Array.isArray(languages) ? languages : [];

    return (
        <div className="cv-template-professional-1 bg-white min-h-full p-8 md:p-12 shadow-lg flex flex-col gap-12 w-full max-w-full" style={{ fontFamily }}>
            {/* Minimalist Corporate Header */}
            <header className="border-b-4 border-slate-900 pb-8 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 w-full" style={{ borderColor: colors.primary }}>
                <div className="flex flex-col md:flex-row items-center gap-6 flex-1 w-full">
                    {personalInfo?.photo && (
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex-shrink-0">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="min-w-0 text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2 uppercase break-words" style={{ fontFamily: headingFont }}>
                            {personalInfo?.fullName || 'Your Name'}
                        </h1>
                        <p className="text-base md:text-lg font-medium text-slate-500 italic truncate">{safeExperience?.[0]?.jobTitle || 'Executive'}</p>
                    </div>
                </div>
                <div className="text-center md:text-right text-xs md:text-sm font-medium text-slate-600 space-y-1 min-w-0 w-full md:w-auto">
                    {personalInfo?.email && <div className="truncate">{personalInfo.email}</div>}
                    {personalInfo?.phone && <div className="truncate">{personalInfo.phone}</div>}
                    {personalInfo?.address && <div className="truncate">{personalInfo.address}</div>}
                </div>
            </header>

            <div className="flex flex-col gap-12 w-full">
                {/* Summary: High Focus */}
                <section className="w-full">
                    <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-4 border-b border-slate-100 pb-1" style={{ fontFamily: headingFont }}>
                        {t('editor.sections.summary')}
                    </h2>
                    <p className="text-slate-800 text-sm md:text-base leading-relaxed text-justify w-full break-words">
                        {personalInfo.summary || 'Summary placeholder...'}
                    </p>
                </section>

                {/* Experience: Dominant Section */}
                <section className="w-full">
                    <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-6 border-b border-slate-100 pb-1" style={{ fontFamily: headingFont }}>
                        {t('editor.sections.experience')}
                    </h2>
                    <div className="space-y-10 w-full">
                        {safeExperience.map((exp, idx) => (
                            <div key={exp.id || idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 w-full min-w-0">
                                <div className="md:col-span-1 text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest pt-1 whitespace-nowrap">
                                    {exp.startDate} — {exp.endDate}
                                </div>
                                <div className="md:col-span-3 min-w-0">
                                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 break-words">{exp.jobTitle}</h3>
                                    <div className="text-xs md:text-sm font-black text-slate-500 uppercase mb-4 tracking-tighter truncate">{exp.company} | {exp.location}</div>
                                    <p className="text-slate-700 text-sm leading-relaxed break-words">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Secondary Sections: Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16 border-t border-slate-100 pt-10 w-full">
                    <section className="min-w-0">
                        <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-6" style={{ fontFamily: headingFont }}>
                            {t('editor.sections.education')}
                        </h2>
                        <div className="space-y-6">
                            {safeEducation.map((edu, idx) => (
                                <div key={edu.id || idx} className="min-w-0">
                                    <h3 className="font-bold text-slate-900 text-sm md:text-base break-words">{edu.degree}</h3>
                                    <div className="text-sm font-medium text-slate-500 mt-1 truncate">{edu.institution}</div>
                                    <div className="text-[10px] font-bold text-slate-300 mt-2 whitespace-nowrap">{edu.startDate} — {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="min-w-0">
                        <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-6" style={{ fontFamily: headingFont }}>
                            {t('editor.sections.skills')} & {t('editor.sections.languages')}
                        </h2>
                        <div className="space-y-8 min-w-0">
                            <div className="min-w-0">
                                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm font-bold text-slate-700">
                                    {safeSkills.map((s, i) => (
                                        <span key={i} className="border-b-2 border-slate-100 pb-0.5 whitespace-nowrap">{getSkillName(s)}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2 min-w-0">
                                {safeLanguages.map((l, i) => (
                                    <div key={i} className="flex justify-between text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 min-w-0">
                                        <span className="truncate mr-2">{getLangName(l)}</span>
                                        <span className="text-slate-300 whitespace-nowrap">{getLangLevel(l)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Professional1;
