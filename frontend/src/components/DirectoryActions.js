import React, { useState } from 'react';
import { createDirectory, deleteDirectory } from '../utils/api';

const DirectoryActions = () => {
  const [directoryPath, setDirectoryPath] = useState('');

  const handleCreateDirectory = () => {
    createDirectory(directoryPath)
      .then(() => {
        alert('Directory created successfully');
        setDirectoryPath(''); // Clear input after creation
      })
      .catch(error => {
        console.error('Error creating directory:', error);
      });
  };

  const handleDeleteDirectory = () => {
    deleteDirectory(directoryPath)
      .then(() => {
        alert('Directory deleted successfully');
        setDirectoryPath(''); // Clear input after deletion
      })
      .catch(error => {
        console.error('Error deleting directory:', error);
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Directory Actions</h2>
      <input
        type="text"
        placeholder="Enter directory path"
        value={directoryPath}
        onChange={(e) => setDirectoryPath(e.target.value)}
        style={styles.input}
      />
      <br />
      <button onClick={handleCreateDirectory} style={styles.button}>
        Create Directory
      </button>
      <button onClick={handleDeleteDirectory} style={styles.button}>
        Delete Directory
      </button>
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

export default DirectoryActions;
