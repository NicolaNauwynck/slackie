import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import ChatConstants from '../constants/ChatConstants';
import APIUtils from './../utils/APIUtils.js';

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

    joinServer: function(roomId) {
        APIUtils.joinServer(roomId);
    }

};
