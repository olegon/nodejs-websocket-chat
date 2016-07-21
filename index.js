"use strict";

const path = require('path');

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const getName = (() => {
    let counter = 0;

    return () => `User #${counter++}`;
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
    const newNickRegex = /^\\n\s(\w{1,16})/i;

    console.log('a user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('chat message', function(message) {
        const match = newNickRegex.exec(message);
        if (match) {
            const newUsername = match[1];
            username = newUsername;
        }

        io.emit('chat message', {
            username: username,
            color: color,
            message: message
        });
    });
});

http.listen(3000, '192.168.10.125', function() {
    console.log('listening on *:3000');
});
