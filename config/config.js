const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'delivery',
  port: 33060,
});
db.connect(function (err) {
  if (err) throw err;
  console.log('Base de datos conectada');
});
module.exports = db;
