import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiTrash2 } from 'react-icons/fi';
import FormInput from '../FormInput';
import SectionHeader from '../SectionHeader';
import Button from '../Button';
import { SECTION_ICONS, CV_SECTIONS, LANGUAGE_LEVELS } from '../../utils/constants';

const LanguagesSection = ({ data, onChange }) => {
    const { t } = useTranslation();
    const [newLanguage, setNewLanguage] = useState({ language: '', level: 'intermediate' });

    const handleAdd = () => {
        if (newLanguage.language.trim()) {
            onChange([...data, { id: Date.now(), ...newLanguage }]);
            setNewLanguage({ language: '', level: 'intermediate' });
        }
    };

    const handleDelete = (id) => {
        onChange(data.filter(item => item.id !== id));
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <SectionHeader
                title={t('editor.sections.languages')}
                icon={SECTION_ICONS[CV_SECTIONS.LANGUAGES]}
                showAddButton={false}
            />

            <div className="space-y-4">
                {/* Add New Language */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="md:col-span-2">
                            <input
                                type="text"
                                value={newLanguage.language}
                                onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })}
                                placeholder="Language name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                            />
                        </div>
                        <select
                            value={newLanguage.level}
                            onChange={(e) => setNewLanguage({ ...newLanguage, level: e.target.value })}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        >
                            {LANGUAGE_LEVELS.map(level => (
                                <option key={level.value} value={level.value}>{level.label}</option>
                            ))}
                        </select>
                    </div>
                    <Button variant="primary" onClick={handleAdd} className="mt-3" fullWidth>
                        {t('editor.actions.addLanguage')}
                    </Button>
                </div>

                {/* Language List */}
                {data.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:border-sky-300 transition-colors">
                        <div>
                            <span className="font-medium text-gray-800">{item.language}</span>
                            <span className="ml-3 text-sm text-gray-500 capitalize">{item.level}</span>
                        </div>
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                            <FiTrash2 size={16} />
                        </button>
                    </div>
                ))}

                {data.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <p>{t('editor.common.noLanguages')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LanguagesSection;
