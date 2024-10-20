import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileExplorer from './FileExplorer';
import FileEditor from './FileEditor';
import CommandExecutor from './CommandExecutor';
import DownloadFile from './DownloadFile';
import DirectoryActions from './DirectoryActions';
import FileActions from './FileActions';

function Dashboard({ activeMenu, setActiveMenu }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const handleFileSelect = (filePath) => {
    setSelectedFile(filePath);
    setIsModalOpen(true);
  };

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.menuContainer}>
        <Button onClick={() => setActiveMenu('fileExplorer')} label="File Explorer" />
        <Button onClick={() => setActiveMenu('fileActions')} label="File Actions" />
        <Button onClick={() => setActiveMenu('directoryActions')} label="Directory Actions" />
        <Button onClick={() => setActiveMenu('downloadFile')} label="Download File" />
        <Button onClick={() => setActiveMenu('commandExecutor')} label="Command Executor" />
        <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>

      <div style={styles.contentContainer}>
        {activeMenu === 'fileExplorer' && (
          <FileExplorer onSelectFile={handleFileSelect} />
        )}
        {activeMenu === 'fileActions' && <FileActions />}
        {activeMenu === 'commandExecutor' && <CommandExecutor />}
        {activeMenu === 'downloadFile' && <DownloadFile />}
        {activeMenu === 'directoryActions' && <DirectoryActions />}
      </div>

      {isModalOpen && (
        <div style={styles.modalOverlay}>
         
            <FileEditor filePath={selectedFile} onClose={() => setIsModalOpen(false)} />
        
        </div>
      )}
    </div>
  );
}

// Button component for hover effects
const Button = ({ label, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={{
        ...styles.menuButton,
        backgroundColor: isHovered ? '#007BFF' : '#e7e7e7', // Change to blue on hover
        color: isHovered ? '#fff' : '#333', // Change text color on hover
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </button>
  );
};

// Styles for the Dashboard component
const styles = {
  dashboardContainer: {
    display: 'flex',
    height: '100vh',
    padding: '20px',
    backgroundColor: '#f0f0f0',
  },
  menuContainer: {
    width: '200px',
    padding: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
  },
  menuButton: {
    margin: '10px 0',
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  logoutButton: {
    margin: '10px 0',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#dc3545', // Red color for logout button
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  contentContainer: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#ffffff',
    marginLeft: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    width: '90%',
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export default Dashboard;
