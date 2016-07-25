import _ from 'lodash';
import { getPublicUserInfo } from './user';

let usersTyping = [];

export function handleUserConnect(user, callback) {
    const eventObject = getPublicUserInfo(user, {
        event: 'user-connect'
    });

    callback(eventObject);
}

export function handleUserMessage(user, message, callback) {
    const eventObject = getPublicUserInfo(user, {
        event: 'user-message',
        message
    });

    callback(eventObject);
}

export function handleUserDisconnect(user, callback) {
    _.remove(usersTyping, _.identity(user));

    const eventObject = getPublicUserInfo(user, {
        event: 'user-disconnect'
    });

    callback(eventObject);
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
    let usersToSend = _.map(users, getPublicUserInfo);

    callback({
        event: 'users-typing',
        users: usersToSend
    });
}
