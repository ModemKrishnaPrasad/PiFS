// src/components/FileExplorer.js
import React, { useState, useEffect } from 'react';
import { fetchFiles } from '../utils/api';

const FileExplorer = ({ onSelectFile }) => {
  const [directoryPath, setDirectoryPath] = useState('/');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    loadFiles(directoryPath);
  }, [directoryPath]);

  const loadFiles = (path) => {
    fetchFiles(path)
      .then(response => {
        setFiles(response.data);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  };

  const handleFileClick = (file) => {
    if (file.type === 'directory') {
      setDirectoryPath(`${directoryPath}/${file.name}`);
    } else {
      onSelectFile(`${directoryPath}/${file.name}`);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>File Explorer</h2>
      <button 
        onClick={() => setDirectoryPath(directoryPath.split('/').slice(0, -1).join('/') || '/')}
        style={styles.goUpButton}
      >
        Go Up
      </button>
      <ul style={styles.fileList}>
        {files.map((file, index) => (
          <li 
            key={index} 
            onClick={() => handleFileClick(file)} 
            style={{
              ...styles.fileItem,
              borderColor: file.type === 'directory' ? '#007bff' : '#28a745', // Blue for directories, green for files
            }}
          >
            {file.type === 'directory' ? '📁' : '📄'} {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    width: '100%',  // Occupy full width
    margin: '20px 0',  // Add margin to give it some spacing
  },
  heading: {
    textAlign: 'center',
    marginBottom: '15px',
  },
  fileList: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  fileItem: {
    padding: '10px',
    margin: '5px 0',
    border: '2px solid transparent',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'border-color 0.3s, background-color 0.3s',
    backgroundColor: '#fff',
  },
  goUpButton: {
    padding: '10px 20px',
    marginTop: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
    transition: 'background-color 0.3s',
  },
};

export default FileExplorer;
