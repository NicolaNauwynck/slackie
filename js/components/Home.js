// Vendors
import React from 'react';
import mui from 'material-ui';

// Stores
import UserStore from './../stores/UserStore';

// get State
function getStateFromStores() {
    return {
        loggedInUser: UserStore.getLoggedInUser()
    };
}

var HomeRoute = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    // If you need to interact with the browser, perform your work in componentDidMount()
    componentDidMount: function() {
        UserStore.addChangeListener(this._onUserStoreChange);
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onUserStoreChange);
    },

    render() {

        return (
        	<div className="user">
            <img src="https://cdn.auth0.com/blog/react-js/react.png" />
	    		<h1>{this.state.loggedInUser}</h1>

	    	</div>
        );
    },

    /**
     * Event handler for 'change' events coming from the MessageStore
     */
    _onUserStoreChange: function() {
        this.setState(getStateFromStores());
    }
});

module.exports = HomeRoute;