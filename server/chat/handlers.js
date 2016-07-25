export function handleUserConnect(user, callback) {
    const  { username } = user;

    callback({
        event: 'user-connect',
        username
    });
}

export function handleUserMessage(user, message, callback) {
    const { username, color } = user;

    callback({
        event: 'user-message',
        username,
        color,
        message
    });
}

export function handleUserDisconnect(user, callback) {
    const { username, color } = user;

    callback({
        event: 'user-disconnect',
        username,
        color
    });
}

export function handleUserBeginTyping(user, callback) {
    callback({
        event: 'user-begin-typing'
    });
}

export function handleUserEndTyping(user, callback) {
    callback({
        event: 'user-end-typing'
    });
}
