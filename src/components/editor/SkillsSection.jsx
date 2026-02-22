import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiX } from 'react-icons/fi';
import SectionHeader from '../SectionHeader';
import { SECTION_ICONS, CV_SECTIONS } from '../../utils/constants';

const SkillsSection = ({ data, onChange }) => {
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (inputValue.trim() && !data.includes(inputValue.trim())) {
            onChange([...data, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleRemove = (skillToRemove) => {
        onChange(data.filter(skill => skill !== skillToRemove));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAdd(e);
        }
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <SectionHeader
                title={t('editor.sections.skills')}
                icon={SECTION_ICONS[CV_SECTIONS.SKILLS]}
                showAddButton={false}
            />

            <div className="mb-4">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t('editor.placeholders.skill')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
            </div>

            <div className="flex flex-wrap gap-2">
                {data.map((skill, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1.5 bg-sky-100 text-sky-700 rounded-full text-sm font-medium"
                    >
                        <span>{skill}</span>
                        <button
                            onClick={() => handleRemove(skill)}
                            className="hover:bg-sky-200 rounded-full p-0.5 transition-colors"
                        >
                            <FiX size={14} />
                        </button>
                    </div>
                ))}
            </div>

            {data.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <p>{t('editor.common.noSkills')}</p>
                </div>
            )}
        </div>
    );
};

export default SkillsSection;
