// Vendor
import React from 'react';
import mui, {Dialog, RaisedButton, FlatButton, TextField} from 'material-ui';

// Actions
import UserActionCreators from '../actions/UserActionCreators.js';

/**
 * This component shows login button and login dialog
 */
var Login = React.createClass({

    getInitialState: function(){
        return {showDialog: false};
    },

    // Login button onClick
    _openDialog: function() {
        this.setState({showDialog: true});
    },

    _cancelDialog: function() {
        this.setState({showDialog: false});
    },

    // Dialog submit button OnTouchTap
    _submitDialog: function() {

        var userName = this.refs.userName.getValue().trim();

        // valid userName?
        if(userName.length > 1) {
            UserActionCreators.login(userName);
            this.setState({showDialog: false});
        }
        else {
            console.log('Not valid!');
        }
    },

    render() {

        // Dialog actions
        var customActions = [
            <div key="actions">
                <FlatButton
                    key="cancel"
                    label="Cancel"
                    primary={false}
                    onTouchTap={this._cancelDialog} />
                <FlatButton
                    key="submit"
                    label="Submit"
                    primary={true}
                    onTouchTap={this._submitDialog} />
            </div>
        ];

        // Center login button
        var style = {
            center: {
                textAlign: 'center'
            }
        };

        return(
            <div className="content" style={style.center} >
                <RaisedButton label="Login" onTouchTap={this._openDialog} />
                <Dialog
                  title="Who are you?"
                  actions={customActions}
                  actionFocus="submit"
                  open={this.state.showDialog}
                  ref="dialogModal" >
                  <TextField ref="userName" hintText="Your name" />
                </Dialog>
            </div>
        );
    }
});

export default Login;