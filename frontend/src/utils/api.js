import axios from 'axios';

// Set your backend server URL
const API_BASE_URL = 'http://localhost:5000/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch files and directories
export const fetchFiles = (directoryPath) => {
  return api.get('/files', { params: { path: directoryPath } });
};

// Read file content
export const readFile = (filePath) => {
  return api.get('/files/read', { params: { path: filePath } });
};

// Write to a file
export const writeFile = (filePath, content) => {
  return api.post('/files/write', { path: filePath, content });
};

// Create a new directory
export const createDirectory = (directoryPath) => {
  return api.post('/files/create-directory', { path: directoryPath });
};

// Delete a directory
export const deleteDirectory = (directoryPath) => {
  return api.delete('/files/delete-directory', { params: { path: directoryPath } });
};

// Create a new file
export const createFile = (filePath, content) => {
  return api.post('/files/create-file', { path: filePath, content });
};

// Delete a file
export const deleteFile = (filePath) => {
  return api.delete('/files/delete', { params: { path: filePath } });
};

// Execute a command
export const executeCommand = (command) => {
  return api.post('/execute', { command });
};

// Download a file
export const downloadFile = (filePath) => {
  return api.get('/download', { params: { path: filePath }, responseType: 'blob' });
};

// Login a user
export const loginUser = (username, password) => {
  return api.post('/login', { username, password });
};

// Register a new user
export const registerUser = (username, password) => {
  return api.post('/register', { username, password });
};
