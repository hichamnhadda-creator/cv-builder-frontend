import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiCopy, FiTrash2, FiFileText } from 'react-icons/fi';
import { useCV } from '../contexts/CVContext';
import { ROUTES } from '../utils/constants';
import Button from '../components/Button';
import Modal from '../components/Modal';
import api from '../lib/api';
import toast from 'react-hot-toast';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { cvList, deleteCV, duplicateCV, loadCV } = useCV();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [cvToDelete, setCvToDelete] = useState(null);
    const [backendStatus, setBackendStatus] = useState('');

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
        navigate(ROUTES.TEMPLATES);
    };

    const handleEdit = (cvId) => {
        loadCV(cvId);
        navigate(`${ROUTES.EDITOR}/${cvId}`);
    };

    const handleDuplicate = (cvId) => {
        const duplicated = duplicateCV(cvId);
        if (duplicated) {
            navigate(`${ROUTES.EDITOR}/${duplicated.id}`);
        }
    };

    const handleDeleteClick = (cv) => {
        setCvToDelete(cv);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (cvToDelete) {
            deleteCV(cvToDelete.id);
            setDeleteModalOpen(false);
            setCvToDelete(null);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-off-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="mb-2 md:mb-0">
                            <h1 className="text-3xl font-black text-primary-900 tracking-tight">My Workspace</h1>
                            <p className="text-gray-400 font-medium">Create and refine your professional path</p>
                            {backendStatus && <p className="text-xs mt-1 font-mono text-blue-600">{backendStatus}</p>}
                        </div>
                        <Button onClick={testBackend} variant="outline" size="sm" className="mr-2">
                            Test Backend
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleCreateNew}
                            icon={<FiPlus />}
                            className="h-10 px-8 rounded-full shadow-lg"
                        >
                            New CV
                        </Button>
                    </div>
                </div>
            </div>

            {/* CV List */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
                {cvList.length === 0 ? (
                    /* Empty State */
                    <div className="bg-white rounded-[2rem] p-6 md:p-10 text-center border border-gray-100 shadow-sm max-w-2xl mx-auto mt-6 md:mt-8">
                        <div className="text-5xl md:text-6xl mb-4 md:mb-6 grayscale">📄</div>
                        <h2 className="text-2xl font-black text-primary-900 mb-2 tracking-tight">No CVs Yet</h2>
                        <p className="text-gray-400 mb-4 md:mb-6 max-w-sm mx-auto leading-relaxed">
                            Your journey begins here. Choose a professional template and start building.
                        </p>
                        <Button
                            variant="primary"
                            onClick={handleCreateNew}
                            icon={<FiPlus />}
                            className="rounded-full h-10 md:h-12 px-8 md:px-10 shadow-xl"
                        >
                            Build Your First CV
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
                                        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">Edit Design</p>
                                    </div>

                                    {/* Subtle overlay */}
                                    <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/[0.02] transition-colors duration-500"></div>
                                </div>

                                {/* CV Info */}
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-primary-900 mb-1 truncate tracking-tight">
                                        {cv.title || 'Untitled CV'}
                                    </h3>
                                    <p className="text-xs font-medium text-gray-400 mb-6 uppercase tracking-wider">
                                        {formatDate(cv.updatedAt)}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(cv.id)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-800 text-white rounded-xl hover:bg-primary-900 transition-all text-sm font-bold shadow-md"
                                            title="Edit CV"
                                        >
                                            <FiEdit2 size={16} />
                                            Open
                                        </button>
                                        <button
                                            onClick={() => handleDuplicate(cv.id)}
                                            className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 hover:text-gray-600 transition-colors"
                                            title="Duplicate CV"
                                        >
                                            <FiCopy size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(cv)}
                                            className="p-3 bg-red-50 text-red-300 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                            title="Delete CV"
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
                title="Confirm Removal"
                size="sm"
            >
                <div className="py-6">
                    <p className="text-gray-500 leading-relaxed mb-8">
                        Are you sure you want to remove <strong>"{cvToDelete?.title}"</strong>?
                        This action will permanently delete your work.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            variant="danger"
                            onClick={confirmDelete}
                            fullWidth
                            className="order-1 sm:order-2"
                        >
                            Yes, delete it
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setDeleteModalOpen(false)}
                            fullWidth
                            className="order-2 sm:order-1"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DashboardPage;
