const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const uploadFile = async (file, type) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    const data = await response.json();
    return {
      key: data.key,
      name: file.name,
      type: file.type,
      url: data.url,
      uploadDate: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

const getFile = async (fileKey) => {
  try {
    const response = await fetch(`${API_BASE_URL}/files/${fileKey}`);
    if (!response.ok) {
      throw new Error('Failed to get file');
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting file:', error);
    throw error;
  }
};

const getAllFiles = async (type) => {
  try {
    const response = await fetch(`${API_BASE_URL}/files?type=${type}`);
    if (!response.ok) {
      throw new Error('Failed to get files');
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting files:', error);
    throw error;
  }
};

export const serverStorageService = {
  uploadFile,
  getFile,
  getAllFiles
};