const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// create logs directory if not exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// /api/demo endpoint
app.get('/api/demo', (req, res) => {
  const logMessage = `Request at ${new Date().toISOString()} from ${req.ip}\n`;
  fs.appendFileSync(path.join(logsDir, 'access.log'), logMessage);

  res.json({
    git: {
      title: 'Git Workflow',
      detail: 'Feature branch, commit, push'
    },
    docker: {
      title: 'Docker',
      detail: 'Containerize backend with Docker'
    }
  });
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
