import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Minimal1 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { 
        personalInfo = {}, 
        experience = [], 
        education = [], 
        skills = [], 
        languages = [] 
    } = data || {};
    
    const colors = customization?.colors || { primary: '#000000', secondary: '#737373' };
    const fontFamily = customization?.fonts?.body || 'serif';
    const headingFont = customization?.fonts?.heading || 'serif';

    // Safe data access
    const safeExperience = Array.isArray(experience) ? experience : [];
    const safeEducation = Array.isArray(education) ? education : [];
    const safeSkills = Array.isArray(skills) ? skills : [];

    return (
        <div className="bg-white min-h-full p-8 md:p-16 lg:p-24 shadow-lg flex flex-col items-center text-neutral-800 w-full max-w-full" style={{ fontFamily }}>
            <div className="max-w-xl w-full flex flex-col gap-10 md:gap-20">
                {/* Header: Typography + Photo */}
                <header className="text-center space-y-6 min-w-0 flex flex-col items-center">
                    {personalInfo?.photo && (
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-sm border border-neutral-100">
                            <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="space-y-4 w-full">
                        <h1 className="text-3xl md:text-4xl font-light tracking-tighter text-neutral-900 break-words" style={{ fontFamily: headingFont }}>
                            {personalInfo?.fullName || 'Your Name'}
                        </h1>
                        <div className="h-px w-12 bg-neutral-200 mx-auto"></div>
                        <div className="text-[10px] font-medium uppercase tracking-[0.4em] text-neutral-400 flex flex-wrap justify-center gap-x-8 gap-y-2 px-4">
                            {personalInfo?.email && <span className="truncate">{personalInfo.email}</span>}
                            {personalInfo?.phone && <span className="whitespace-nowrap">{personalInfo.phone}</span>}
                            {personalInfo?.address && <span className="truncate">{personalInfo.address}</span>}
                        </div>
                    </div>
                </header>

                {/* Content: Single Column List */}
                <section className="space-y-12 w-full min-w-0">
                    <div className="space-y-4 min-w-0">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-300 text-center mb-4 md:mb-8">{t('editor.sections.summary')}</h2>
                        <p className="text-sm leading-loose text-neutral-500 text-center font-light break-words px-2 md:px-0">
                            {personalInfo.summary || 'Summary placeholder...'}
                        </p>
                    </div>

                    <div className="space-y-12 md:space-y-16 min-w-0">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-300 text-center">{t('editor.sections.experience')}</h2>
                        {safeExperience.map((exp, idx) => (
                            <div key={exp.id || idx} className="space-y-3 min-w-0">
                                <div className="flex flex-col sm:flex-row justify-between items-baseline gap-1">
                                    <h3 className="text-sm font-bold tracking-tight text-neutral-900 break-words">{exp.jobTitle}</h3>
                                    <span className="text-[10px] text-neutral-300 font-medium italic whitespace-nowrap">{exp.startDate} — {exp.endDate}</span>
                                </div>
                                <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-widest truncate">{exp.company}</div>
                                <p className="text-[12px] leading-relaxed text-neutral-500 font-light text-justify break-words">{exp.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-12 pt-10 min-w-0">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-300 text-center">{t('editor.sections.education')}</h2>
                        <div className="space-y-8 min-w-0">
                            {safeEducation.map((edu, idx) => (
                                <div key={edu.id || idx} className="text-center min-w-0">
                                    <h3 className="text-sm font-bold text-neutral-900 mb-1 break-words">{edu.degree}</h3>
                                    <div className="text-[11px] text-neutral-400 italic break-words">{edu.institution}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-12 pt-10 min-w-0">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-300 text-center">{t('editor.sections.skills')}</h2>
                        <div className="text-[11px] font-medium text-neutral-400 text-center leading-relaxed tracking-wider break-words px-4">
                            {safeSkills.map(s => getSkillName(s)).filter(Boolean).join(' / ')}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Minimal1;
