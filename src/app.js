const cors = require('cors');
const express = require('express');

const app = express();

// Carrega as rotas
const indexRoutes = require('./routes/index-routes');
const armaRoutes = require('./routes/arma-routes');
const partidaRoutes = require('./routes/partida-route');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoutes);
app.use('/api/v1/armas', armaRoutes);
app.use('/api/v1/partidas', partidaRoutes);

app.use((req, res, next) => {
    res.status(404).json({url: req.url, error: 'Caminho não encontrado'}).send();
});

module.exports = app;