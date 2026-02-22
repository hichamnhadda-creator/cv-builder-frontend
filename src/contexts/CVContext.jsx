import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, CV_SECTIONS } from '../utils/constants';
import { generateId, debounce } from '../utils/cvHelpers';

const CVContext = createContext(null);

// Default CV structure
const createDefaultCV = (templateId = 'modern-1') => ({
    id: generateId(),
    title: 'Untitled CV',
    templateId,
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        photo: null,
        linkedin: '',
        website: '',
        summary: '',
    },
    experience: [],
    education: [],
    diplomas: [],
    skills: [],
    languages: [],
    certifications: [],
    projects: [],
    customization: {
        colors: {
            primary: '#0ea5e9',
            secondary: '#64748b',
            text: '#1f2937',
            background: '#ffffff',
        },
        fonts: {
            heading: 'Poppins',
            body: 'Inter',
        },
        layout: 'standard',
        sectionOrder: Object.values(CV_SECTIONS),
        spacing: 1,
        fontSize: 14,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
});

export const CVProvider = ({ children }) => {
    const [currentCV, setCurrentCV] = useState(null);
    const [cvList, setCVList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Load CVs from localStorage on mount
    useEffect(() => {
        const storedCVList = localStorage.getItem('cv_list');
        if (storedCVList) {
            try {
                setCVList(JSON.parse(storedCVList));
            } catch (e) {
                console.error('Failed to parse cv_list', e);
                setCVList([]);
            }
        }

        const storedCurrentCV = localStorage.getItem(STORAGE_KEYS.CURRENT_CV);
        if (storedCurrentCV) {
            try {
                setCurrentCV(JSON.parse(storedCurrentCV));
            } catch (e) {
                console.error('Failed to parse current CV', e);
            }
        }
        setLoading(false);
    }, []);

    // Auto-save current CV to localStorage
    useEffect(() => {
        if (currentCV) {
            const debouncedSave = debounce(() => {
                localStorage.setItem(STORAGE_KEYS.CURRENT_CV, JSON.stringify(currentCV));
                setHasUnsavedChanges(false);
            }, 1000);

            debouncedSave();
        }
    }, [currentCV]);

    // Create new CV
    const createCV = (templateId) => {
        const newCV = createDefaultCV(templateId);
        setCurrentCV(newCV);
        setCVList([...cvList, newCV]);
        return newCV;
    };

    // Load existing CV
    const loadCV = (cvId) => {
        const cv = cvList.find((c) => c.id === cvId);
        if (cv) {
            setCurrentCV(cv);
        }
    };

    // Update current CV
    const updateCV = (updates) => {
        if (!currentCV) return;

        const updatedCV = {
            ...currentCV,
            ...updates,
            updatedAt: new Date().toISOString(),
        };

        setCurrentCV(updatedCV);
        setHasUnsavedChanges(true);

        // Update in CV list
        setCVList(cvList.map((cv) => (cv.id === updatedCV.id ? updatedCV : cv)));
    };

    // Update specific section
    const updateSection = (section, data) => {
        updateCV({ [section]: data });
    };

    // Update customization
    const updateCustomization = (customization) => {
        updateCV({
            customization: {
                ...currentCV.customization,
                ...customization,
            },
        });
    };

    // Delete CV
    const deleteCV = (cvId) => {
        setCVList(cvList.filter((cv) => cv.id !== cvId));
        if (currentCV?.id === cvId) {
            setCurrentCV(null);
            localStorage.removeItem(STORAGE_KEYS.CURRENT_CV);
        }
    };

    // Duplicate CV
    const duplicateCV = (cvId) => {
        const cv = cvList.find((c) => c.id === cvId);
        if (cv) {
            const duplicated = {
                ...cv,
                id: generateId(),
                title: `${cv.title} (Copy)`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            setCVList([...cvList, duplicated]);
            return duplicated;
        }
    };

    // Save CV (persist to localStorage and update list)
    const saveCV = () => {
        if (!currentCV) return;

        localStorage.setItem(STORAGE_KEYS.CURRENT_CV, JSON.stringify(currentCV));

        const updatedList = cvList.map((cv) =>
            cv.id === currentCV.id ? currentCV : cv
        );

        if (!cvList.find((cv) => cv.id === currentCV.id)) {
            updatedList.push(currentCV);
        }

        setCVList(updatedList);
        localStorage.setItem('cv_list', JSON.stringify(updatedList));
        setHasUnsavedChanges(false);
    };

    const value = {
        currentCV,
        cvList,
        loading,
        hasUnsavedChanges,
        createCV,
        loadCV,
        updateCV,
        updateSection,
        updateCustomization,
        deleteCV,
        duplicateCV,
        saveCV,
        setCurrentCV,
    };

    return <CVContext.Provider value={value}>{children}</CVContext.Provider>;
};

export const useCV = () => {
    const context = useContext(CVContext);
    if (!context) {
        throw new Error('useCV must be used within CVProvider');
    }
    return context;
};
