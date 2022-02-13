const { removeFromAll, cleanupUponDisconnect } = require('./utils');

console.log('socket started')

const gameSocket = (socket) => {
    socket.on('connection', (client) => {
        // emit to the newly connected client the existing count 
        console.log(`connected    : <${client.id}>`)

        require('./events/new/events')(socket, client)
        require('./events/new/validators')(socket, client)

        require('./events/newGame')(client)
        require('./events/joinGame')(socket, client)
        require('./events/leaveGame')(socket, client)
        //require('./events/startGame')(socket, client)

        require('./events/game')(socket, client)

        require('./events/testEvents')(socket, client)

        client.on('disconnect', () => {
            console.log(`disconnected : <${client.id}>`)
            //removeFromAll(client.id)
            cleanupUponDisconnect(client.id, socket)
        })        
    });

    socket.on('error', function (err) {
        console.log(err);
    });
}


module.exports = gameSocket