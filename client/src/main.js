import './normalize.css';
import './animation.css';
import './style.css';

import $ from 'jquery';
import io from 'socket.io-client';
import { watcher } from './typing-control.js';

$(function () {
    const socket = io();

    let iid = null;
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

    socket.on('user-connect', function (data) {
        console.log(data);

        iid = data.iid;
    });

    socket.on('user-message', function(chatMessage) {
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

    socket.on('users-typing', function (data) {
        const $container = $('.user-typing');
        $container.html('');

        const users = data.users
        .filter(({ iid: _iid } ) => _iid != iid);

        if (users.length > 0) {
            const template = `<span></span>`;

            users
            .map(({ username }) => {
                const $element = $(template);

                $element.text(`O usuário ${username} está digitando.`);

                return $element;
            })
            .forEach($element => {
                $container.append($element)
            });

            $container.css({
                'opacity': '1.0'
            });
        }
        else {
            $container.css({
                'opacity': '0.0'
            });
        }
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

    typingWatcher.addEventListener('user-begin-typing', function () {
        socket.emit('user-begin-typing');
    });

    typingWatcher.addEventListener('user-end-typing', function () {
        socket.emit('user-end-typing');
    });

    function enviarMensagem() {
        var mensagem = $input.val();

        if (mensagem != '') {
            socket.emit('user-message', mensagem);

            $input.val('');
        }
    }
});
