import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSkillName, getLangName, getLangLevel } from './components/utils';

const Ats4 = ({ data, customization }) => {
    const { t } = useTranslation();
    const { 
        personalInfo = {}, 
        experience = [], 
        education = [], 
        skills = [], 
        languages = []
    } = data || {};
    
    const colors = customization?.colors || { primary: '#111827', secondary: '#4b5563' };
    const fontFamily = customization?.fonts?.body || 'Verdana, sans-serif';
    const headingFont = customization?.fonts?.heading || 'Verdana, sans-serif';

    const safeExperience = Array.isArray(experience) ? experience : [];
    const safeEducation = Array.isArray(education) ? education : [];
    const safeSkills = Array.isArray(skills) ? skills : [];

    return (
        <div className="bg-white h-full p-10 w-full text-gray-900 border-t-8 border-gray-800" style={{ fontFamily }}>
            <header className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-black mb-1 tracking-tighter" style={{ fontFamily: headingFont }}>
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-xs font-bold uppercase text-gray-500">
                        <span>{personalInfo.email}</span>
                        <span>|</span>
                        <span>{personalInfo.phone}</span>
                        <span>|</span>
                        <span>{personalInfo.address}</span>
                    </div>
                </div>
                {personalInfo?.photo && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-100 flex-shrink-0">
                        <img src={personalInfo.photo} alt="" className="w-full h-full object-cover" />
                    </div>
                )}
            </header>

            <div className="space-y-8">
                <section>
                    <h2 className="text-sm font-black border-b-2 border-gray-800 mb-3 uppercase tracking-tighter">Professional Summary</h2>
                    <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-sm font-black border-b-2 border-gray-800 mb-4 uppercase tracking-tighter">{t('editor.sections.experience')}</h2>
                            <div className="space-y-6">
                                {safeExperience.map((exp, idx) => (
                                    <div key={exp.id || idx}>
                                        <div className="flex justify-between font-black text-sm mb-1">
                                            <span>{exp.jobTitle}</span>
                                            <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                                        </div>
                                        <div className="text-xs font-bold text-gray-600 mb-2 uppercase">{exp.company}</div>
                                        <p className="text-xs leading-relaxed text-gray-700">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-sm font-black border-b-2 border-gray-800 mb-4 uppercase tracking-tighter">{t('editor.sections.skills')}</h2>
                            <ul className="space-y-1 text-xs font-bold list-disc list-inside text-gray-700">
                                {safeSkills.map((s, i) => (
                                    <li key={i}>{getSkillName(s)}</li>
                                ))}
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-sm font-black border-b-2 border-gray-800 mb-4 uppercase tracking-tighter">{t('editor.sections.education')}</h2>
                            {safeEducation.map((edu, idx) => (
                                <div key={edu.id || idx} className="mb-3">
                                    <div className="font-black text-xs">{edu.institution}</div>
                                    <div className="text-[10px] text-gray-500">{edu.degree}</div>
                                    <div className="text-[10px] italic">{edu.startDate} - {edu.endDate}</div>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ats4;
