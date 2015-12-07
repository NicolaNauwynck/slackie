import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import ChatConstants from '../constants/ChatConstants';
import APIUtils from './../utils/APIUtils.js';

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

    joinServer: function(roomId) {
        APIUtils.joinServer(roomId);
    },

    getAllMessagesByRoom: function(roomId) {
        APIUtils.getAllMessagesByRoom(roomId);
    },

	createMessage: function(user, message, room) {
        APIUtils.socketCreateMessage(user, message, room);
    }

};
