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
        customization: {
            colors: { primary: '#0ea5e9', secondary: '#64748b', text: '#1f2937', background: '#ffffff' },
            fonts: { heading: 'Poppins', body: 'Inter' }
        }
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
                    <TemplateRenderer templateId={templateId} data={mockData} customization={mockData.customization} />
                </div>
            </div>
        </div>
    );
};

export default TemplateThumbnail;
