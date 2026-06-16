import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { STORAGE_KEYS, CV_SECTIONS } from '../utils/constants';
import { generateId, debounce } from '../utils/cvHelpers';
import api from '../lib/api';
import { supabase } from '../lib/supabase';


const safeSetLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.warn(`[CVContext] Failed to save to localStorage (${key}). Quota may be exceeded.`, e);
    }
};

const CVContext = createContext(null);

// Default CV structure
const createDefaultCV = (templateId = 'modern-1') => ({
    id: generateId(),
    title: 'Untitled CV',
    templateId,
    personalInfo: {
        fullName: 'Your Name',
        email: 'email@example.com',
        phone: '+1 234 567 890',
        address: 'City, Country',
        photo: null,
        linkedin: '',
        website: '',
        summary: 'Add a brief professional summary of your background, skills, and goals here.',
    },
    experience: [
        { id: generateId(), jobTitle: 'Position / Job Title', company: 'Company Name', location: 'Location', startDate: '2020', endDate: '2023', description: 'Add your first professional experience', current: false }
    ],
    education: [
        { id: generateId(), degree: 'Degree Name', institution: 'University / Institution', startDate: '2016', endDate: '2020', description: 'Add your education' }
    ],
    diplomas: [
        { id: generateId(), title: 'Diploma Name', institution: 'Institution Name', year: '2020' }
    ],
    skills: [
        'Skill 1', 'Skill 2', 'Skill 3'
    ],
    languages: [
        { id: generateId(), language: 'Language 1', level: 'native' },
        { id: generateId(), language: 'Language 2', level: 'fluent' }
    ],
    certifications: [
        { id: generateId(), name: 'Certification Name', issuer: 'Issuing Organization', year: '2023' }
    ],
    projects: [
        { id: generateId(), name: 'Project Name', description: 'Add your project description here.', link: '', technologies: 'Tech Stack' }
    ],
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

    // Sync CVs with backend on mount or auth change
    useEffect(() => {
        let isMounted = true;

        const fetchCVs = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error || !data?.session) {
                    if (isMounted) setLoading(false);
                    return;
                }

                if (isMounted) setLoading(true);
                const response = await api.get('/cvs');
                if (isMounted) {
                    setCVList(response.data);
                    // Also update localStorage for offline/fast access
                    safeSetLocalStorage('cv_list', JSON.stringify(response.data));
                }
            } catch (error) {
                console.error('[CVContext] Failed to fetch CVs from backend:', error);
                // Fallback to localStorage if backend fails
                const storedCVList = localStorage.getItem('cv_list');
                if (storedCVList && isMounted) {
                    try {
                        setCVList(JSON.parse(storedCVList));
                    } catch (e) {
                        console.error('Failed to parse cv_list', e);
                    }
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };


        fetchCVs();

        // Listen for auth changes to re-fetch
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setTimeout(() => {
                if (event === 'SIGNED_IN') {
                    fetchCVs();
                } else if (event === 'SIGNED_OUT') {
                    setCVList([]);
                    setCurrentCV(null);
                }
            }, 0);
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    // Auto-save current CV to backend (debounced)
    useEffect(() => {
        if (currentCV && hasUnsavedChanges) {
            const debouncedSave = debounce(async () => {
                try {
                    await api.put(`/cvs/${currentCV.id}`, currentCV);
                    safeSetLocalStorage(STORAGE_KEYS.CURRENT_CV, JSON.stringify(currentCV));
                    setHasUnsavedChanges(false);
                } catch (error) {
                    console.error('[CVContext] Auto-save failed:', error);
                }
            }, 2000);

            debouncedSave();
        }
    }, [currentCV, hasUnsavedChanges]);


    // Create new CV
    const createCV = useCallback(async (templateId) => {
        const newCV = createDefaultCV(templateId);
        
        try {
            const response = await api.post('/cvs', newCV);
            const savedCV = response.data;
            setCurrentCV(savedCV);
            setCVList(prev => [...prev, savedCV]);
            safeSetLocalStorage(STORAGE_KEYS.CURRENT_CV, JSON.stringify(savedCV));
            return savedCV;
        } catch (error) {
            console.error('[CVContext] Create CV failed:', error);
            // Fallback to local only if backend fails
            setCurrentCV(newCV);
            setCVList(prev => [...prev, newCV]);
            return newCV;
        }
    }, []);


    // Load existing CV
    const loadCV = (cvId) => {
        const cv = cvList.find((c) => c.id === cvId);
        if (cv) {
            setCurrentCV(cv);
        }
    };

    // Update current CV
    const updateCV = useCallback((updates) => {
        setCurrentCV(prev => {
            if (!prev) return prev;
            const updatedCV = {
                ...prev,
                ...updates,
                updatedAt: new Date().toISOString(),
            };
            
            // Update in CV list (delay list update slightly to prioritize editor responsiveness if needed, but for now do it together)
            setCVList(list => list.map((cv) => (cv.id === updatedCV.id ? updatedCV : cv)));
            return updatedCV;
        });
        setHasUnsavedChanges(true);
    }, []);

    // Update specific section
    const updateSection = useCallback((section, data) => {
        updateCV({ [section]: data });
    }, [updateCV]);

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
    const deleteCV = async (cvId) => {
        try {
            await api.delete(`/cvs/${cvId}`);
            setCVList(prev => prev.filter((cv) => cv.id !== cvId));
            if (currentCV?.id === cvId) {
                setCurrentCV(null);
                localStorage.removeItem(STORAGE_KEYS.CURRENT_CV);
            }
        } catch (error) {
            console.error('[CVContext] Delete CV failed:', error);
            // Even if backend fails, update UI for responsiveness? 
            // Better to show error.
            throw error;
        }
    };


    // Duplicate CV
    const duplicateCV = async (cvId) => {
        const cv = cvList.find((c) => c.id === cvId);
        if (cv) {
            const duplicated = {
                ...cv,
                id: generateId(),
                title: `${cv.title} (Copy)`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            
            try {
                const response = await api.post('/cvs', duplicated);
                const savedCV = response.data;
                setCVList(prev => [...prev, savedCV]);
                return savedCV;
            } catch (error) {
                console.error('[CVContext] Duplicate CV failed:', error);
                setCVList(prev => [...prev, duplicated]);
                return duplicated;
            }
        }
    };


    // Save CV (persist to localStorage and update list)
    const saveCV = async () => {
        if (!currentCV) return;

        try {
            await api.put(`/cvs/${currentCV.id}`, currentCV);
            
            safeSetLocalStorage(STORAGE_KEYS.CURRENT_CV, JSON.stringify(currentCV));

            const updatedList = cvList.map((cv) =>
                cv.id === currentCV.id ? currentCV : cv
            );

            if (!cvList.find((cv) => cv.id === currentCV.id)) {
                updatedList.push(currentCV);
            }

            setCVList(updatedList);
            safeSetLocalStorage('cv_list', JSON.stringify(updatedList));
            setHasUnsavedChanges(false);
        } catch (error) {
            console.error('[CVContext] Save CV failed:', error);
            throw error;
        }
    };


    const value = useMemo(() => ({
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
    }), [currentCV, cvList, loading, hasUnsavedChanges, createCV, updateCV, updateSection]);

    return <CVContext.Provider value={value}>{children}</CVContext.Provider>;
};

export const useCV = () => {
    const context = useContext(CVContext);
    if (!context) {
        throw new Error('useCV must be used within CVProvider');
    }
    return context;
};
