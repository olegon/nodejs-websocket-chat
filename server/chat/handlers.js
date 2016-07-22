export function handleUserMessage(user, message, callback) {
    callback({
        event: 'user-message',
        username: user.username,
        color: user.color,
        message: message
    });
}

export function handleUserDisconnect(user, callback) {
    callback({
        event: 'user-disconnect',
        username: user.username,
        color: user.color
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
