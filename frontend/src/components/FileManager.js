import React, { useState } from 'react';
import FileExplorer from './FileExplorer';
import FileEditor from './FileEditor';

const FileManager = () => {
  const [selectedFile, setSelectedFile] = useState('');

  const handleSelectFile = (filePath) => {
    setSelectedFile(filePath);
  };

  return (
    <div style={styles.container}>
      <FileExplorer onSelectFile={handleSelectFile} />
      <FileEditor filePath={selectedFile} />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex', // Use flexbox to arrange children side by side
    justifyContent: 'space-between',
    padding: '20px',
  },
};

export default FileManager;
