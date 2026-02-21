const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'portfolio',
  password: '',
  database: 'portfolio'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;