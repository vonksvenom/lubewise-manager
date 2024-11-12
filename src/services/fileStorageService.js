// Simula um armazenamento persistente usando localStorage
const saveFile = (file, type) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const fileKey = `${type}_${Date.now()}_${file.name}`;
      const fileData = {
        key: fileKey,
        name: file.name,
        type: file.type,
        content: reader.result,
        uploadDate: new Date().toISOString()
      };
      
      // Recupera arquivos existentes
      const existingFiles = JSON.parse(localStorage.getItem(`stored_${type}s`) || '[]');
      existingFiles.push(fileData);
      localStorage.setItem(`stored_${type}s`, JSON.stringify(existingFiles));
      
      resolve(fileData);
    };
    reader.readAsDataURL(file);
  });
};

const getFile = (fileKey, type) => {
  const files = JSON.parse(localStorage.getItem(`stored_${type}s`) || '[]');
  return files.find(file => file.key === fileKey);
};

const getAllFiles = (type) => {
  return JSON.parse(localStorage.getItem(`stored_${type}s`) || '[]');
};

export const fileStorageService = {
  saveFile,
  getFile,
  getAllFiles
};