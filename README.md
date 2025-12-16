# 📄 Cotizaciones Tag (React App)

**Generador de propuestas comerciales y cotizaciones en PDF.**

Este proyecto es una aplicación web desarrollada en **React** diseñada para agilizar el proceso de ventas. Permite a los usuarios ingresar datos de clientes y servicios en un formulario interactivo y, mediante el uso de librerías de renderizado, compilar esa información en un documento PDF multipágina con diseño corporativo, listo para descargar o enviar.

## 📋 Características Principales

### ⚛️ Arquitectura Frontend (React)
* **Componentización Modular:** La interfaz está dividida en componentes reutilizables (`Header`, `QuoteForm`, `Modal`) para facilitar el mantenimiento y la escalabilidad del código.
* **Enrutamiento SPA:** Utiliza `react-router-dom` para gestionar la navegación fluida entre la página de inicio (generador) y el panel de administración, sin recargas de página.

### 🖨️ Generación de Documentos (PDF)
* **Motor jsPDF:** Integra la librería `jspdf` para la creación programática de documentos PDF directamente en el cliente (navegador), garantizando privacidad y rapidez.
* **Plantillas Multipágina:** El generador no solo crea una tabla simple; está estructurado para ensamblar documentos complejos con portada, contenido y tablas de precios, definidos en componentes separados (`page1.jsx`, `page2.jsx`, `page3.jsx`).

### 🛠️ Gestión de Datos
* **Formularios Dinámicos:** Captura información detallada del cliente y los ítems a cotizar a través de una interfaz de usuario intuitiva (`QuoteForm`), gestionando el estado de la aplicación para pasar estos datos al generador de PDF.
* **Panel de Administración:** Incluye una ruta `/admin` preparada para futuras integraciones de gestión de usuarios o historial de cotizaciones.

## 📂 Estructura del Proyecto

* `src/App.js`: Configuración principal de rutas y renderizado base.
* `src/components/`:
    * `QuoteForm/`: Lógica del formulario de entrada de datos.
    * `PDFGenerator/`: El núcleo de la app. Contiene el script de generación (`PDFGenerator.js`) y las plantillas visuales de cada página del PDF.
    * `Modal/`: Componentes de interfaz auxiliar.
* `src/pages/`: Vistas principales (`Home`, `Admin`).

## 🚀 Instalación y Ejecución

Este proyecto utiliza `npm` como gestor de paquetes.

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```
2.  **Iniciar servidor de desarrollo:**
    ```bash
    npm start
    ```
    La aplicación se abrirá en `http://localhost:3000`.

3.  **Construir para producción:**
    ```bash
    npm run build
    ```

## ⚙️ Configuración (Hardcoded)

El diseño y contenido estático de las cotizaciones (logos, textos legales, pie de página) están definidos directamente dentro de los componentes de plantilla JSX.

**Para modificar el diseño del PDF:**
Edita los archivos en `src/components/PDFGenerator/`. Por ejemplo, para cambiar el texto de la portada, modifica `page1.jsx`.

---
**Versión:** 0.1.0
**Autor:** Daniel Diaz
**Tecnología:** React, jsPDF, CSS Modules.

### 💻 Snippet de Lógica (Generación PDF)

El siguiente fragmento muestra cómo se instancia el documento y se agregan las páginas dinámicamente:

```javascript
// src/components/PDFGenerator/PDFGenerator.js

import jsPDF from 'jspdf';

const generatePDF = (data) => {
  const doc = new jsPDF();
  
  // Lógica para renderizar Page 1
  // ...
  doc.addPage();
  
  // Lógica para renderizar Page 2 (Tabla de precios)
  // ...
  
  doc.save(`Cotizacion_${data.cliente}.pdf`);
};
