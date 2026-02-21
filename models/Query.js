const db = require('../config/db');

class Query {
  static save(name, email, message, callback) {
    const sql = 'INSERT INTO queries (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], callback);
  }

  static getAll(callback) {
    const sql = 'SELECT * FROM queries ORDER BY created_at DESC';
    db.query(sql, callback);
  }
}

module.exports = Query;