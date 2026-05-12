import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Ats2 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { 
        personalInfo = {}, 
        experience = [], 
        education = [], 
        skills = [], 
        languages = [], 
        projects = [] 
    } = data || {};
    
    const colors = customization?.colors || { primary: '#000000', secondary: '#4b5563' };
    const fontFamily = customization?.fonts?.body || 'Times New Roman, serif';
    const headingFont = customization?.fonts?.heading || 'Times New Roman, serif';

    const safeExperience = Array.isArray(experience) ? experience : [];
    const safeEducation = Array.isArray(education) ? education : [];
    const safeSkills = Array.isArray(skills) ? skills : [];
    const safeLanguages = Array.isArray(languages) ? languages : [];

    return (
        <div className="bg-white min-h-full p-12 w-full text-gray-900" style={{ fontFamily }}>
            {/* Centered Header */}
            <header className="text-center mb-8 flex flex-col items-center">
                {personalInfo?.photo && (
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black mb-4">
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                    </div>
                )}
                <h1 className="text-3xl font-bold mb-2 uppercase tracking-wide" style={{ fontFamily: headingFont }}>
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                <div className="text-sm border-y border-black py-2 flex justify-center gap-4 w-full">
                    {personalInfo?.address && <span>{personalInfo.address}</span>}
                    <span>•</span>
                    {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                    <span>•</span>
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                </div>
            </header>

            {/* Skills: Top Section */}
            <section className="mb-6">
                <h2 className="text-base font-bold border-b border-black mb-2 uppercase" style={{ fontFamily: headingFont }}>
                    {t('editor.sections.skills')}
                </h2>
                <div className="grid grid-cols-2 text-sm">
                    {safeSkills.map((s, i) => (
                        <div key={i}>• {getSkillName(s)}</div>
                    ))}
                </div>
            </section>

            {/* Experience */}
            <section className="mb-6">
                <h2 className="text-base font-bold border-b border-black mb-4 uppercase" style={{ fontFamily: headingFont }}>
                    {t('editor.sections.experience')}
                </h2>
                <div className="space-y-6">
                    {safeExperience.map((exp, idx) => (
                        <div key={exp.id || idx}>
                            <div className="flex justify-between font-bold text-sm">
                                <span>{exp.company}</span>
                                <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                            </div>
                            <div className="italic text-sm mb-2">{exp.jobTitle}</div>
                            <p className="text-sm leading-normal">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education */}
            <section className="mb-6">
                <h2 className="text-base font-bold border-b border-black mb-3 uppercase" style={{ fontFamily: headingFont }}>
                    {t('editor.sections.education')}
                </h2>
                {safeEducation.map((edu, idx) => (
                    <div key={edu.id || idx} className="flex justify-between text-sm mb-1">
                        <div><span className="font-bold">{edu.institution}</span>, {edu.degree}</div>
                        <span className="italic">{edu.startDate} - {edu.endDate}</span>
                    </div>
                ))}
            </section>

            {/* Projects */}
            {projects.length > 0 && (
                <section>
                    <h2 className="text-base font-bold border-b border-black mb-3 uppercase" style={{ fontFamily: headingFont }}>
                        {t('editor.sections.projects')}
                    </h2>
                    {projects.map((proj, idx) => (
                        <div key={proj.id || idx} className="mb-3">
                            <div className="font-bold text-sm">{proj.name}</div>
                            <p className="text-sm">{proj.description}</p>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
};

export default Ats2;
