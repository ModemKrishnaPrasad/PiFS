// src/components/FileEditor.js
import React, { useState, useEffect } from 'react';
import { readFile, writeFile } from '../utils/api';

const FileEditor = ({ filePath }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (filePath) {
      loadFile(filePath);
    }
  }, [filePath]);

  const loadFile = (path) => {
    readFile(path)
      .then(response => {
        setContent(response.data.content);
      })
      .catch(error => {
        console.error('Error reading file:', error);
      });
  };

  const handleSave = () => {
    writeFile(filePath, content)
      .then(() => {
        alert('File saved successfully');
      })
      .catch(error => {
        console.error('Error saving file:', error);
      });
  };

  if (!filePath) return <div style={styles.message}>Select a file to edit</div>;

  return (
    <div style={styles.editorContainer}>
      <h2 style={styles.header}>Editing: {filePath}</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={styles.textarea}
      />
      <br />
      <button onClick={handleSave} style={styles.button}>Save</button>
    </div>
  );
};

const styles = {
  editorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px', // Limit the maximum width for better readability
    margin: '20px auto', // Center the editor with margin
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0', // Add a subtle border
  },
  header: {
    marginBottom: '15px',
    color: '#333',
  },
  textarea: {
    width: '100%', // Full width
    height: '300px',
    fontSize: '14px', // Reduced text size
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    resize: 'vertical', // Allow vertical resizing
    backgroundColor: '#f5f5f5', // Light background for the textarea
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)', // Subtle inset shadow
  },
  button: {
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s', // Smooth transition for hover
  },
  message: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#666',
  },
};

export default FileEditor;
