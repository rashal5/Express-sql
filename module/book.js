const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',    // Your MySQL hostname
  user: 'root',         // Your MySQL username
  password: '', // Your MySQL password
  database: 'test1'    // The database you're connecting to
});

module.exports = pool.promise();
