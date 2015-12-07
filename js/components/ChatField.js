// Vendor
import React from 'react';
import mui, {Avatar, TextField, RaisedButton, Card, CardText} from 'material-ui';
import ChatMessageActionCreator from './../actions/ChatMessageActionCreators.js';

// Stores
import UserStore from './../stores/UserStore';

// get State
function getStateFromStores() {
    return {
        loggedInUser: UserStore.getLoggedInUser()
    };
}

var ChatField = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    _sendMessage: function() {
        var room = this.props.room,
            message = this.refs.chatField.getValue(),
            user = this.props.loggedInUser;

        if(room && message && user) {
            ChatMessageActionCreator.createMessage(user, message, room, "normal", new Date());
            //reset field
            this.refs.chatField.clearValue();
        }
        else {
            console.log('Empty fields');
        }
    },

    render() {

        // React styling
        var style = {
            avatar: {
               float: 'left',
               display: 'block',
               width: '11%',
               padding: '8px 1%'
            },
            textField: {
                float: 'left',
                display: 'block',
                width: '64%'
            },
            button: {
                float: 'left',
                display: 'block',
                width: '23%',
                padding: '10px 0'
            }
        };

        return (
            <Card>
                <CardText>
                    <div className="cf">
                        <div style={style.avatar}>
                            <Avatar src={"http://www.gravatar.com/avatar/11111111111111"+this.state.loggedInUser.length+""+this.state.loggedInUser.charCodeAt()+ "?s=32&d=identicon&r=PG"} />
                        </div>
                        <div style={style.textField}>
                            <TextField ref="chatField" hintText="Say something nice" multiLine={true} />
                        </div>
                        <div style={style.button}>
                            <RaisedButton label="Send" onClick={this._sendMessage} />
                        </div>
                    </div>
                </CardText>
            </Card>
        );
    }
});

module.exports = ChatField;