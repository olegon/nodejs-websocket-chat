"use strict";

module.exports = {
    novo: novo,
    getRandomNumber: getRandomNumber,
    getRandomColor: getRandomColor,
    genRandomName: genRandomName
};

function novo(username, color) {
    return {
        username: username || genRandomName(),
        color: color || getRandomColor()
    };
}

function getRandomNumber() {
    return Math.ceil(127 + (Math.random() * 100) % 64);
}

function getRandomColor() {
    return `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
}

let counter = 0;

function genRandomName() {
    return `User#${counter++}`;
}
