"use strict";

const path = require('path');

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const usuario = require('./usuario');

app.use('/static', express.static(path.join(__dirname, '/client/dist')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

const serverBot = usuario.novo('Server BOT', '#c00');

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

    broadcastMessage(serverBot, `O usuário ${user.username} entrou na sala.`);

    function broadcastMessage(usuario, mensagem) {
        const message = {
            username: usuario.username,
            color: usuario.color,
            message: mensagem
        };

        io.emit('new-message', message);
    }
});

http.listen(3000, function() {
    console.log('Escutando na porta 3000');
});
