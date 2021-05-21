const app = require('./app');
const debug = require('debug')('nodestr:server');
const http = require('http');


const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
console.log('Servidor rodando na porta ' + port);