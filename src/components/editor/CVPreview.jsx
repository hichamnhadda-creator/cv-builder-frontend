import React, { useState, useEffect, useRef } from 'react';
import { TemplateRenderer } from '../TemplateMapper';

const CVPreview = ({ cvData }) => {
    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth;
                const targetWidth = 794; // 210mm at 96dpi
                setScale(containerWidth / targetWidth);
            }
        };

        updateScale();
        const resizeObserver = new ResizeObserver(updateScale);
        if (containerRef.current) resizeObserver.observe(containerRef.current);
        
        window.addEventListener('resize', updateScale);
        return () => {
            window.removeEventListener('resize', updateScale);
            resizeObserver.disconnect();
        };
    }, []);

    if (!cvData) return null;

    const A4_HEIGHT = 1123;
    const A4_WIDTH = 794;

    return (
        <div ref={containerRef} className="w-full h-full bg-slate-200/30 flex flex-col items-center overflow-x-hidden overflow-y-auto custom-scrollbar">
            {/* 
                Outer Wrapper: 
                Strictly calculated dimensions based on scale to eliminate ALL side gaps.
            */}
            <div 
                style={{ 
                    width: `${A4_WIDTH * scale}px`,
                    height: `${A4_HEIGHT * scale}px`,
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'center',
                    flexShrink: 0,
                    margin: 0,
                    padding: 0
                }}
            >
                {/* 
                    Inner Scaled Element:
                    No margin, no extra spacing.
                */}
                <div 
                    style={{ 
                        transform: `scale(${scale})`,
                        transformOrigin: 'top center',
                        width: `${A4_WIDTH}px`,
                        height: `${A4_HEIGHT}px`,
                        flexShrink: 0
                    }}
                    className="bg-white shadow-none cv-template-wrapper"
                >
                    <TemplateRenderer
                        templateId={cvData.templateId || 'modern-1'}
                        data={cvData}
                        customization={cvData.customization}
                    />
                </div>
            </div>
        </div>
    );
};

export default CVPreview;
