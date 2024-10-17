import React, { useState, useEffect } from 'react';
import { fetchFiles, deleteFile } from '../utils/api'; // Import utility functions

const Dashboard = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadFiles();
    }, []);

    const loadFiles = async () => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const response = await fetchFiles();
            console.log(response.data); // Check the response structure
            setFiles(response.data.files || []); // Fallback to empty array
        } catch (error) {
            console.error('Error fetching files:', error);
            setError('Error fetching files. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (fileName) => {
        try {
            await deleteFile(fileName);
            loadFiles(); // Refresh file list after deletion
        } catch (error) {
            console.error('Error deleting file:', error);
            setError('Error deleting file. Please try again later.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>; // Display error message
    }

    return (
        <div style={styles.dashboardContainer}>
            <h2>Dashboard</h2>
            <ul>
                {files.map((file) => (
                    <li key={file}>
                        {file}
                        <button onClick={() => handleDelete(file)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    dashboardContainer: {
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
    }
};

export default Dashboard;
