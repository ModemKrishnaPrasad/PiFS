import React, { useState } from 'react';
import FileExplorer from './components/FileExplorer';
import FileEditor from './components/FileEditor';
import CommandExecutor from './components/CommandExecutor';
import DownloadFile from './components/DownloadFile';
import DirectoryActions from './components/DirectoryActions';
import FileActions from './components/FileActions';

// import './App.css'; // Import a CSS file for additional styles

function App() {
  const [selectedFile, setSelectedFile] = useState('');
  const [activeMenu, setActiveMenu] = useState('fileExplorer'); // State to track the active menu

  return (
    <div style={styles.appContainer}>
      <h1>File System Manager</h1>

      <div style={styles.mainContent}>
        <div style={styles.menuContainer}>
          <button
            style={styles.menuButton}
            onClick={() => setActiveMenu('fileExplorer')}
          >
            File Explorer
          </button>
          <button
            style={styles.menuButton}
            onClick={() => setActiveMenu('fileActions')}
          >
            File Actions
          </button>
          <button
            style={styles.menuButton}
            onClick={() => setActiveMenu('directoryActions')}
          >
            Directory Actions
          </button>
          <button
            style={styles.menuButton}
            onClick={() => setActiveMenu('downloadFile')}
          >
            Download File
          </button>
          <button
            style={styles.menuButton}
            onClick={() => setActiveMenu('commandExecutor')}
          >
            Command Executor
          </button>
         
        </div>

        <div style={styles.editorContainer}>
          {/* Render the active component based on the selected menu */}
          {activeMenu === 'fileExplorer' && (
            <>
              <FileExplorer onSelectFile={setSelectedFile} />
              {selectedFile && <FileEditor filePath={selectedFile} />}
            </>
          )}
          {activeMenu === 'fileActions' && <FileActions />}
          {activeMenu === 'commandExecutor' && <CommandExecutor />}
          {activeMenu === 'downloadFile' && <DownloadFile />}
          {activeMenu === 'directoryActions' && <DirectoryActions />}
        </div>
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    padding: '20px',
    backgroundColor: '#eef2f3',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  mainContent: {
    display: 'flex',                  // Ensures side-by-side layout
    alignItems: 'flex-start',        // Aligns items to the top
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '20px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '200px', // Fixed width for the menu
  },
  menuButton: {
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    margin: '5px 0',
    transition: 'background-color 0.3s',
  },
  editorContainer: {
    flex: 1,                         // Takes up remaining space
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    minHeight: '100vh',              // Ensures it stretches to full height
  },
};
export default App;
