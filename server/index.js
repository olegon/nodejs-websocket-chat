import path from 'path';
import express from 'express';
import http from 'http';
import socket_io from 'socket.io';
import * as chat from './chat';

const expressApp = express();
const httpServer = http.Server(expressApp);
const io = socket_io(httpServer);

(function expressSetup() {

    expressApp.use('/static', express.static(path.join(__dirname, '../client/dist')));

    expressApp.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });

})();

(function ioSetup() {
    io.on('connection', (socket) => {
        const user = chat.User();

        // TODO: adicionar biblioteca para LOGS.
        console.log('**************************************************')
        console.log('# NEW CONNECTION');
        console.log(socket.handshake);
        console.log('**************************************************\n')

        chat.handleUserConnect(user, (data) => {
            socket.emit(data.event, data);
        });

        socket.on('disconnect', () => {
            chat.handleUserDisconnect(user, (data) => {
                socket.broadcast.emit(data.event, data);
            });
        });

        socket.on('user-message', (message) => {
            chat.handleUserMessage(user, message, (data) => {
                io.emit(data.event, data);
            });
        });

        socket.on('user-begin-typing', () => {
            chat.handleUserBeginTyping(user, (data) => {
                io.emit(data.event, data);
            });
        });

        socket.on('user-end-typing', () => {
            chat.handleUserEndTyping(user, (data) => {
                io.emit(data.event, data);
            });
        });

    });

})();

module.exports = httpServer;
