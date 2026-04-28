import React, { useState, useEffect, useRef } from 'react';
import { TemplateRenderer } from './TemplateMapper';
import placeholderAvatar from '../assets/images/placeholder-avatar.png';

const TemplateThumbnail = ({ templateId }) => {
    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);
    
    // Mock data for the preview
    const mockData = {
        personalInfo: {
            fullName: 'John Doe',
            title: 'Senior Developer',
            email: 'john@example.com',
            phone: '+1 234 567 890',
            location: 'New York, USA',
            photo: placeholderAvatar,
            summary: 'Experienced professional with a proven track record. Passionate about creating efficient solutions combining design and code.'
        },
        experience: [
            {
                id: '1',
                jobTitle: 'Senior Developer',
                company: 'Tech Corp',
                location: 'San Francisco',
                startDate: '2020',
                endDate: 'Present',
                current: true,
                description: 'Led development of key features, managing a team of 4 engineers and increasing conversion rates by 25%.'
            },
            {
                id: '2',
                jobTitle: 'Frontend Engineer',
                company: 'Creative Agency',
                location: 'Austin',
                startDate: '2017',
                endDate: '2020',
                description: 'Developed responsive web applications for various clients.'
            }
        ],
        education: [
            {
                id: '1',
                degree: 'BSc Computer Science',
                institution: 'University of Tech',
                startDate: '2015',
                endDate: '2019'
            }
        ],
        skills: ['React', 'Node.js', 'UI/UX', 'TypeScript'],
        languages: [{ id: '1', language: 'English', level: 'Native' }, { id: '2', language: 'Spanish', level: 'Intermediate' }],
        projects: [
            {
                id: '1',
                name: 'CV Builder Web App',
                description: 'A full-stack application built with React and Node.js for creating professional resumes.',
                link: 'https://github.com/example/cv-builder'
            }
        ],
        certifications: [
            {
                id: '1',
                name: 'AWS Certified Solutions Architect',
                issuer: 'Amazon Web Services',
                year: '2022'
            }
        ],
    // Per-template distinct color schemes so previews look different
    const templateCustomizations = {
        // Modern / Classic — cool blue
        'modern-1': { colors: { primary: '#2563eb', secondary: '#1e293b' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'modern-2': { colors: { primary: '#0891b2', secondary: '#164e63' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'modern-3': { colors: { primary: '#4f46e5', secondary: '#1e1b4b' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'modern-4': { colors: { primary: '#0ea5e9', secondary: '#0c4a6e' }, fonts: { heading: 'Inter', body: 'Inter' } },
        'modern-5': { colors: { primary: '#06b6d4', secondary: '#164e63' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'modern-6': { colors: { primary: '#3b82f6', secondary: '#1e3a5f' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'modern-7': { colors: { primary: '#6366f1', secondary: '#312e81' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        // Professional / Sidebar — purples & teals
        'professional-1': { colors: { primary: '#7c3aed', secondary: '#1e1b4b' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'professional-2': { colors: { primary: '#0d9488', secondary: '#134e4a' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'professional-3': { colors: { primary: '#dc2626', secondary: '#1f2937' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'professional-4': { colors: { primary: '#2563eb', secondary: '#1e3a5f' }, fonts: { heading: 'Inter', body: 'Inter' } },
        'professional-5': { colors: { primary: '#7c3aed', secondary: '#2e1065' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'professional-6': { colors: { primary: '#0891b2', secondary: '#0c4a6e' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'professional-7': { colors: { primary: '#059669', secondary: '#064e3b' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        // Creative / Card — greens & oranges
        'creative-1': { colors: { primary: '#059669', secondary: '#064e3b' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'creative-2': { colors: { primary: '#d97706', secondary: '#451a03' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'creative-3': { colors: { primary: '#e11d48', secondary: '#4c0519' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'creative-4': { colors: { primary: '#7c3aed', secondary: '#1e1b4b' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'creative-5': { colors: { primary: '#0891b2', secondary: '#0c4a6e' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'creative-6': { colors: { primary: '#dc2626', secondary: '#1f2937' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'creative-7': { colors: { primary: '#059669', secondary: '#1f2937' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        // Minimal — almost no color, very clean
        'minimal-1': { colors: { primary: '#111827', secondary: '#6b7280' }, fonts: { heading: 'Georgia, serif', body: 'Georgia, serif' } },
        'minimal-2': { colors: { primary: '#374151', secondary: '#9ca3af' }, fonts: { heading: 'Georgia, serif', body: 'Inter' } },
        'minimal-3': { colors: { primary: '#1d4ed8', secondary: '#374151' }, fonts: { heading: 'Inter', body: 'Inter' } },
        'minimal-4': { colors: { primary: '#374151', secondary: '#6b7280' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'minimal-5': { colors: { primary: '#059669', secondary: '#374151' }, fonts: { heading: 'Georgia, serif', body: 'Inter' } },
        'minimal-6': { colors: { primary: '#7c3aed', secondary: '#374151' }, fonts: { heading: 'Georgia, serif', body: 'Inter' } },
        'minimal-7': { colors: { primary: '#dc2626', secondary: '#374151' }, fonts: { heading: 'Georgia, serif', body: 'Inter' } },
        // Dark / Creative — gold/amber on dark
        'dark-1': { colors: { primary: '#f59e0b', secondary: '#0f172a' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'dark-2': { colors: { primary: '#34d399', secondary: '#0f172a' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'dark-3': { colors: { primary: '#f472b6', secondary: '#0f172a' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'dark-4': { colors: { primary: '#60a5fa', secondary: '#0f172a' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'dark-5': { colors: { primary: '#a78bfa', secondary: '#0f172a' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'dark-6': { colors: { primary: '#fb923c', secondary: '#0f172a' }, fonts: { heading: 'Poppins', body: 'Inter' } },
        'dark-7': { colors: { primary: '#4ade80', secondary: '#0f172a' }, fonts: { heading: 'Poppins', body: 'Inter' } },
    };

    const customization = templateCustomizations[templateId] || {
        colors: { primary: '#0ea5e9', secondary: '#64748b' },
        fonts: { heading: 'Poppins', body: 'Inter' }
    };


    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const targetWidth = 800; // Target width (Standard A4 is ~794px but 800px is safe)
                setScale(containerWidth / targetWidth);
            }
        };

        updateScale();
        // Use a small timeout to ensure DOM is ready
        setTimeout(updateScale, 100);
        
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    // Provide a small wrapper to force A4 aspect ratio rendering
    return (
        <div ref={containerRef} className="w-full h-full overflow-hidden bg-white relative flex items-start justify-start">
            <div
                className="absolute top-0 left-0 origin-top-left flex flex-col items-stretch"
                style={{
                    transform: `scale(${scale})`,
                    width: '800px',
                    height: '1131.4px'
                }}
            >
                <div className="flex-1 flex flex-col min-h-0 relative bg-white">
                    <TemplateRenderer templateId={templateId} data={mockData} customization={customization} />
                </div>
            </div>
        </div>
    );
};

export default TemplateThumbnail;
