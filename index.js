"use strict";

const path = require('path');

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const getName = (() => {
    let counter = 0;

    return () => `User#${counter++}`;
})();

const getRandomNumber = () => Math.ceil(127 + (Math.random() * 100) % 64);
const getRandomColor = () => `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;

app.use('/static', express.static(__dirname + '/client'));

app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname, 'client/index.html'));
});

io.on('connection', function(socket) {
    let username = getName();
    const color = getRandomColor();
    const newNickRegex = /^\\n\s([a-záàâãéèêíïóôõöúçñ_]{1,32})$/i;

    socket.on('disconnect', function() {

    });

    socket.on('chat message', function(message) {
        const match = newNickRegex.exec(message);

        if (match) {
            const newUsername = match[1];

            io.emit('chat message', {
                username: 'Server BOT',
                color: '#c00',
                message: `O usuário "${username}" trocou seu nome para "${newUsername}"`
            });

            username = newUsername;
        }
        else {
            io.emit('chat message', {
                username: username,
                color: color,
                message: message
            });
        }
    });

    io.emit('chat message', {
        username: '# Server BOT',
        color: '#c00',
        message: `O usuário ${username} entrou na sala.`
    });
});

http.listen(3000, function() {
    console.log('Escutando na porta 3000');
});
