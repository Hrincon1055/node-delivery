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
    SELECT 
      user.id, 
      user.email, 
      user.name, 
      user.lastname, 
      user.image, 
      user.phone, 
      user.password, 
      JSON_ARRAYAGG(JSON_OBJECT(
          'id', CONVERT(rol.id, char), 
          'name', rol.name, 
          'image', rol.image, 
          'route', rol.route
        )
      ) AS roles
    FROM users AS user
    INNER JOIN user_has_roles AS user_rol ON user_rol.id_user = user.id
    INNER JOIN roles AS rol ON user_rol.id_rol = rol.id
    WHERE user.id = ?
    GROUP BY user.id
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
  const sql = /* sql */ `
    SELECT 
      user.id, 
      user.email, 
      user.name, 
      user.lastname, 
      user.image, 
      user.phone, 
      user.password, 
      JSON_ARRAYAGG(JSON_OBJECT(
          'id', CONVERT(rol.id, char), 
          'name', rol.name, 
          'image', rol.image, 
          'route', rol.route
        )
      ) AS roles
    FROM users AS user
    INNER JOIN user_has_roles AS user_rol ON user_rol.id_user = user.id
    INNER JOIN roles AS rol ON user_rol.id_rol = rol.id
    WHERE user.email = ?
    GROUP BY user.id
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
