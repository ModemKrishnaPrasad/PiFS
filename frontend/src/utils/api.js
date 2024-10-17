import axios from 'axios';

// Set your backend server URL
const API_BASE_URL = 'http://localhost:5000/api';

// Fetch files and directories
export const fetchFiles = (directoryPath) => {
  return axios.get(`${API_BASE_URL}/files`, { params: { path: directoryPath } });
};

// Read file content
export const readFile = (filePath) => {
  return axios.get(`${API_BASE_URL}/files/read`, { params: { path: filePath } });
};

// Write to a file
export const writeFile = (filePath, content) => {
  return axios.post(`${API_BASE_URL}/files/write`, { path: filePath, content });
};

// Create a new directory
export const createDirectory = (directoryPath) => {
  return axios.post(`${API_BASE_URL}/files/create-directory`, { path: directoryPath });
};

// Delete a directory
export const deleteDirectory = (directoryPath) => {
  return axios.delete(`${API_BASE_URL}/files/delete-directory`, { params: { path: directoryPath } });
};

// Create a new file
export const createFile = (filePath, content) => {
  return axios.post(`${API_BASE_URL}/files/create-file`, { path: filePath, content });
};

// Delete a file
export const deleteFile = (filePath) => {
  return axios.delete(`${API_BASE_URL}/files/delete`, { params: { path: filePath } });
};

// Execute a command
export const executeCommand = (command) => {
  return axios.post(`${API_BASE_URL}/execute`, { command });
};

// Download a file
export const downloadFile = (filePath) => {
  return axios.get(`${API_BASE_URL}/download`, { params: { path: filePath }, responseType: 'blob' });
};