import ChatServerActionCreators from '../actions/ChatServerActionCreators';

/**
 * Handles communication between client and server using XMLHttpRequests and sockets
 */
module.exports = {

    // Join the selected room and listen for new messages
    joinServer: function(roomId) {
        var chat = $.connection.chatHub;

        chat.client.broadcastMessage = function(name, content, room, type, time) {

            var message = {
                Name: name,
                Content: content,
                Room: room,
                Type: type,
                Timestamp: new Date(time)
            };

            ChatServerActionCreators.addMessage(message);
        };

        $.connection.hub.start().done(function() {
            chat.server.joinRoom(roomId);
        });
    }
};
