import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (cvData, elementId = 'cv-preview') => {
    try {
        const element = document.getElementById(elementId);
        if (!element) {
            throw new Error('Preview element not found');
        }

        // Create canvas from the CV preview
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        const fileName = `${cvData.title || 'CV'}_${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(fileName);

        return { success: true, fileName };
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
