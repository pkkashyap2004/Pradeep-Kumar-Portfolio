const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const queryController = require('./controllers/queryController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.post('/api/contact', queryController.submitQuery);
app.get('/api/queries', queryController.getQueries);

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});