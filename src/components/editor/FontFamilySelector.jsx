import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FiChevronDown, FiSearch, FiCheck } from 'react-icons/fi';
import { AVAILABLE_FONTS } from '../../utils/constants';

const FontFamilySelector = ({ currentFont, onChange, label }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Group fonts by category
    const groupedFonts = useMemo(() => {
        const filtered = AVAILABLE_FONTS.filter(font =>
            font.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            font.category.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return filtered.reduce((acc, font) => {
            if (!acc[font.category]) {
                acc[font.category] = [];
            }
            acc[font.category].push(font);
            return acc;
        }, {});
    }, [searchTerm]);

    const handleSelect = (fontValue) => {
        onChange(fontValue);
        setIsOpen(false);
    };

    const currentFontLabel = AVAILABLE_FONTS.find(f => f.value === currentFont)?.label || currentFont;

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label || t('editor.customization.fontFamily') || 'Font Family'}
            </label>

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            >
                <span style={{ fontFamily: currentFont }}>{currentFontLabel}</span>
                <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-hidden flex flex-col">
                    {/* Search Bar */}
                    <div className="p-2 border-b border-gray-100 sticky top-0 bg-white">
                        <div className="relative">
                            <FiSearch className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search fonts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded bg-gray-50 focus:outline-none focus:bg-white focus:border-primary-300"
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Font List */}
                    <div className="overflow-y-auto flex-1 p-1">
                        {Object.keys(groupedFonts).length > 0 ? (
                            Object.entries(groupedFonts).map(([category, fonts]) => (
                                <div key={category} className="mb-2">
                                    <div className="px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                                        {category}
                                    </div>
                                    {fonts.map((font) => (
                                        <button
                                            key={font.value}
                                            onClick={() => handleSelect(font.value)}
                                            className={`w-full text-left px-3 py-2 text-sm rounded flex items-center justify-between hover:bg-gray-50 ${currentFont === font.value ? 'bg-primary-50 text-primary-700' : 'text-gray-700'}`}
                                            title={font.label}
                                        >
                                            <span style={{ fontFamily: font.value }} className="text-base">
                                                {font.label}
                                            </span>
                                            {currentFont === font.value && (
                                                <FiCheck className="w-4 h-4 text-primary-600" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-500">
                                No fonts found
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Click outside listener could be added here or strictly handled via a custom hook/wrapper if needed. 
                For simplicity in this step, relying on basic toggling. 
                Ideally, a click-outside handler would close the dropdown. */}
        </div>
    );
};

export default FontFamilySelector;
