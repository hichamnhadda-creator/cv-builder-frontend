import React, { useState, useEffect, useRef } from 'react';
import ModernTemplate from './cv-templates/ModernTemplate';
import ClassicTemplate from './cv-templates/ClassicTemplate';
import CreativeTemplate from './cv-templates/CreativeTemplate';
import MinimalTemplate from './cv-templates/MinimalTemplate';

const TemplateThumbnail = ({ templateId }) => {
    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);
    // Mock data for the preview
    const mockData = {
        personalInfo: {
            fullName: 'John Doe',
            title: 'Software Engineer',
            email: 'john@example.com',
            phone: '+1 234 567 890',
            location: 'New York, USA',
            summary: 'Experienced professional with a proven track record. Passionate about creating efficient solutions.'
        },
        experience: [
            {
                id: '1',
                position: 'Senior Developer',
                company: 'Tech Corp',
                startDate: '2020',
                endDate: 'Present',
                description: 'Led development of key features.'
            }
        ],
        education: [
            {
                id: '1',
                degree: 'BSc Computer Science',
                school: 'University of Tech',
                year: '2019'
            }
        ],
        skills: [{ id: '1', name: 'React', level: 5 }, { id: '2', name: 'Node.js', level: 4 }],
        languages: [{ id: '1', language: 'English', level: 'Native' }],
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
                // A4 width in px at 96 DPI is usually around 794px, 
                // but let's use a standard target width for our template rendering
                const targetWidth = 800;
                setScale(containerWidth / targetWidth);
            }
        };

        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    let Component;
    switch (true) {
        case templateId.includes('modern'): Component = ModernTemplate; break;
        case templateId.includes('classic'): Component = ClassicTemplate; break;
        case templateId.includes('creative'): Component = CreativeTemplate; break;
        case templateId.includes('minimal'): Component = MinimalTemplate; break;
        default: Component = ModernTemplate;
    }

    return (
        <div ref={containerRef} className="w-full h-full overflow-hidden bg-white relative flex items-start justify-start">
            <div
                className="absolute top-0 left-0 w-[800px] h-[1131.4px] origin-top-left flex flex-col items-stretch"
                style={{
                    transform: `scale(${scale})`,
                    width: '800px',
                    height: '1131.4px'
                }}
            >
                {/* Wrap component in a flex-1 container to ensure it fills the 1131.4px height */}
                <div className="flex-1 flex flex-col min-h-0">
                    {Component ? (
                        <Component data={mockData} customization={mockData.customization} />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                            Preview Unavailable
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TemplateThumbnail;
