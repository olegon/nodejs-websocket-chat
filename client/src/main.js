require('./normalize.css');
require('./animation.css');
require('./style.css');

var $ = require('jQuery');
var io = require('socket.io-client');

$(function () {
    var socket = io();

    var $chat = $('.chat-messages');
    var $input = $('.chat-input-text');
    var $form = $('.chat-input-form');

    function scrollToBottom() {
        var chat = $chat.get(0);
        chat.scrollTop = chat.scrollHeight;
    }

    window.addEventListener('resize', function(e) {
        scrollToBottom();
    });

    socket.on('new-message', function(chatMessage) {
        var html = (
            '<div class="chat-message">' +
            '<div class="username"></div>' +
            '<div class="message"></div>' +
            '</div>'
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


    $input.on('keydown', function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            enviarMensagem();
        }
    });

    $form.on('submit', function(e) {
        e.preventDefault();
        enviarMensagem();
    });

    function enviarMensagem() {
        var mensagem = $input.val();

        if (mensagem != '') {
            socket.emit('new-message', mensagem);

            $input.val('');
        }
    }
});
