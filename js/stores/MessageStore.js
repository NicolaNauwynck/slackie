// Vendor
import {EventEmitter} from 'events';
import assign from 'object-assign';
import _ from 'lodash';

// Dispatcher
import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import ChatConstants from '../constants/ChatConstants';

// Setup
var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

// Inital data
var _messages = {};

function _addMessages(messages) {
    _messages = messages;
}

function _addMessage(message) {
    _messages.push(message);
}

// Store
var MessageStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    get: function(id) {
        return _messages[id];
    },

    getAll: function(limit) {
        limit = limit || 50;

        return _.slice(_messages, _messages.length - limit, _messages.length);
        //return _messages;
    }
});

MessageStore.dispatchToken = ChatAppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.ADD_ALL_MESSAGES:
            _addMessages(action.messages);
            MessageStore.emitChange();
            break;

        case ActionTypes.ADD_MESSAGE:
            _addMessage(action.message);
            MessageStore.emitChange();
            break;
    }

});

module.exports = MessageStore;
