const Query = require('../models/Query');

exports.submitQuery = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const { error } = await Query.save(req.app.locals.supabase, name, email, message);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to save query' });
  }

  res.json({ success: 'Query submitted successfully' });
};

exports.getQueries = async (req, res) => {
  const { data, error } = await Query.getAll(req.app.locals.supabase);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch queries' });
  }

  res.json(data);
};
