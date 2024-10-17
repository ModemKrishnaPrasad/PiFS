import React, { useState } from 'react';
import { executeCommand } from '../utils/api'; // Import the executeCommand function
import './CommandExecutor.css'; // Import the CSS file

function CommandExecutor() {
    const [command, setCommand] = useState('');
    const [output, setOutput] = useState('');

    const handleExecute = async () => {
        try {
            const response = await executeCommand(command); // Use the executeCommand function
            setOutput(response.data);
        } catch (error) {
            setOutput(`Error: ${error.response ? error.response.data : 'Network Error'}`);
        }
    };

    return (
        <div className="command-executor">
            <h2 className="header">Command Executor</h2>
            <input 
                type="text" 
                value={command} 
                onChange={(e) => setCommand(e.target.value)} 
                placeholder="Enter command"
                className="command-input"
            />
            <button onClick={handleExecute} className="execute-button">Execute</button>
            <pre className="output">{output}</pre>
        </div>
    );
}

export default CommandExecutor;
