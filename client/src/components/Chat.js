import React from 'react';
import io from 'socket.io-client';

import Messages from './Messages';
import Form from './Form';

export default class Chat extends React.Component {

    constructor () {
        super();

        this.state = {
            messages: []
        };

        this.sendMessage = this.sendMessage.bind(this);
    }

    componentWillMount () {
        const socket = io();

        socket.on('user-connect', (userInfo) => {
            this.setState(userInfo);
        });

        socket.on('user-message', (userMessage) => {            
            this.setState({ 
                messages: [...this.state.messages, userMessage]
            })
        });

        this.socket = socket;
    }

    sendMessage (userMessage) {
        this.socket.emit('user-message', userMessage.text);
    }

    render () {
        return (
            <div className="container fade-in">
                <Messages messages={ this.state.messages } />
                <Form sendMessage={ this.sendMessage } />
                { /* <div className="user-typing"></div> */ }
            </div>
        );
    }
}