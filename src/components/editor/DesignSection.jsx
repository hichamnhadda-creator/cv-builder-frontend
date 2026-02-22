import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiLayout } from 'react-icons/fi';
import SectionHeader from '../SectionHeader';
import FontFamilySelector from './FontFamilySelector';

const DesignSection = ({ customization, updateCustomization }) => {
    const { t } = useTranslation();

    const handleFontChange = (type, value) => {
        updateCustomization({
            fonts: {
                ...customization.fonts,
                [type]: value
            }
        });
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <SectionHeader
                title={t('editor.sections.design') || 'Design & Customization'}
                icon={<FiLayout className="w-5 h-5" />}
                showAddButton={false}
                isOpenDefault={true}
            />

            <div className="space-y-6">
                {/* Typography Settings */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">
                        Typography
                    </h3>

                    <FontFamilySelector
                        label="Heading Font"
                        currentFont={customization?.fonts?.heading || 'Poppins'}
                        onChange={(value) => handleFontChange('heading', value)}
                    />

                    <FontFamilySelector
                        label="Body Font"
                        currentFont={customization?.fonts?.body || 'Inter'}
                        onChange={(value) => handleFontChange('body', value)}
                    />
                </div>

                {/* We can move Color settings here in the future if desired, 
                    currently they might be handled elsewhere or we can add them later. 
                    For now, focusing on Fonts as requested. */}
            </div>
        </div>
    );
};

export default DesignSection;
