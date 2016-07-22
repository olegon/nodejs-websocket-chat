"use strict";

const path = require('path');

const express = require('express');
const expressApp = express();
const httpServer = require('http').Server(expressApp);
const io = require('socket.io')(httpServer);

const usuario = require('./usuario');

expressApp.use('/static', express.static(path.join(__dirname, '../client/dist')));

expressApp.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const serverBot = usuario.novo('* Server BOT *', '#c00');

io.on('connection', function(socket) {
    const user = usuario.novo();

    const newNickRegex = /^\\n\s([a-záàâãéèêíïóôõöúçñ_]{1,32})$/i;

    socket.on('disconnect', function() {
        broadcastMessage(serverBot, `O usuário ${user.username} saiu da sala.`);
    });

    socket.on('new-message', function(message) {
        const match = newNickRegex.exec(message);

        if (match) {
            const newUsername = match[1];

            broadcastMessage(serverBot, `O usuário "${user.username}" trocou seu nome para "${newUsername}"`);

            user.username = newUsername;
        } else {
            broadcastMessage(user, message);
        }
    });

    sendMessage(socket, serverBot, `Esse chat foi escrito com Node.js, Socket.io, Webpack, Babel-ES6 e Flexbox. :)`);

    broadcastMessage(serverBot, `O usuário ${user.username} entrou na sala.`);


    function broadcastMessage(usuario, mensagem) {
        sendMessage(io, usuario, mensagem);
    }

    function sendMessage(socket, usuario, mensagem) {
        const message = {
            username: usuario.username,
            color: usuario.color,
            message: mensagem
        };

        socket.emit('new-message', message);
    }
});

module.exports = httpServer;
