const BandList = require('./band-list');

class Sockets {

    constructor (io) {
        this.io = io;
        this.bandList = new BandList

        this.socketsEvents();
    }

    socketsEvents() {

        this.io.on('connection', ( socket ) =>  {

            console.log('Cliente conectado');

            // Emitir al cliente conectado todas las bandas
            socket.emit('current-bands', this.bandList.getBands());

            // Votar por una banda
            socket.on('votar-banda', (id) => {
                this.bandList.increaseVotes(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            // Borrar una banda
            socket.on('borrar-banda', (id) => {
                this.bandList.removeBand(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            // Cambiar nombre de una banda
            socket.on('cambiar-nombre-banda', ({id, nombre}) => {
                this.bandList.changeBandName(id, nombre);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            // Nueva banda
            socket.on('nueva-banda', ({nombre}) => {
                this.bandList.addBand(nombre);
                this.io.emit('current-bands', this.bandList.getBands());
            });

        });
        
    }

}

module.exports = Sockets;