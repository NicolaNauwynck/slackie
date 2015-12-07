// Vendor
import React from 'react';
import mui from 'material-ui';
import moment from 'moment';

// Components
import ChatField from './../components/ChatField.js';
import Message from './../components/Message.js';

var ChatRoom = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render() {

        var cards = [];

        if(this.props.messages) {
            for(var i = 0, l = this.props.messages.length; i < l; i++) {
                cards.push(<Message key={i} message={this.props.messages[i]} />);
            }
        }

        return (
            <div>
                <h1>#{this.props.name}</h1>
                <div>{cards}</div>
                <ChatField room={this.context.router.getCurrentParams().id} loggedInUser={this.props.loggedInUser} />
            </div>
        );
    }
});

module.exports = ChatRoom;