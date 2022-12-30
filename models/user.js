const bcrypt = require('bcryptjs');
const db = require('../config/config');
const User = {};
User.create = async (user, result) => {
  const hashPassword = await bcrypt.hash(user.password, 10);
  const sql = `
    INSERT INTO users(email, name, lastname, phone, image, password, created_at) VALUES(?,?,?,?,?,?,?)
  `;
  db.query(
    sql,
    [
      user.email,
      user.name,
      user.lastname,
      user.phone,
      user.image,
      hashPassword,
      new Date(),
    ],
    (err, res) => {
      if (err) {
        console.log('Error: ', err);
        result(err, null);
      } else {
        console.log('ID user creado: ', res.insertId);
        result(null, res.insertId);
      }
    }
  );
};
User.findById = (id, result) => {
  const sql = `
    SELECT id, email, name, lastname, image, password FROM users WHERE id = ?
  `;
  db.query(sql, [id], (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(err, null);
    } else {
      console.log('Usuario obtenido findById: ', res[0]);
      result(null, res[0]);
    }
  });
};

User.findByEmail = (email, result) => {
  const sql = `
    SELECT id, email, name, lastname, image, password FROM users WHERE email = ?
  `;
  db.query(sql, [email], (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(err, null);
    } else {
      console.log('Usuario obtenido findByEmail: ', res[0]);
      result(null, res[0]);
    }
  });
};
module.exports = User;
