import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    FiMail, FiPlus, FiTrash2, FiEye, 
    FiCopy, FiEdit2, FiX, FiCheck, 
    FiChevronRight, FiAlertTriangle 
} from 'react-icons/fi';
import api from '../lib/api';
import toast from 'react-hot-toast';
import Button from '../components/Button';
import Modal from '../components/Modal';
import CoverLetterModal from '../components/CoverLetterModal';

const CoverLettersPage = () => {
    const { t } = useTranslation();
    const [coverLetters, setCoverLetters] = useState([]);
    const [cvs, setCvs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // CV Selection Modal State
    const [isSelectCvOpen, setIsSelectCvOpen] = useState(false);
    const [selectedCvId, setSelectedCvId] = useState('');
    
    // AI Generation Modal State
    const [isGenModalOpen, setIsGenModalOpen] = useState(false);
    const [selectedCvData, setSelectedCvData] = useState(null);

    // View/Edit Modal State
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [editingLetter, setEditingLetter] = useState(null);
    const [editedContent, setEditedContent] = useState('');
    const [editedTitle, setEditedTitle] = useState('');
    const [isSavingEdit, setIsSavingEdit] = useState(false);

    useEffect(() => {
        fetchCoverLetters();
        fetchCVs();
    }, []);

    const fetchCoverLetters = async () => {
        setLoading(false); // Default false if error
        try {
            setLoading(true);
            const res = await api.get('/cover-letters');
            if (res.data.success) {
                setCoverLetters(res.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch cover letters:', error);
            toast.error(t('errors.serverError', 'Erreur du serveur.'));
        } finally {
            setLoading(false);
        }
    };

    const fetchCVs = async () => {
        try {
            const res = await api.get('/cvs');
            setCvs(res.data || []);
        } catch (error) {
            console.error('Failed to fetch CVs:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm(t('dashboard.confirmDeleteTitle', 'Confirmer la suppression') + '?')) {
            return;
        }

        try {
            const res = await api.delete(`/cover-letters/${id}`);
            if (res.data.success) {
                toast.success(t('success.deleted', 'Supprimé avec succès'));
                setCoverLetters(prev => prev.filter(item => item.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete cover letter:', error);
            toast.error(t('errors.deleteFailed', 'Échec de la suppression'));
        }
    };

    const handleCopy = (content) => {
        navigator.clipboard.writeText(content);
        toast.success(t('success.copied', 'Copié dans le presse-papiers !'));
    };

    const handleNewLetterClick = () => {
        if (cvs.length === 0) {
            toast.error(t('dashboard.noCVs', "Vous n'avez pas encore créé de CV. Créez-en un d'abord !"));
            return;
        }
        
        // Pre-select first CV
        setSelectedCvId(cvs[0].id);
        setIsSelectCvOpen(true);
    };

    const handleSelectCvSubmit = () => {
        const chosenCv = cvs.find(c => c.id === selectedCvId);
        if (!chosenCv) {
            toast.error('Veuillez sélectionner un CV valide.');
            return;
        }
        
        setSelectedCvData(chosenCv);
        setIsSelectCvOpen(false);
        setIsGenModalOpen(true);
    };

    const handleOpenViewModal = (letter) => {
        setEditingLetter(letter);
        setEditedTitle(letter.title || `${letter.job_title} at ${letter.company}`);
        setEditedContent(letter.content || '');
        setIsViewModalOpen(true);
    };

    const handleSaveEdit = async () => {
        if (!editedContent.trim()) {
            toast.error(t('errors.required', 'Ce champ est requis'));
            return;
        }

        setIsSavingEdit(true);
        try {
            const res = await api.put(`/cover-letters/${editingLetter.id}`, {
                title: editedTitle,
                company: editingLetter.company,
                jobTitle: editingLetter.job_title,
                content: editedContent,
                language: editingLetter.language
            });

            if (res.data.success) {
                toast.success(t('success.saved', 'Enregistré avec succès'));
                setCoverLetters(prev => prev.map(item => item.id === editingLetter.id ? { ...item, title: editedTitle, content: editedContent } : item));
                setIsViewModalOpen(false);
            }
        } catch (error) {
            console.error('Failed to update cover letter:', error);
            toast.error(t('errors.saveFailed', 'Échec de la sauvegarde'));
        } finally {
            setIsSavingEdit(false);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const getLanguageLabel = (code) => {
        const mapping = {
            'en': 'EN',
            'fr': 'FR',
            'ar': 'AR',
            'it': 'IT',
            'es': 'ES',
            'pt': 'PT',
            'de': 'DE'
        };
        return mapping[code?.toLowerCase()] || code?.toUpperCase() || 'EN';
    };

    return (
        <div className="w-full max-w-7xl mx-auto space-y-8 pb-12 animate-fade-in">
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                        {t('coverLetters.title', 'Lettres de motivation')}
                    </h1>
                    <p className="text-gray-500 font-medium text-sm mt-1">
                        {t('coverLetters.subtitle', 'Gérez et créez vos lettres de motivation')}
                    </p>
                </div>
                <Button 
                    variant="primary" 
                    onClick={handleNewLetterClick}
                    className="h-12 px-6 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/25"
                    icon={<FiPlus />}
                >
                    {t('coverLetters.new', 'Nouvelle Lettre')}
                </Button>
            </div>

            {/* Content Area */}
            {loading ? (
                <div className="flex items-center justify-center py-24">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : coverLetters.length === 0 ? (
                /* Premium Empty State */
                <div className="bg-white rounded-3xl border border-gray-100 p-16 shadow-sm text-center max-w-2xl mx-auto">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <FiMail size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">
                        {t('coverLetters.emptyTitle', 'Aucune lettre trouvée')}
                    </h3>
                    <p className="text-gray-500 mb-8 leading-relaxed font-medium">
                        {t('coverLetters.emptyDesc', 'Créez une lettre de motivation pour accompagner votre CV et augmenter vos chances d\'être embauché.')}
                    </p>
                    <Button 
                        variant="primary" 
                        onClick={handleNewLetterClick}
                        className="h-14 px-8 rounded-2xl font-black shadow-lg shadow-blue-500/25"
                        icon={<FiPlus />}
                    >
                        {t('coverLetters.new', 'Nouvelle Lettre')}
                    </Button>
                </div>
            ) : (
                /* Grid list of cover letters */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coverLetters.map((letter) => (
                        <div 
                            key={letter.id} 
                            className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 flex flex-col justify-between group"
                        >
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-black uppercase rounded-lg tracking-wider">
                                        {getLanguageLabel(letter.language)}
                                    </span>
                                    <span className="text-[11px] text-gray-400 font-semibold">
                                        {formatDate(letter.created_at)}
                                    </span>
                                </div>
                                
                                <div>
                                    <h3 className="font-extrabold text-gray-900 text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
                                        {letter.title || `${letter.job_title} chez ${letter.company}`}
                                    </h3>
                                    <p className="text-gray-400 font-bold text-xs mt-0.5 uppercase tracking-wide">
                                        {letter.company} &bull; {letter.job_title}
                                    </p>
                                </div>

                                <p className="text-gray-500 text-sm font-medium line-clamp-4 leading-relaxed font-serif bg-gray-50 p-4 rounded-2xl">
                                    {letter.content}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-50">
                                <button 
                                    onClick={() => handleOpenViewModal(letter)}
                                    className="flex-1 py-3 bg-gray-50 hover:bg-blue-55 hover:bg-blue-50 hover:text-blue-600 text-gray-600 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all outline-none"
                                >
                                    <FiEye size={14} />
                                    {t('common.preview', 'Aperçu')}
                                </button>
                                <button 
                                    onClick={() => handleCopy(letter.content)}
                                    className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-700 rounded-xl transition-all"
                                    title={t('success.copied', 'Copier')}
                                >
                                    <FiCopy size={14} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(letter.id)}
                                    className="p-3 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-xl transition-all"
                                    title={t('common.delete', 'Supprimer')}
                                >
                                    <FiTrash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal 1: Select CV for Generation */}
            <Modal
                isOpen={isSelectCvOpen}
                onClose={() => setIsSelectCvOpen(false)}
                title={t('coverLetters.new', 'Nouvelle Lettre')}
                size="md"
            >
                <div className="space-y-6 p-2">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FiPlus size={28} />
                        </div>
                        <p className="text-gray-500 text-sm font-medium">
                            Sélectionnez le CV sur lequel baser votre lettre de motivation. Notre IA utilisera vos expériences et compétences.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Choisir un CV</label>
                        <select
                            value={selectedCvId}
                            onChange={(e) => setSelectedCvId(e.target.value)}
                            className="w-full h-14 px-5 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl transition-all outline-none text-gray-900 font-extrabold"
                        >
                            {cvs.map(cv => (
                                <option key={cv.id} value={cv.id}>
                                    {cv.title || t('common.untitledCV', 'CV sans titre')}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button 
                            variant="outline" 
                            onClick={() => setIsSelectCvOpen(false)}
                            className="flex-1 h-14 rounded-2xl font-bold"
                        >
                            {t('common.cancel', 'Annuler')}
                        </Button>
                        <Button 
                            variant="primary" 
                            onClick={handleSelectCvSubmit}
                            className="flex-1 h-14 rounded-2xl font-black shadow-lg shadow-blue-500/25"
                        >
                            {t('common.next', 'Continuer')}
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Modal 2: Cover Letter Generator Modal */}
            {selectedCvData && (
                <CoverLetterModal
                    isOpen={isGenModalOpen}
                    onClose={() => {
                        setIsGenModalOpen(false);
                        setSelectedCvData(null);
                    }}
                    cvData={selectedCvData}
                    cvId={selectedCvId}
                    onSaveSuccess={fetchCoverLetters}
                />
            )}

            {/* Modal 3: View & Edit Cover Letter */}
            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title={null}
                size="xl"
            >
                <div className="flex flex-col h-full max-h-[90vh] p-2">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                <FiMail size={20} />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    className="text-lg font-black text-gray-900 border-b border-transparent hover:border-gray-200 focus:border-blue-500 focus:bg-white outline-none rounded px-2 py-0.5 transition-all"
                                />
                                <p className="text-xs text-gray-400 font-bold ml-2 uppercase">
                                    {editingLetter?.company} &bull; {editingLetter?.job_title}
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsViewModalOpen(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <FiX size={24} />
                        </button>
                    </div>

                    {/* Content Textarea */}
                    <div className="flex-1 min-h-[350px] flex flex-col mb-6">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Contenu de la lettre</label>
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="flex-1 w-full p-6 bg-gray-50 border-2 border-transparent focus:border-blue-100 focus:bg-white rounded-2xl outline-none text-gray-700 leading-relaxed font-serif text-md resize-none shadow-inner"
                        />
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            onClick={() => handleCopy(editedContent)}
                            className="h-14 rounded-2xl font-bold flex items-center gap-2"
                            icon={<FiCopy />}
                        >
                            {t('success.copied', 'Copier')}
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleSaveEdit}
                            loading={isSavingEdit}
                            className="flex-1 h-14 rounded-2xl font-black shadow-lg shadow-blue-500/25 flex items-center gap-2"
                            icon={<FiCheck />}
                        >
                            {t('common.save', 'Enregistrer')}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CoverLettersPage;
