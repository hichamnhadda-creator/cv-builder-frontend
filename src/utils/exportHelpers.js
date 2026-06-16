import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (cvData, elementId = 'cv-preview-container', options = {}) => {
    const { triggerDownload = true } = options;
    try {
        const element = document.getElementById(elementId);
        if (!element) throw new Error('Preview element not found');

        // 1. Wait for all fonts to be fully loaded before capturing
        if (document.fonts && document.fonts.ready) {
            await document.fonts.ready;
        }

        // Wait for all images inside the element to fully decode
        const images = Array.from(element.querySelectorAll('img'));
        await Promise.all(images.map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve; // Continue even if an image fails
            });
        }));

        // Double requestAnimationFrame to ensure all React state and CSS paints are finalized
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

        // 2. Configure html2canvas for high quality and unbounded height
        // Target is now guaranteed to be the unscaled inner wrapper #cv-export-container
        const canvas = await html2canvas(element, {
            scale: 2, // Stable high resolution for crisp text
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            scrollX: 0,
            scrollY: 0,
            width: 794, // Lock exact A4 pixel width
            windowWidth: 794, // Force media queries to evaluate at A4 width
            allowTaint: true,
            onclone: (clonedDoc) => {
                const clonedEl = clonedDoc.getElementById(elementId);
                if (clonedEl) {
                    clonedEl.style.height = 'auto';
                    clonedEl.style.overflow = 'visible';
                    clonedEl.classList.add('exporting-pdf');
                    
                    // Reset scroll position on any scrollable containers inside
                    const scrollContainer = clonedEl.querySelector('.custom-scrollbar');
                    if (scrollContainer) {
                        scrollContainer.scrollTop = 0;
                        scrollContainer.style.overflow = 'visible';
                        scrollContainer.style.height = 'auto';
                    }
                }
            }
        });

        if (!canvas || canvas.width === 0 || canvas.height === 0) {
            throw new Error('Canvas capture failed or resulted in empty output');
        }

        const imgData = canvas.toDataURL('image/png', 1.0);
        
        // A4 format dimensions in mm
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Total height of the captured DOM in mm

        let heightLeft = imgHeight;
        let position = 0;

        // Fits on a single page
        if (heightLeft <= pageHeight) {
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
        } else {
            // Auto-pagination logic: Split canvas into multiple pages if it overflows A4 height
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight; // Shift image UP for the next page
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
                heightLeft -= pageHeight;
            }
        }

        const fileName = `${cvData.title || 'CV'}_${new Date().toISOString().split('T')[0]}.pdf`;
        if (triggerDownload) {
            pdf.save(fileName);
        }

        return { success: true, fileName, pdf };
    } catch (error) {
        console.error('Error exporting to PDF:', error);
        return { success: false, error: error.message };
    }
};

export const exportToJSON = (cvData) => {
    try {
        const dataStr = JSON.stringify(cvData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${cvData.title || 'CV'}_${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        URL.revokeObjectURL(url);

        return { success: true };
    } catch (error) {
        console.error('Error exporting to JSON:', error);
        return { success: false, error: error.message };
    }
};
