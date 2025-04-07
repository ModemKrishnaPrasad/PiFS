const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser'); // To handle JSON body in POST request
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Secret for JWT
const JWT_SECRET = 'your_jwt_secret';

// In-memory users list (in a production app, use a database)
const users = [];

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token required');

  const bearerToken = token.split(' ')[1];
  jwt.verify(bearerToken, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
};

// Route for user registration
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password required');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  res.status(201).send('User registered');
});

// Route for user login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).send('Invalid username or password');

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).send('Invalid username or password');

  // Generate JWT token
  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Now protect your existing routes with the authentication middleware

// Route to list files and directories (protected)
app.get('/api/files', authenticateToken, (req, res) => {
  const directoryPath = req.query.path || '/';

  fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan directory' });
    }

    const result = files.map(file => ({
      name: file.name,
      type: file.isDirectory() ? 'directory' : 'file',
    }));

    res.json(result);
  });
});

// Route to read a file (protected)
app.get('/api/files/read', authenticateToken, (req, res) => {
  const filePath = req.query.path;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read file' });
    }
    res.json({ content: data });
  });
});

// Other routes (modify, create, delete files/directories) can be similarly protected
app.post('/api/files/write', authenticateToken, (req, res) => {
  const { path: filePath, content } = req.body;

  if (!filePath || !content) {
    return res.status(400).json({ error: 'File path and content are required' });
  }

  fs.writeFile(filePath, content, 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to write file' });
    }
    res.json({ message: 'File successfully written' });
  });
});

// Route to delete a file (protected)
app.delete('/api/files/delete', authenticateToken, (req, res) => {
  const filePath = req.query.path;

  if (!filePath) {
    return res.status(400).json({ error: 'File path is required' });
  }

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete file', details: err.message });
    }
    res.json({ message: 'File successfully deleted' });
  });
});

// Route to execute shell commands (protected)
const safeCommands = ["ls", "whoami", "pwd", "echo Hello"]; // Allow only these

app.post('/api/execute', authenticateToken, (req, res) => {
  const command = req.body.command;

  if (!command) {
    return res.status(400).send("Command is required");
  }

  // ⚠️ Dangerous: No whitelist check
  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(stderr || error.message);
    }
    res.send(stdout);
  });
});


// Route to download a file (protected)
app.get('/api/download', authenticateToken, (req, res) => {
  const filePath = req.query.path;

  if (!filePath) {
    return res.status(400).send('File path is required.');
  }

  const fullPath = path.join(filePath);
  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found.');
    }

    res.download(fullPath, (downloadError) => {
      if (downloadError) {
        return res.status(500).send('Error downloading file.');
      }
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
