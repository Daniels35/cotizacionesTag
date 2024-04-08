import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../assets/logo.png';

const PDFGenerator = ({ title, description, items }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const logoWidth = 120;
    const logoHeight = 60;

    // Principal Logo
    doc.addImage(logo, 'PNG', (pageWidth / 2) - (logoWidth / 2), 10, logoWidth, logoHeight);

    // Fecha y Ciudad
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('es-CO', options);
    doc.setFontSize(10);
    doc.text(`Medellín - Colombia, ${formattedDate}`, 20, logoHeight + 20);

    // Título
    doc.setTextColor("#ED6306");
    doc.setFontSize(20);
    doc.text(title, pageWidth / 2, logoHeight + 35, 'center');
    doc.setTextColor(0);

    // Texto antes de la tabla
    doc.setFontSize(12);
    doc.text("En atención a su solicitud, nos permitimos cotizar los siguientes servicios:", 20, logoHeight + 45);

    const formatNumber = (num) => num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    let totalPrice = 0;
    let totalTax = 0;
    const tableRows = items.map(item => {
      const price = parseFloat(item.price);
      const tax = price * 0.16;
      totalPrice += price;
      totalTax += tax;
      return [item.name, `$${formatNumber(price)}`, `$${formatNumber(tax)}`];
    });

    tableRows.push([
      { content: 'Subtotal', colSpan: 2 },
      `$${formatNumber(totalPrice)}`, 
      `$${formatNumber(totalTax)}`
    ]);
    const totalWithTax = totalPrice + totalTax;
    tableRows.push([
      { content: 'Total', colSpan: 2, styles: { fontStyle: 'bold'} },
      `$${formatNumber(totalWithTax)}`
    ]);

    doc.autoTable({
      head: [['Servicios', 'Precio', 'IVA 16%']],
      body: tableRows,
      startY: logoHeight + 55,
    });

    // Descripción sin bordes
    const descriptionStartY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.text(description, 20, descriptionStartY, { maxWidth: pageWidth - 40 });

    // Estimación del espacio que ocupa la descripción. 
    // Ajusta este valor según la longitud promedio y la altura estimada de tu descripción
    const estimatedDescriptionHeight = 20; 

    // Vigencia de la cotización (usando el espacio estimado después de la descripción)
    const validityStartY = descriptionStartY + estimatedDescriptionHeight;
    doc.text(`*Cotización valida por 15 días a partir día de envío (${formattedDate})`, 20, validityStartY + 20);

    // Estimación del espacio entre la vigencia de la cotización y el texto de entusiasmo
    const spaceAfterValidity = 20; // Ajusta este valor según necesites

    // Texto de entusiasmo en el medio del documento
    doc.setFontSize(14); // Tamaño de fuente más grande para el texto de entusiasmo
    doc.setFont(undefined, 'bold'); // Texto en negrita
    // Asegúrate de calcular la posición en Y correctamente para el texto de entusiasmo
    doc.text("¡Estamos emocionados de ser parte de su equipo!", pageWidth / 2, validityStartY + 20 + spaceAfterValidity, 'center');
    
    // Volver al estilo y tamaño de fuente normal para el texto siguiente
    doc.setFont(undefined, 'normal'); // Estilo de fuente normal
    doc.setFontSize(10); // Tamaño de fuente normal
    
    

// Información de contacto y logo en el pie
const footerY = pageHeight - 25;
doc.addImage(logo, 'PNG', 20, footerY - 25, 80, 40);

// Separar la información de contacto con espacios
const contactInfoYStart = footerY - 10; // Punto de inicio para la información de contacto
doc.text("Whatsapp: (+57) 320 935 3174", pageWidth - 80, contactInfoYStart);
doc.text("laura.montes@tagdigital.com", pageWidth - 80, contactInfoYStart + 6); // Espacio después de Whatsapp
doc.text("https://www.tagdigital.com.co", pageWidth - 80, contactInfoYStart + 12); // Espacio después de email

    
    // // Firmas
    // const finalY = pageHeight - 15;
    // doc.text("Firma Empresa: ____________________", 10, finalY);
    // doc.text(`Firma Cliente: ____________________`, pageWidth - 90, finalY);

    doc.save('cotizacion.pdf');
  };

  return <button onClick={generatePDF}>Generar PDF</button>;
};

export default PDFGenerator;
