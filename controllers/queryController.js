const Query = require('../models/Query');

exports.submitQuery = (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  Query.save(name, email, message, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save query' });
    }
    res.json({ success: 'Query submitted successfully' });
  });
};

exports.getQueries = (req, res) => {
  Query.getAll((err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch queries' });
    }
    res.json(results);
  });
};