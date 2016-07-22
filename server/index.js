const path = require('path');
const express = require('express');
const expressApp = express();
const httpServer = require('http').Server(expressApp);
const io = require('socket.io')(httpServer);

import { user, handlers } from './chat';

(function expressSetup() {

    expressApp.use('/static', express.static(path.join(__dirname, '../client/dist')));

    expressApp.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });

})();

(function ioSetup() {

    io.on('connection', (socket) => {

        const user = user.create();

        socket.on('disconnect', () => {
            handlers.handleUserDisconnect(user, (data) => {
                socket.emit('user-disconnect', data);
            });
        });

        socket.on('user-message', (message) => {
            handlers.handleUserMessage(user, message, (data) => {
                socket.emit('user-message', data);
            });
        });

        socket.on('user-begin-typing', () => {
            handlers.handleUserBeginTyping(user, (data) => {

            });
        });

        socket.on('user-end-typing', () => {
            handlers.handleUserEndTyping(user, (data) => {

            });
        });

    });

})();

// const serverBot = usuario.novo('* Server BOT *', '#c00');

/*

io.on('connection', function(socket) {
    const user = usuario.novo();

    const newNickRegex = /^\\n\s([a-záàâãéèêíïóôõöúçñ_]{1,32})$/i;

    socket.on('disconnect', function() {
        sendMessage(socket.broadcast, serverBot, `O usuário ${user.username} saiu da sala.`);
    });

    socket.on('user-message', function(message) {
        const match = newNickRegex.exec(message);

        if (match) {
            const newUsername = match[1];

            broadcastMessage(serverBot, `O usuário "${user.username}" trocou seu nome para "${newUsername}"`);

            user.username = newUsername;
        } else {
            broadcastMessage(user, message);
        }
    });

    socket.on('user-begin-typing', function() {
        console.log(`${user.username} começou a digitar.`);
        setData(socket.broadcast, 'user-begin-typing', {
            username: user.username
        });
    });

    socket.on('user-end-typing', function() {
        setData(socket.broadcast, 'user-end-typing', {
            username: user.username
        });
    });

    sendMessage(socket, serverBot, `Esse chat foi escrito com Node.js, Socket.io, Webpack, Babel-ES6 e Flexbox. :)`);

    sendMessage(socket, serverBot, `Use o comando "\\n <username>" para alterar o seu username.`);

    sendMessage(socket.broadcast, serverBot, `O usuário ${user.username} entrou na sala.`);



    function setData(emitter, eventType, data) {
        console.log(eventType, data);


        emitter.emit(eventType, data);
    }


    function broadcastMessage(usuario, mensagem) {
        sendMessage(io, usuario, mensagem);
    }

    function sendMessage(socket, usuario, mensagem) {
        const message = {
            username: usuario.username,
            color: usuario.color,
            message: mensagem
        };

        socket.emit('user-message', message);
    }
});

*/

module.exports = httpServer;
