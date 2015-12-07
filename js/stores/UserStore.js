// Vendor
import {EventEmitter} from 'events';
import assign from 'object-assign';
import _ from 'lodash';

// Dispatcher
import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import UserConstants from '../constants/UserConstants';

// Setup
var ActionTypes = UserConstants.ActionTypes;
var CHANGE_EVENT = 'change';

// Inital data
var _user = null; // set initial state in app.js when executing UserServerActionCreator.getFromSession('loggedInUser')

// Model functions
function _setUser(user) {
    _user = user;
}

// Store
var UserStore = assign({}, EventEmitter.prototype, {

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

    getLoggedInUser: function() {
        return _user;
    }

});

UserStore.dispatchToken = ChatAppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.USER_LOGIN:
            _setUser(action.user);
            UserStore.emitChange();
            break;

        case ActionTypes.RECEIVE_USER:
            _setUser(action.user);
            UserStore.emitChange();
            break;

        default:
            // do nothing
    }

});

module.exports = UserStore;
