import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import UserConstants from '../constants/UserConstants';
import SessionUtils from './../utils/SessionUtils.js';

var ActionTypes = UserConstants.ActionTypes;

module.exports = {

    login: function(user) {
        SessionUtils.addToSession('loggedInUser', user);
        ChatAppDispatcher.dispatch({
            type: ActionTypes.USER_LOGIN,
            user: user
        });
    },

    receiveLoggedInUser: function() {
        ChatAppDispatcher.dispatch({
            type: ActionTypes.RECEIVE_USER,
            user: SessionUtils.getFromSession('loggedInUser')
        });
    }
};
