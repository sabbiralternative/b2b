import { jsPDF } from "jspdf";
import { applyPlugin } from "jspdf-autotable";

applyPlugin(jsPDF);

export const handleExportToPDF = () => {
  const exportPdf = (id, name) => {
    const doc = new jsPDF();
    doc.autoTable({ html: id });
    doc.save(name);
  };
  return {
    exportPdf,
  };
};
