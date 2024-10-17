const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser'); // To handle JSON body in POST request

const app = express();
const PORT = 5000;
const cors = require('cors');
app.use(cors());
// Middleware to handle JSON request bodies
app.use(bodyParser.json());

// Middleware to handle CORS (optional)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Route to list files and directories
app.get('/api/files', (req, res) => {
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

// Route to read a file
app.get('/api/files/read', (req, res) => {
  const filePath = req.query.path;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read file' });
    }
    res.json({ content: data });
  });
});

// Route to modify and save a file
app.post('/api/files/write', (req, res) => {
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

// Route to delete a file
app.delete('/api/files/delete', (req, res) => {
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

// Route to create a new directory
app.post('/api/files/create-directory', (req, res) => {
  const directoryPath = req.body.path;

  if (!directoryPath) {
    return res.status(400).json({ error: 'Directory path is required' });
  }

  fs.mkdir(directoryPath, { recursive: true }, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create directory', details: err.message });
    }
    res.json({ message: 'Directory created successfully' });
  });
});

// Route to create a new file
app.post('/api/files/create-file', (req, res) => {
  const { path: filePath, content } = req.body;

  if (!filePath) {
    return res.status(400).json({ error: 'File path is required' });
  }

  // If no content is provided, default to an empty file
  const fileContent = content || '';

  // Write the new file with content
  fs.writeFile(filePath, fileContent, 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create file', details: err.message });
    }
    res.json({ message: 'File successfully created' });
  });
});

// Route to delete a directory
app.delete('/api/files/delete-directory', (req, res) => {
  const directoryPath = req.query.path;

  if (!directoryPath) {
    return res.status(400).json({ error: 'Directory path is required' });
  }

  // Remove the directory and its content recursively
  fs.rm(directoryPath, { recursive: true, force: true }, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete directory', details: err.message });
    }
    res.json({ message: 'Directory successfully deleted' });
  });
});

const { exec } = require('child_process');

app.post('/api/execute', (req, res) => {
  const command = req.body.command;
  
  exec(`chroot / ${command}`, (error, stdout, stderr) => {
      if (error) {
          return res.status(500).send(stderr);
      }
      res.send(stdout);
  });
});

app.get('/api/download', (req, res) => {
  const filePath = req.query.path;

  if (!filePath) {
    return res.status(400).send('File path is required.');
  }

  // Adjust the base path according to your directory structure
  const fullPath = path.join(filePath);
  console.log('Full Path:', fullPath); // Log to verify the resolved path

  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('File not found error:', err);
      return res.status(404).send('File not found.');
    }

    res.download(fullPath, (downloadError) => {
      if (downloadError) {
        console.error('Download error:', downloadError);
        return res.status(500).send('Error downloading file.');
      }
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
