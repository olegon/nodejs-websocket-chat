import React from 'react';

export default class Messages extends React.Component {
    renderMessage (userMessage) {
        const { message_id, username, message, color } = userMessage;
        
        return (
            <div className="chat-message" ref={ message_id }>
                <div className="username" style={ { color } }>{username}</div>
                <div className="message">{message}</div>
            </div>
        )
    }

    componentDidUpdate () {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    render () {
        const { messages } = this.props;

        return (
            <div className="chat-messages" ref={ element => this.chatMessages = element }>
                {
                    messages
                    .map(message => this.renderMessage(message))
                }
            </div>
        );
    }
}