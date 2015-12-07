// Vendor
import React from 'react';
import mui, {FlatButton} from 'material-ui';

// Actions
import UserActionCreators from './../actions/UserActionCreators.js';

var Logout = React.createClass({

    _logoutHandler: function() {
        UserActionCreators.logout();
    },

    render() {

        return(
            <div>
                <FlatButton label="Logout" onClick={this._logoutHandler} />
            </div>
        );
    }
});

export default Logout;