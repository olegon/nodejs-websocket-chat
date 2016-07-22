import './normalize.css';
import './animation.css';
import './style.css';

import $ from 'jQuery';
import io from 'socket.io-client';
import { watcher } from './typing-control.js';

$(function () {
    const socket = io();

    const $chat = $('.chat-messages');
    const $input = $('.chat-input-text');
    const $form = $('.chat-input-form');
    const typingWatcher = watcher();

    function scrollToBottom() {
        var chat = $chat.get(0);
        chat.scrollTop = chat.scrollHeight;
    }

    window.addEventListener('resize', function(e) {
        scrollToBottom();
    });

    socket.on('new-message', function(chatMessage) {
        var html = (
            `<div class="chat-message">
                <div class="username"></div>
                <div class="message"></div>
            </div>`
        );

        var $element = $(html);

        $('.username', $element)
            .css({
                'color': chatMessage.color
            })
            .text(chatMessage.username);

        $('.message', $element)
            .text(chatMessage.message);

        $chat.append($element);
        scrollToBottom();
    });

    socket.on('begin-typing', function (data) {
        console.log('begin-typing', data);
        $('.user-typing')
            .css({
                'opacity': '1.0'
            })
            .text(`O usuário ${data.username} está digitando.`);
    });

    socket.on('end-typing', function (data) {
        console.log('end-typing', data);
        $('.user-typing')
            .css({
                'opacity': '0.0'
            })
            .text('');
    });

    $input.on('keydown', function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            enviarMensagem();
        }
    });

    $input.on('input', function (e) {
        typingWatcher.activeTyping();
    });

    $form.on('submit', function(e) {
        e.preventDefault();
        enviarMensagem();
    });

    typingWatcher.addEventListener('begin-typing', function () {
        console.log('begin-typing');
        socket.emit('begin-typing');
    });

    typingWatcher.addEventListener('end-typing', function (dta) {
        console.log('end-typing');
        socket.emit('end-typing');
    });

    function enviarMensagem() {
        var mensagem = $input.val();

        if (mensagem != '') {
            socket.emit('new-message', mensagem);

            $input.val('');
        }
    }
});
