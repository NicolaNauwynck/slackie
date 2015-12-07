import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import ChatConstants from '../constants/ChatConstants';

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

    addMessage: function(message) {
        ChatAppDispatcher.dispatch({
            type: ActionTypes.ADD_MESSAGE,
            message: message
        });
    },

    addMessages: function(messages) {
        ChatAppDispatcher.dispatch({
            type: ActionTypes.ADD_ALL_MESSAGES,
            messages: messages
        });
    }
};
