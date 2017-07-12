import React from 'react';

export default class Form extends React.Component {

    handleSubmit (e) {
        e.preventDefault();
        this.sendMessage();
    }

    handleTyping (e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
        }
    }

    sendMessage () {
        const message = this.inputElement.value;

        if (message) {
             this.props.sendMessage({
                text: message
            });

            this.inputForm.reset();
        }
    }

    render () {
        return (
            <form
                className="chat-input-form"
                ref={ element => this.inputForm = element }
                onSubmit={ e => this.handleSubmit(e) } >
                <textarea 
                    className="chat-input-text"
                    placeholder="Digite a sua mensagem aqui..."
                    ref={ element => this.inputElement = element }
                    onKeyDown={ e => this.handleTyping(e) } >
                </textarea>
                <button className="chat-input-submit" type="submit">Enviar</button>
            </form>
        );
    }
}