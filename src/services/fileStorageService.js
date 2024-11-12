import { serverStorageService } from './serverStorageService';

// Temporary function to maintain backward compatibility with localStorage
const saveToLocalStorage = (fileData, type) => {
  const existingFiles = JSON.parse(localStorage.getItem(`stored_${type}s`) || '[]');
  existingFiles.push(fileData);
  localStorage.setItem(`stored_${type}s`, JSON.stringify(existingFiles));
  return fileData;
};

const saveFile = async (file, type) => {
  try {
    // First try to save to server
    const serverResponse = await serverStorageService.uploadFile(file, type);
    
    // Temporarily also save to localStorage for backward compatibility
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onloadend = () => {
        const fileData = {
          ...serverResponse,
          content: reader.result
        };
        saveToLocalStorage(fileData, type);
        resolve(fileData);
      };
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.warn('Server storage failed, falling back to localStorage:', error);
    
    // Fallback to localStorage only
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onloadend = () => {
        const fileData = {
          key: `${type}_${Date.now()}_${file.name}`,
          name: file.name,
          type: file.type,
          content: reader.result,
          uploadDate: new Date().toISOString()
        };
        resolve(saveToLocalStorage(fileData, type));
      };
      reader.readAsDataURL(file);
    });
  }
};

const getFile = async (fileKey, type) => {
  try {
    // First try to get from server
    const serverFile = await serverStorageService.getFile(fileKey);
    return serverFile;
  } catch (error) {
    console.warn('Server storage failed, falling back to localStorage:', error);
    
    // Fallback to localStorage
    const files = JSON.parse(localStorage.getItem(`stored_${type}s`) || '[]');
    return files.find(file => file.key === fileKey);
  }
};

const getAllFiles = async (type) => {
  try {
    // First try to get from server
    const serverFiles = await serverStorageService.getAllFiles(type);
    return serverFiles;
  } catch (error) {
    console.warn('Server storage failed, falling back to localStorage:', error);
    
    // Fallback to localStorage
    return JSON.parse(localStorage.getItem(`stored_${type}s`) || '[]');
  }
};

export const fileStorageService = {
  saveFile,
  getFile,
  getAllFiles
};