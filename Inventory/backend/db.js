const mysql = require('mysql2/promise');

// ✅ Create a promise-based connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'inventory_db', // change to your actual DB name
});

module.exports = pool;
