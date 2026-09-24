const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const { createClient } = require('@supabase/supabase-js');
const queryController = require('./controllers/queryController');

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase configuration.
// The secret key is used only by this server and must never be exposed
// to frontend/browser code.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseSecretKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseSecretKey);

app.locals.supabase = supabase;

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
  console.log(`Portfolio server running on port ${PORT}`);
});
