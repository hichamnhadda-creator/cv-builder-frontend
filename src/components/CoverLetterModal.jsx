import React, { useState, useEffect } from 'react';
import { FiFileText, FiSend, FiCopy, FiDownload, FiCheck, FiX, FiInfo } from 'react-icons/fi';
import Modal from './Modal';
import Button from './Button';
import api from '../lib/api';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const CoverLetterModal = ({ isOpen, onClose, cvData, cvId, onSaveSuccess }) => {
    const { t, i18n } = useTranslation();
    const [company, setCompany] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [language, setLanguage] = useState('en');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState('');
    const [step, setStep] = useState('input'); // 'input' or 'result'

    useEffect(() => {
        if (isOpen) {
            const currentLang = i18n.language?.split('-')[0] || 'en';
            if (['en', 'fr', 'ar', 'it', 'es', 'pt', 'de'].includes(currentLang)) {
                setLanguage(currentLang);
            } else {
                setLanguage('en');
            }
            // Reset other fields optionally if you want a fresh start each time
            // setCompany('');
            // setJobTitle('');
            // setGeneratedContent('');
            // setStep('input');
        }
    }, [isOpen, i18n.language]);

    const handleGenerate = async () => {
        if (!company || !jobTitle) {
            toast.error(t('errors.requiredFields'));
            return;
        }

        setIsGenerating(true);
        try {
            const res = await api.post('/cover-letters/generate', {
                cvData,
                company,
                jobTitle,
                language
            });

            if (res.data.success) {
                setGeneratedContent(res.data.content);
                setStep('result');
                toast.success(t('success.exported')); // Using exported as a proxy for generated success
            }
        } catch (error) {
            console.error('Generation error:', error);
            const errorMsg = error.response?.data?.error || 'Failed to generate cover letter';
            toast.error(errorMsg);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedContent);
        toast.success(t('success.copied', 'Copied to clipboard!'));
    };

    const handleSave = async () => {
        try {
            const res = await api.post('/cover-letters', {
                title: `${jobTitle} at ${company}`,
                company,
                jobTitle,
                content: generatedContent,
                language,
                cvId
            });

            if (res.data.success) {
                toast.success(t('success.saved'));
                if (onSaveSuccess) onSaveSuccess();
                onClose();
            }
        } catch (error) {
            toast.error('Failed to save cover letter');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={null}
            size="xl"
        >
            <div className="flex flex-col h-full max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-3xl flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg">
                            <FiFileText size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-gray-900 tracking-tight">{t('common.aiCoverLetterGenerator')}</h2>
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest opacity-80">{t('common.premiumAiFeature')}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <FiX size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    {step === 'input' ? (
                        <div className="max-w-2xl mx-auto py-4">
                            <div className="text-center mb-10">
                                <h3 className="text-2xl font-black text-gray-900 mb-3">{t('common.craftPerfectApplication')}</h3>
                                <p className="text-gray-500">{t('common.aiAnalysisDescription')}</p>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1">{t('common.targetCompany')}</label>
                                        <input
                                            type="text"
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                            placeholder="e.g. Google, Tesla, Startup Co."
                                            className="w-full h-14 px-5 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl transition-all outline-none text-gray-900 font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1">{t('common.targetJobTitle')}</label>
                                        <input
                                            type="text"
                                            value={jobTitle}
                                            onChange={(e) => setJobTitle(e.target.value)}
                                            placeholder="e.g. Senior Software Engineer"
                                            className="w-full h-14 px-5 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl transition-all outline-none text-gray-900 font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">{t('common.preferredLanguage')}</label>
                                    <div className="flex gap-3">
                                        {['en', 'fr', 'ar', 'it', 'es', 'pt', 'de'].map((lang) => (
                                            <button
                                                key={lang}
                                                onClick={() => setLanguage(lang)}
                                                className={`flex-1 h-12 rounded-xl font-bold uppercase tracking-widest text-xs border-2 transition-all ${
                                                    language === lang 
                                                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                                                    : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                                                }`}
                                            >
                                                {lang === 'en' ? 'English' : lang === 'fr' ? 'Français' : lang === 'ar' ? 'العربية' : lang === 'it' ? 'Italiano' : lang === 'es' ? 'Español' : lang === 'pt' ? 'Português' : 'Deutsch'}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <Button
                                        variant="primary"
                                        fullWidth
                                        className="h-16 text-lg font-black shadow-xl shadow-blue-200 rounded-2xl"
                                        onClick={handleGenerate}
                                        loading={isGenerating}
                                        icon={<FiSend />}
                                    >
                                        {t('common.generateWithAi')}
                                    </Button>
                                    <p className="text-center text-[11px] text-gray-400 mt-4 flex items-center justify-center gap-2">
                                        <FiInfo size={12} />
                                        {t('common.creditDeductionNote')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="font-black text-gray-900">{t('common.reviewAndEdit')}</h3>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={handleCopy}
                                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                        title="Copy to clipboard"
                                    >
                                        <FiCopy size={20} />
                                    </button>
                                </div>
                            </div>
                            <textarea
                                value={generatedContent}
                                onChange={(e) => setGeneratedContent(e.target.value)}
                                className="flex-1 w-full p-8 bg-gray-50 border-2 border-transparent focus:border-blue-100 focus:bg-white rounded-3xl transition-all outline-none text-gray-700 leading-relaxed font-serif text-lg resize-none min-h-[400px]"
                            />
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {step === 'result' && (
                    <div className="p-6 border-t border-gray-100 bg-white rounded-b-3xl flex gap-4">
                        <Button
                            variant="outline"
                            onClick={() => setStep('input')}
                            className="flex-1 h-14 rounded-2xl font-bold"
                        >
                            {t('common.backToSettings')}
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleSave}
                            className="flex-1 h-14 rounded-2xl font-black"
                            icon={<FiCheck />}
                        >
                            {t('common.saveAndClose')}
                        </Button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default CoverLetterModal;
