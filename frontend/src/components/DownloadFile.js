import React, { useState } from 'react';
import { downloadFile } from '../utils/api'; // Assuming downloadFile is an API utility

const DownloadFile = () => {
  const [filePath, setFilePath] = useState(''); // Single state for full file path
  const [downloadStatus, setDownloadStatus] = useState('');

  const handleDownloadFile = () => {
    if (!filePath) {
      alert('Please provide a full file path (including file name).');
      return;
    }

    downloadFile(filePath)
      .then(response => {
        // Create a blob from the response data
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filePath.split('/').pop()); // Set the filename to the last part of the path
        document.body.appendChild(link);
        link.click();
        link.remove(); // Clean up
        setDownloadStatus('File downloaded successfully.');
      })
      .catch(error => {
        console.error('Error downloading file:', error);
        setDownloadStatus('File not found or an error occurred.');
      });
  };

  return (
    <div>
      <h2>Download File</h2>

      {/* File Path Input */}
      <input
        type="text"
        placeholder="Enter full file path (e.g., /path/to/file.txt)"
        value={filePath}
        onChange={(e) => setFilePath(e.target.value)}
        style={styles.input}
      />
      <br />

      {/* Download Button */}
      <button onClick={handleDownloadFile} style={styles.button}>Download File</button>

      {/* Status Message */}
      {downloadStatus && <p>{downloadStatus}</p>}
    </div>
  );
};

const styles = {
  input: {
    padding: '10px',
    width: '80%',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    margin: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default DownloadFile;
