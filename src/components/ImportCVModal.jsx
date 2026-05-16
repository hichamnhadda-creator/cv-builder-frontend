import React, { useState, useRef } from 'react';
import { FiUploadCloud, FiX, FiFileText } from 'react-icons/fi';
import Modal from './Modal';
import Button from './Button';
import toast from 'react-hot-toast';
import api from '../lib/api';
import { useTranslation } from 'react-i18next';

const ImportCVModal = ({ isOpen, onClose, onImportSuccess }) => {
    const { t } = useTranslation();
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        validateAndSetFile(file);
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        validateAndSetFile(file);
    };

    const validateAndSetFile = (file) => {
        if (!file) return;
        
        const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type) && !file.name.endsWith('.pdf') && !file.name.endsWith('.docx')) {
            toast.error('Please upload a PDF or DOCX file.');
            return;
        }
        


        setSelectedFile(file);
    };

    const handleImport = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const loadingToast = toast.loading('Extracting AI text... This may take a few seconds.');
            
            const response = await api.post('/cvs/import', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.dismiss(loadingToast);

            if (response.data.success && response.data.data) {
                onImportSuccess(response.data.data);
                resetAndClose();
            } else {
                throw new Error('Failed to parse CV data');
            }
        } catch (error) {
            console.error('Import error:', error);
            const errorMsg = error.response?.data?.error || error.message || 'Failed to import CV';
            toast.error(errorMsg);
        } finally {
            setIsUploading(false);
        }
    };

    const resetAndClose = () => {
        setSelectedFile(null);
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={resetAndClose} title="Import Existing CV" size="md">
            <div className="py-4">
                <p className="text-gray-500 mb-6 text-sm">
                    Upload your old CV in PDF or DOCX format. Our AI will automatically extract your information and fill out your new template!
                </p>

                {!selectedFile ? (
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${
                            isDragging 
                                ? 'border-primary-600 bg-primary-50' 
                                : 'border-gray-300 hover:border-primary-500 hover:bg-gray-50'
                        }`}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            className="hidden"
                        />
                        <FiUploadCloud className={`mx-auto text-4xl mb-4 ${isDragging ? 'text-primary-600' : 'text-gray-400'}`} />
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Click to upload or drag & drop</h3>
                        <p className="text-sm text-gray-500">PDF or DOCX</p>
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                <FiFileText className="text-primary-600 text-xl" />
                            </div>
                            <div className="truncate">
                                <p className="text-sm font-bold text-gray-800 truncate">{selectedFile.name}</p>
                                <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFile(null);
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            disabled={isUploading}
                        >
                            <FiX />
                        </button>
                    </div>
                )}

                <div className="mt-8 flex justify-end gap-3">
                    <Button variant="ghost" onClick={resetAndClose} disabled={isUploading}>
                        {t('common.cancel')}
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleImport} 
                        disabled={!selectedFile || isUploading}
                        className="bg-primary-800 relative"
                    >
                        {isUploading ? (
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Processing...
                            </span>
                        ) : t('common.importCV')}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ImportCVModal;
