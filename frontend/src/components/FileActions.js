import React, { useState } from 'react';
import { createFile, deleteFile } from '../utils/api';

const FileActions = () => {
  const [filePath, setFilePath] = useState('');
  const [fileContent, setFileContent] = useState('');

  const handleCreateFile = () => {
    createFile(filePath, fileContent)
      .then(() => {
        alert('File created successfully');
        setFilePath('');
        setFileContent('');
      })
      .catch(error => {
        console.error('Error creating file:', error);
      });
  };

  const handleDeleteFile = () => {
    deleteFile(filePath)
      .then(() => {
        alert('File deleted successfully');
        setFilePath('');
      })
      .catch(error => {
        console.error('Error deleting file:', error);
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>File Actions</h2>
      <input
        type="text"
        placeholder="Enter file path"
        value={filePath}
        onChange={(e) => setFilePath(e.target.value)}
        style={styles.input}
      />
      <br />
      <textarea
        placeholder="File content (optional)"
        value={fileContent}
        onChange={(e) => setFileContent(e.target.value)}
        rows="5"
        cols="50"
        style={styles.textarea}
      />
      <br />
      <button onClick={handleCreateFile} style={styles.button}>Create File</button>
      <button onClick={handleDeleteFile} style={styles.button}>Delete File</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  },
  heading: {
    marginBottom: '15px',
    color: '#007bff',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    width: '100%', // Full width
    marginBottom: '10px',
  },
  textarea: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    width: '100%', // Full width
    marginBottom: '10px',
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    marginRight: '10px',
    transition: 'background-color 0.3s',
  },
};

export default FileActions;
