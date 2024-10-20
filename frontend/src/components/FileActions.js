import React, { useState } from 'react';
import { createFile, deleteFile, readFile, writeFile } from '../utils/api';

const FileActions = () => {
  const [filePath, setFilePath] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // To control the modal visibility
  const [selectedFilePath, setSelectedFilePath] = useState('');
  const [selectedFileContent, setSelectedFileContent] = useState('');

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

  const handleFileClick = (file) => {
    // Fetch file content and open modal
    readFile(file)
      .then(response => {
        setSelectedFilePath(file);
        setSelectedFileContent(response.data.content);
        setIsModalOpen(true);
      })
      .catch(error => {
        console.error('Error reading file:', error);
      });
  };

  const handleSaveFile = () => {
    writeFile(selectedFilePath, selectedFileContent)
      .then(() => {
        alert('File saved successfully');
        setIsModalOpen(false); // Close modal on save
      })
      .catch(error => {
        console.error('Error saving file:', error);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal when clicked outside or on close button
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

      {/* Modal for editing file */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Editing: {selectedFilePath}</h2>
            <textarea
              value={selectedFileContent}
              onChange={(e) => setSelectedFileContent(e.target.value)}
              style={styles.modalTextarea}
            />
            <button onClick={handleSaveFile} style={styles.button}>Save</button>
            <button onClick={handleCloseModal} style={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
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
    width: '100%',
    marginBottom: '10px',
  },
  textarea: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    width: '100%',
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
  modalOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '600px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
  },
  modalTextarea: {
    width: '100%',
    height: '200px',
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '5px',
  },
  closeButton: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#dc3545',
    color: 'white',
    cursor: 'pointer',
    marginRight: '10px',
  },
};

export default FileActions;
