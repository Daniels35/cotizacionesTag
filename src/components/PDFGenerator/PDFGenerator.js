// PDFGenerator.jsx
import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../assets/logo.png';

import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';

const PDFGenerator = ({ title, description, items }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const logoWidth = 120;
    const logoHeight = 60;

    // Principal Logo
    doc.addImage(logo, 'PNG', (pageWidth / 2) - (logoWidth / 2), 10, logoWidth, logoHeight);

    // Generar página 1
    const page1 = <Page1 />;
    doc.addPage();
    doc.addPageContent(page1);
    

    // Página 2
    doc.addPage();
    doc.setFontSize(20);
    doc.text('Page 2', pageWidth / 2, logoHeight + 35, 'center');
  
    // Página 3
    doc.addPage();
    doc.setFontSize(20);
    doc.text('Page 3', pageWidth / 2, logoHeight + 35, 'center');
    // Guardar el PDF
    doc.save('cotizacion.pdf');
  };

  return <button onClick={generatePDF}>Generar PDF</button>;
};

export default PDFGenerator;