// Servidor de Express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // Http Server
        this.server = http.createServer(this.app);

        // Configuracion del Socket Server
        this.io = socketio(this.server, { /* */ });

    }

    execute() {
        // Inicializar Middlewares
        this.middlewares();

        // Inicializar Sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto ' + this.port);
        });
    }

    middlewares() {
        // Desplegar el directorio publico
        this.app.use( express.static( path.resolve(__dirname, '../public')) );

        // Habilitar CORS
        this.app.use(cors());
    }

    configurarSockets() {
        new Sockets(this.io);
    }

};

module.exports = Server;