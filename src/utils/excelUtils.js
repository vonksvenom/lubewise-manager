import * as XLSX from 'xlsx';

export const downloadTemplate = (templateData, filename) => {
  const ws = XLSX.utils.json_to_sheet(templateData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Template");
  XLSX.writeFile(wb, filename);
};

export const handleExcelImport = (file, onImport) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      onImport(data);
    } catch (error) {
      console.error('Error importing excel:', error);
      toast.error("Erro ao importar arquivo. Verifique se está no formato correto.");
    }
  };
  reader.readAsBinaryString(file);
};