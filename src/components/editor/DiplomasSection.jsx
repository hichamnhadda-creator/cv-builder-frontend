import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import FormInput from '../FormInput';
import FormTextarea from '../FormTextarea';
import SectionHeader from '../SectionHeader';
import Button from '../Button';
import { SECTION_ICONS, CV_SECTIONS } from '../../utils/constants';

const DiplomasSection = ({ data = [], onChange }) => {
    const { t } = useTranslation();
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingItem, setEditingItem] = useState(null);

    const handleAdd = () => {
        const newItem = {
            id: Date.now(),
            degree: '',
            institution: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
        };
        setEditingItem(newItem);
        setEditingIndex(data.length);
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditingItem({ ...data[index] });
    };

    const handleSave = () => {
        const updatedData = [...data];
        if (editingIndex < data.length) {
            updatedData[editingIndex] = editingItem;
        } else {
            updatedData.push(editingItem);
        }
        onChange(updatedData);
        setEditingIndex(null);
        setEditingItem(null);
    };

    const handleCancel = () => {
        setEditingIndex(null);
        setEditingItem(null);
    };

    const handleDelete = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        onChange(updatedData);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditingItem({
            ...editingItem,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <SectionHeader
                title={t('editor.sections.diplomas')}
                icon={SECTION_ICONS[CV_SECTIONS.DIPLOMAS]}
                onAdd={handleAdd}
                addButtonText={t('editor.actions.addDiploma')}
            />

            <div className="space-y-4">
                {data.map((item, index) => (
                    editingIndex === index ? (
                        <div key={item.id} className="border-2 border-sky-500 rounded-lg p-4 bg-sky-50">
                            <FormInput label={t('editor.labels.degree')} name="degree" value={editingItem.degree} onChange={handleChange} placeholder={t('editor.placeholders.degree')} required />
                            <FormInput label={t('editor.labels.institution')} name="institution" value={editingItem.institution} onChange={handleChange} placeholder={t('editor.placeholders.institution')} required />
                            <FormInput label={t('editor.labels.location')} name="location" value={editingItem.location} onChange={handleChange} placeholder={t('editor.placeholders.address')} />
                            <div className="grid grid-cols-2 gap-4">
                                <FormInput label={t('editor.labels.startDate')} name="startDate" type="month" value={editingItem.startDate} onChange={handleChange} />
                                <FormInput label={t('editor.labels.endDate')} name="endDate" type="month" value={editingItem.endDate} onChange={handleChange} disabled={editingItem.current} />
                            </div>
                            <div className="mb-4">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="current" checked={editingItem.current} onChange={handleChange} className="w-4 h-4 text-sky-500" />
                                    <span className="text-sm text-gray-700">{t('editor.labels.currentlyStudying')}</span>
                                </label>
                            </div>
                            <FormTextarea label={t('editor.labels.description')} name="description" value={editingItem.description} onChange={handleChange} rows={3} placeholder={t('editor.placeholders.jobDescription')} />
                            <div className="flex gap-2 mt-4">
                                <Button variant="primary" onClick={handleSave} icon={<FiSave />}>{t('editor.actions.save')}</Button>
                                <Button variant="secondary" onClick={handleCancel} icon={<FiX />}>{t('editor.actions.cancel')}</Button>
                            </div>
                        </div>
                    ) : (
                        <div key={item.id} className="border rounded-lg p-4 hover:border-sky-300 transition-colors">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">{item.degree}</h3>
                                    <p className="text-gray-600">{item.institution}</p>
                                    <p className="text-sm text-gray-500">
                                        <p className="text-sm text-gray-500">
                                            {item.startDate} - {item.current ? t('editor.common.present') : item.endDate}
                                            {item.location && ` • ${item.location}`}
                                        </p>
                                        {item.location && ` • ${item.location}`}
                                    </p>
                                    {item.description && <p className="text-sm text-gray-700 mt-2">{item.description}</p>}
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button onClick={() => handleEdit(index)} className="p-2 text-sky-500 hover:bg-sky-50 rounded"><FiEdit2 size={16} /></button>
                                    <button onClick={() => handleDelete(index)} className="p-2 text-red-500 hover:bg-red-50 rounded"><FiTrash2 size={16} /></button>
                                </div>
                            </div>
                        </div>
                    )
                ))}

                {editingIndex === data.length && editingItem && (
                    <div className="border-2 border-sky-500 rounded-lg p-4 bg-sky-50">
                        <FormInput label={t('editor.labels.degree')} name="degree" value={editingItem.degree} onChange={handleChange} placeholder={t('editor.placeholders.degree')} required />
                        <FormInput label={t('editor.labels.institution')} name="institution" value={editingItem.institution} onChange={handleChange} placeholder={t('editor.placeholders.institution')} required />
                        <FormInput label={t('editor.labels.location')} name="location" value={editingItem.location} onChange={handleChange} placeholder={t('editor.placeholders.address')} />
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput label={t('editor.labels.startDate')} name="startDate" type="month" value={editingItem.startDate} onChange={handleChange} />
                            <FormInput label={t('editor.labels.endDate')} name="endDate" type="month" value={editingItem.endDate} onChange={handleChange} disabled={editingItem.current} />
                        </div>
                        <div className="mb-4">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="current" checked={editingItem.current} onChange={handleChange} className="w-4 h-4 text-sky-500" />
                                <span className="text-sm text-gray-700">{t('editor.labels.currentlyStudying')}</span>
                            </label>
                        </div>
                        <FormTextarea label={t('editor.labels.description')} name="description" value={editingItem.description} onChange={handleChange} rows={3} placeholder={t('editor.placeholders.jobDescription')} />
                        <div className="flex gap-2 mt-4">
                            <Button variant="primary" onClick={handleSave} icon={<FiSave />}>Save</Button>
                            <Button variant="secondary" onClick={handleCancel} icon={<FiX />}>Cancel</Button>
                        </div>
                    </div>
                )}

                {data.length === 0 && editingIndex === null && (
                    <div className="text-center py-8 text-gray-500">
                        <p>{t('editor.common.noDiplomas')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiplomasSection;
