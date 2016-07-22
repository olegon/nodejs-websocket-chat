export function User(username, color) {
    return {
        username: username || genRandomName(),
        color: color || getRandomColor()
    };
}

export function getRandomNumber() {
    return Math.ceil(127 + (Math.random() * 100) % 64);
}

export function getRandomColor() {
    return `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
}

let counter = 0;

export function genRandomName() {
    return `User#${counter++}`;
}
