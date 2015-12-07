// Vendor
import React from 'react';

// Components
import ChatRoom from './../components/ChatRoom.js';

// Stores
import MessageStore from './../stores/MessageStore.js';
import UserStore from './../stores/UserStore.js';

// Actions
import ChatMessageActionCreator from './../actions/ChatMessageActionCreators.js';

function getStateFromStores() {
    return {
        messages: MessageStore.getAll(4),
        loggedInUser: UserStore.getLoggedInUser()
    };
}

var ChatRoomApp = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function() {
        return getStateFromStores();
    },

    // If you need to interact with the browser, perform your work in componentDidMount()
    componentDidMount: function() {
        // Add change listeners
        MessageStore.addChangeListener(this._onChange);
        UserStore.addChangeListener(this._onChange);

        this.getEntityDataIfNeeded();
    },

    componentWillUnmount: function() {
        MessageStore.removeChangeListener(this._onChange);
        UserStore.removeChangeListener(this._onChange);
    },

    // Update room when using leftNav
    componentWillReceiveProps: function() {
        this.getEntityDataIfNeeded();
    },

    getEntityDataIfNeeded: function() {
        ChatMessageActionCreator.getAllMessagesByRoom(this.context.router.getCurrentParams().id);
    },

    render() {
        return (
            <ChatRoom name={this.context.router.getCurrentParams().name} id={this.context.router.getCurrentParams().id} messages={this.state.messages} loggedInUser={this.state.loggedInUser} />
        );
    },

    componentDidUpdate: function() {
        $("body").scrollTop(10000000);
    },

    /**
     * Event handler for 'change' events coming from the MessageStore and userStore
     */
    _onChange: function() {
        this.setState(getStateFromStores());
    }
});

module.exports = ChatRoomApp;