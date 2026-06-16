import React, { useState, useEffect, useRef } from 'react';
import { TemplateRenderer } from '../TemplateMapper';

const CVPreview = ({ cvData }) => {
    const containerRef = useRef(null);
    const exportContainerRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [actualHeight, setActualHeight] = useState(1123);

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth;
                const targetWidth = 794; // 210mm at 96dpi
                setScale(containerWidth / targetWidth);
            }
        };

        const updateHeight = () => {
            if (exportContainerRef.current) {
                setActualHeight(exportContainerRef.current.offsetHeight);
            }
        };

        updateScale();
        
        const resizeObserver = new ResizeObserver(() => {
            updateScale();
        });
        
        const heightObserver = new ResizeObserver(() => {
            updateHeight();
        });

        if (containerRef.current) resizeObserver.observe(containerRef.current);
        
        // Wait a tick for the element to render
        setTimeout(() => {
            if (exportContainerRef.current) {
                updateHeight();
                heightObserver.observe(exportContainerRef.current);
            }
        }, 100);
        
        window.addEventListener('resize', updateScale);
        return () => {
            window.removeEventListener('resize', updateScale);
            resizeObserver.disconnect();
            heightObserver.disconnect();
        };
    }, []);

    if (!cvData) return null;

    const getPreviewData = (data) => {
        const previewData = { ...data };
        
        // Inject placeholders for empty arrays so templates don't hide the section
        if (!previewData.experience?.length) {
            previewData.experience = [
                { id: 'dummy-exp', jobTitle: 'Position / Job Title', company: 'Company Name', location: 'Location', startDate: 'YYYY', endDate: 'YYYY', description: 'Add your first professional experience', current: false }
            ];
        }
        
        if (!previewData.education?.length) {
            previewData.education = [
                { id: 'dummy-edu', degree: 'Degree Name', institution: 'University / Institution', startDate: 'YYYY', endDate: 'YYYY', description: 'Add your education' }
            ];
        }

        if (!previewData.diplomas?.length) {
            previewData.diplomas = [
                { id: 'dummy-dip', title: 'Diploma Name', institution: 'Institution Name', year: 'YYYY' }
            ];
        }
        
        if (!previewData.skills?.length) {
            previewData.skills = [
                'Add your skills'
            ];
        }
        
        if (!previewData.languages?.length) {
            previewData.languages = [
                { id: 'dummy-lang-1', language: 'Add your languages', level: 'native' }
            ];
        }
        
        if (!previewData.certifications?.length) {
            previewData.certifications = [
                { id: 'dummy-cert', name: 'Certification Name', issuer: 'Issuing Organization', year: 'YYYY' }
            ];
        }
        
        if (!previewData.projects?.length) {
            previewData.projects = [
                { id: 'dummy-proj', name: 'Project Name', description: 'Add your project description here.', link: '', technologies: 'Tech Stack' }
            ];
        }

        return previewData;
    };

    const A4_HEIGHT = 1123;
    const A4_WIDTH = 794;
    
    const previewData = getPreviewData(cvData);

    return (
        <div ref={containerRef} className="w-full h-full bg-slate-200/30 flex flex-col items-center overflow-x-hidden overflow-y-auto custom-scrollbar">
            {/* 
                Reservation Container: 
                Reserves exactly the SCALED height in the DOM so there's no empty scrollable space.
            */}
            <div 
                style={{ 
                    width: `${A4_WIDTH * scale}px`,
                    height: `${actualHeight * scale}px`,
                    position: 'relative',
                    flexShrink: 0,
                    marginTop: '20px',
                    marginBottom: '0' // Removed bottom margin as requested
                }}
            >
                {/* 
                    Outer Wrapper: 
                    Strictly calculated dimensions based on scale to eliminate ALL side gaps.
                    Applies the scale transform HERE so the inner export target is pure.
                */}
                <div 
                    style={{ 
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        width: `${A4_WIDTH}px`,
                        minHeight: `${A4_HEIGHT}px`,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        margin: 0,
                        padding: 0
                    }}
                >
                    {/* 
                        Pure Unscaled Export Target:
                        This element has NO transform, making it perfect for html2canvas.
                    */}
                    <div 
                        id="cv-export-container"
                        ref={exportContainerRef}
                        className="bg-white shadow-none cv-template-wrapper flex flex-col"
                        style={{ 
                            width: `${A4_WIDTH}px`,
                            minHeight: `${A4_HEIGHT}px` 
                        }}
                    >
                        <TemplateRenderer
                            templateId={previewData.templateId || 'modern-1'}
                            data={previewData}
                            customization={previewData.customization}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CVPreview;
