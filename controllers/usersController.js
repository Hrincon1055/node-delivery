const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = {
  register(req, res) {
    const user = req.body;
    User.create(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: 'Hubo un error con el registro del usuario.',
          error: err,
        });
      }
      return res.status(201).json({
        success: true,
        message: 'Registro realizado correctamente.',
        data: data,
      });
    });
  },
  login(req, res) {
    const { email, password } = req.body;
    User.findByEmail(email, async (err, user) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: 'Hubo un error con el registro del usuario.',
          error: err,
        });
      }
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'El email no fue encontrado.',
        });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          keys.secretOrKey,
          {}
        );
        const data = {
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          image: user.image,
          session_token: `JWT ${token}`,
        };
        return res.status(201).json({
          success: true,
          message: 'El usuario fue autenticado.',
          data: data,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'El password es incorrecto.',
        });
      }
    });
  },
};
