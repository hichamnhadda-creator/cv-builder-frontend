import React from 'react';
import { useTranslation } from 'react-i18next';
import FormInput from '../FormInput';
import FormTextarea from '../FormTextarea';
import SectionHeader from '../SectionHeader';
import { SECTION_ICONS, CV_SECTIONS } from '../../utils/constants';

const PersonalInfoSection = ({ data, onChange }) => {
    const { t } = useTranslation();
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({
            ...data,
            [name]: value
        });
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <SectionHeader
                title={t('editor.sections.personal')}
                icon={SECTION_ICONS[CV_SECTIONS.PERSONAL_INFO]}
                showAddButton={false}
            />

            <div className="space-y-4">
                {/* Photo Upload */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                        {data.photo ? (
                            <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-2xl text-gray-400">📷</span>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('editor.labels.photo')}
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        onChange({
                                            ...data,
                                            photo: reader.result
                                        });
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
                        />
                    </div>
                </div>

                <FormInput
                    label={t('editor.labels.fullName')}
                    name="fullName"
                    value={data.fullName || ''}
                    onChange={handleChange}
                    placeholder={t('editor.placeholders.fullName')}
                    required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                        label={t('editor.labels.email')}
                        name="email"
                        type="email"
                        value={data.email || ''}
                        onChange={handleChange}
                        placeholder={t('editor.placeholders.email')}
                        required
                    />

                    <FormInput
                        label={t('editor.labels.phone')}
                        name="phone"
                        type="tel"
                        value={data.phone || ''}
                        onChange={handleChange}
                        placeholder={t('editor.placeholders.phone')}
                    />
                </div>

                <FormInput
                    label={t('editor.labels.address')}
                    name="address"
                    value={data.address || ''}
                    onChange={handleChange}
                    placeholder={t('editor.placeholders.address')}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                        label={t('editor.labels.linkedin')}
                        name="linkedin"
                        value={data.linkedin || ''}
                        onChange={handleChange}
                        placeholder="linkedin.com/in/johndoe"
                    />

                    <FormInput
                        label={t('editor.labels.website')}
                        name="website"
                        value={data.website || ''}
                        onChange={handleChange}
                        placeholder="www.johndoe.com"
                    />
                </div>

                <FormTextarea
                    label={t('editor.labels.summary')}
                    name="summary"
                    value={data.summary || ''}
                    onChange={handleChange}
                    placeholder={t('editor.placeholders.summary')}
                    rows={4}
                    maxLength={500}
                />
            </div>
        </div>
    );
};

export default PersonalInfoSection;
