import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiCopy, FiTrash2, FiFileText } from 'react-icons/fi';
import { useCV } from '../contexts/CVContext';
import { ROUTES } from '../utils/constants';
import Button from '../components/Button';
import Modal from '../components/Modal';
import api from '../lib/api';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import ImportCVModal from '../components/ImportCVModal';
import { FiLock, FiUpload } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const DashboardPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { cvList, deleteCV, duplicateCV, loadCV, loading, createCV, setCurrentCV } = useCV();

    const { hasPurchased, isAuthenticated } = useAuth();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [cvToDelete, setCvToDelete] = useState(null);
    const [backendStatus, setBackendStatus] = useState('');
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);

    // Handle post-registration "Start Free" flow
    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const shouldStartFree = urlParams.get('start_free') === 'true';

        if (shouldStartFree && isAuthenticated && !loading) {
            // Clean up the URL to prevent re-triggering
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // Trigger automatic CV creation
            const startFreeFlow = async () => {
                try {
                    const newCV = await createCV('modern-1');
                    navigate(`${ROUTES.EDITOR}/${newCV.id}`);
                } catch (error) {
                    console.error('Auto-creation failed:', error);
                }
            };
            startFreeFlow();
        }
    }, [isAuthenticated, loading, createCV, navigate]);

    const testBackend = async () => {
        try {
            const response = await api.get('/test');
            setBackendStatus('Success: ' + response.data);
            toast.success('Backend Connected!');
        } catch (error) {
            console.error(error);
            setBackendStatus('Error: ' + error.message);
            toast.error('Backend Connection Failed');
        }
    };

    const handleCreateNew = () => {
        // Allow creating new CVs regardless of count; template selection will handle premium checks
        navigate(ROUTES.TEMPLATES);
    };

    const handleImportClick = () => {
        if (!hasPurchased) {
            toast.error('Importing an existing CV is a premium feature.');
            navigate(ROUTES.PRICING);
            return;
        }
        setIsImportModalOpen(true);
    };

    const handleImportSuccess = async (parsedData) => {
        try {
            // 1. Create a fresh CV to get an ID
            const newCV = await createCV('modern-1');
            
            // 2. Prepare the merged data
            const mergedCV = {
                ...newCV,
                title: parsedData.personalInfo?.fullName ? `${parsedData.personalInfo.fullName}'s CV` : 'Imported CV',
                personalInfo: { ...newCV.personalInfo, ...(parsedData.personalInfo || {}) },
                experience: parsedData.experience || [],
                education: parsedData.education || [],
                skills: parsedData.skills || [],
                languages: parsedData.languages || [],
            };

            // 3. Save directly to backend to avoid state race conditions
            await api.put(`/cvs/${newCV.id}`, mergedCV);
            
            // 4. Update the current CV context with the merged data so EditorPage sees it
            setCurrentCV(mergedCV);
            
            // 5. Navigate to Editor
            navigate(`${ROUTES.EDITOR}/${newCV.id}`);
            toast.success('CV Imported Successfully!');
            
        } catch (error) {
            console.error('Failed to apply imported data:', error);
            toast.error('Failed to apply imported data to the editor.');
        }
    };

    const handleEdit = (cvId) => {
        loadCV(cvId);
        navigate(`${ROUTES.EDITOR}/${cvId}`);
    };

    const handleDuplicate = async (cvId) => {
        // Allow duplication; editor/export will handle premium checks
        try {
            const duplicated = await duplicateCV(cvId);
            if (duplicated) {
                navigate(`${ROUTES.EDITOR}/${duplicated.id}`);
                toast.success('CV Duplicated!');
            }
        } catch (error) {
            console.error('Duplicate failed:', error);
            toast.error('Failed to duplicate CV');
        }
    };


    const handleDeleteClick = (cv) => {
        setCvToDelete(cv);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (cvToDelete) {
            try {
                await deleteCV(cvToDelete.id);
                setDeleteModalOpen(false);
                setCvToDelete(null);
                toast.success('CV Deleted');
            } catch (error) {
                console.error('Delete failed:', error);
                toast.error('Failed to delete CV');
            }
        }
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(i18n.language || 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const { i18n } = useTranslation();

    return (
        <div className="min-h-screen bg-off-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="w-full px-4 md:px-8 py-3 md:py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="mb-2 md:mb-0">
                            <h1 className="text-3xl font-black text-primary-900 tracking-tight">{t('dashboard.workspaceTitle')}</h1>
                            <p className="text-gray-400 font-medium">{t('dashboard.workspaceSubtitle')}</p>
                            {backendStatus && <p className="text-xs mt-1 font-mono text-blue-600">{backendStatus}</p>}
                        </div>
                        {import.meta.env.DEV && (
                            <Button onClick={testBackend} variant="outline" size="sm" className="mr-2">
                                Test Backend
                            </Button>
                        )}
                        <div className="flex gap-3">
                            <Button
                                variant={hasPurchased ? "secondary" : "outline"}
                                onClick={handleImportClick}
                                icon={hasPurchased ? <FiUpload /> : <FiLock className="text-gray-400" />}
                                className="shadow-sm"
                                title={t('common.importCV')}
                            >
                                {t('common.importCV')}
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleCreateNew}
                                icon={<FiPlus />}
                                className="shadow-sm"
                            >
                                {t('dashboard.newCV')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* CV List */}
            <div className="w-full px-4 md:px-8 py-4 md:py-6">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-800"></div>
                    </div>
                ) : cvList.length === 0 ? (
                    /* Empty State */
                    <div className="bg-white rounded-[2rem] p-6 md:p-10 text-center border border-gray-100 shadow-sm max-w-2xl mx-auto mt-6 md:mt-8">
                        <div className="text-5xl md:text-6xl mb-4 md:mb-6 grayscale">📄</div>
                        <h2 className="text-2xl font-black text-primary-900 mb-2 tracking-tight">{t('dashboard.emptyTitle')}</h2>
                        <p className="text-gray-400 mb-4 md:mb-6 max-w-sm mx-auto leading-relaxed">
                            {t('dashboard.emptySubtitle')}
                        </p>
                        <Button
                            variant="primary"
                            onClick={handleCreateNew}
                            icon={<FiPlus />}
                            className="rounded-full h-10 md:h-12 px-8 md:px-10 shadow-xl"
                        >
                            {t('dashboard.buildFirst')}
                        </Button>
                    </div>
                ) : (
                    /* CV Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {cvList.map((cv) => (
                            <div
                                key={cv.id}
                                className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-800 transition-all duration-500 overflow-hidden"
                            >
                                {/* CV Preview */}
                                <div
                                    className="aspect-[3/4.2] bg-gray-50 flex items-center justify-center cursor-pointer relative overflow-hidden"
                                    onClick={() => handleEdit(cv.id)}
                                >
                                    <div className="text-center p-8 z-10">
                                        <FiFileText size={64} className="mx-auto mb-4 text-gray-200 group-hover:text-primary-800 transition-colors duration-500" />
                                        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">{t('dashboard.editDesign')}</p>
                                    </div>

                                    {/* Subtle overlay */}
                                    <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/[0.02] transition-colors duration-500"></div>
                                </div>

                                {/* CV Info */}
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-primary-900 mb-1 truncate tracking-tight">
                                        {cv.title === 'Untitled CV' ? t('common.untitledCV') : cv.title}
                                    </h3>
                                    <p className="text-xs font-medium text-gray-400 mb-6 uppercase tracking-wider">
                                        {formatDate(cv.updatedAt)}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(cv.id)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-800 text-white rounded-xl hover:bg-primary-900 transition-all text-sm font-bold shadow-md"
                                            title={t('dashboard.open')}
                                        >
                                            <FiEdit2 size={16} />
                                            {t('dashboard.open')}
                                        </button>
                                        <button
                                            onClick={() => handleDuplicate(cv.id)}
                                            className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 hover:text-gray-600 transition-colors"
                                            title={t('dashboard.duplicate')}
                                        >
                                            <FiCopy size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(cv)}
                                            className="p-3 bg-red-50 text-red-300 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                            title={t('dashboard.delete')}
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title={t('dashboard.confirmDeleteTitle')}
                size="sm"
            >
                <div className="py-6">
                    <p className="text-gray-500 leading-relaxed mb-8">
                        {t('dashboard.confirmDeleteText', { title: cvToDelete?.title === 'Untitled CV' ? t('common.untitledCV') : cvToDelete?.title })}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            variant="danger"
                            onClick={confirmDelete}
                            fullWidth
                            className="order-1 sm:order-2"
                        >
                            {t('dashboard.delete')}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setDeleteModalOpen(false)}
                            fullWidth
                            className="order-2 sm:order-1"
                        >
                            {t('common.cancel')}
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Import CV Modal */}
            <ImportCVModal 
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onImportSuccess={handleImportSuccess}
            />
        </div>
    );
};

export default DashboardPage;
