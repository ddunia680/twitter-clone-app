let io;
require('dotenv').config();
module.exports = {
    init: httpServer => {
        io = require('socket.io')(httpServer, {
            pingTimeout: 60000,
            cors: {
                origin: process.env.FRONT_ENDPOINT
            }
        });
        return io;
    },
    getIO: () => {
        if(!io) {
            throw new Error('Socket.io not initialized!');
        }
        return io;
    }
}