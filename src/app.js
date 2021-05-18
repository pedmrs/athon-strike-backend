const express = require('express');
const config = require('./config');

const app = express();
const router = express.Router();

// Carrega as rotas
const indexRoutes = require('./routes/index-routes');

app.use('/', indexRoutes);

module.exports = app;