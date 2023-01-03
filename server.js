require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');
/**
 * IMPORTAR RUTAS
 */
const usersRoutes = require('./routes/usersRoutes');
const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.disable('x-powerd-by');
app.set('port', port);
const upload = multer({
  storage: multer.memoryStorage(),
});
/**
 * LLAMADO DE RUTAS
 */
usersRoutes(app, upload);
server.listen(port, function () {
  console.log('Delivery corriendo en el puerto ' + port);
});
