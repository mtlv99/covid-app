import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';

export const exportToPDF = (diagnoses, patientName = 'Usuario') => {
  // eslint-disable-next-line new-cap
  const doc = new jsPDF();
  doc.setFont('helvetica');
  doc.setTextColor(40, 40, 40);

  // Header
  doc.setFontSize(16);
  doc.text('Diabetes App - Reporte de Diagnósticos de Diabetes', 14, 15);
  doc.setFontSize(12);
  doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 14, 22);
  doc.text(`Paciente: ${patientName}`, 14, 29);
  doc.line(14, 32, 195, 32);

  const tableColumn = [
    'ID', 'Embarazos', 'Glucosa', 'Presión', 'Grosor Piel', 'Insulina', 'IMC', 'DPF', 'Edad', 'Diabetes',
  ];

  const tableRows = diagnoses.map((d) => [
    d.id, d.pregnancies, d.glucose, d.blood_pressure, d.skin_thickness,
    d.insulin, d.bmi, d.diabetes_pedigree_function, d.age, d.has_diabetes ? 'Sí' : 'No',
  ]);

  autoTable(doc, {
    startY: 37,
    head: [tableColumn],
    body: tableRows,
    theme: 'striped',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [22, 160, 133], textColor: 255, fontStyle: 'bold' },
    margin: { top: 30, bottom: 20 },
    didDrawPage(data) {
      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(10);
      doc.text(`Página ${data.pageNumber} de ${pageCount}`, 90, doc.internal.pageSize.height - 10);
    },
  });

  doc.save('Diagnosticos_Diabetes.pdf');
};

export const exportToCSV = (diagnoses) => {
  const header = [
    'ID,Embarazos,Glucosa,Presión,Grosor Piel,Insulina,IMC,DPF,Edad,Diabetes',
  ];

  const rows = diagnoses.map((d) => [
    d.id, d.pregnancies, d.glucose, d.blood_pressure, d.skin_thickness,
    d.insulin, d.bmi, d.diabetes_pedigree_function, d.age, d.has_diabetes ? 1 : 0,
  ].join(','));

  const csvContent = [header, ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'Diagnosticos_Diabetes.csv');
};
