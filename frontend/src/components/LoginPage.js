import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { loginUser } from '../utils/api'; // Adjust the import based on where your API functions are defined

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for handling login errors
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      localStorage.setItem('authToken', response.data.token); // Store the token
      onLogin(); // Update the authentication state
      navigate('/dashboard'); // Redirect to the Dashboard
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your username and password."); // Set error message for user feedback
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      {error && <p style={styles.error}>{error}</p>} {/* Display error message if exists */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

// Add styling for the container and error message
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '100px',
    border: '1px solid #e0e0e0',
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    width: '100%', // Make the form take full width
  },
  inputContainer: {
    marginBottom: '15px',
    width: '100%', // Make the container take full width
    display: 'flex', // Use flexbox for centering
    flexDirection: 'column', // Align label and input vertically
    alignItems: 'center', // Center-align input fields
  },
  label: {
    marginBottom: '5px',
    display: 'block',
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'left', // Align label to the left
    width: '100%', // Ensure the label takes full width
  },
  input: {
    width: '90%', // Set input width to a smaller percentage for better alignment
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    width: '90%', // Match button width with input width
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default LoginPage;
