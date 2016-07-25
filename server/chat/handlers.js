import _ from 'lodash';

let usersTyping = [];

export function handleUserConnect(user, callback) {
    const  { iid, username, color } = user;

    callback({
        event: 'user-connect',
        iid,
        username,
        color
    });
}

export function handleUserMessage(user, message, callback) {
    const { iid, username, color } = user;

    callback({
        event: 'user-message',
        iid,
        username,
        color,
        message
    });
}

export function handleUserDisconnect(user, callback) {
    const { iid, username, color } = user;

    _.remove(usersTyping, _.identity(user));

    callback({
        event: 'user-disconnect',
        iid,
        username,
        color
    });
}

export function handleUserBeginTyping(user, callback) {
    usersTyping.push(user);

    usersTyping = _.takeRight(usersTyping, 3);

    triggerUsersTypingCallback(usersTyping, callback);
}

export function handleUserEndTyping(user, callback) {
    _.remove(usersTyping, _.identity(user));

    triggerUsersTypingCallback(usersTyping, callback);
}

function triggerUsersTypingCallback (users, callback) {
    let usersToSend = _.map(users, ({ iid, username, color }) => ({
        iid,
        username,
        color
    }));

    callback({
        event: 'users-typing',
        users: usersToSend
    });
}
