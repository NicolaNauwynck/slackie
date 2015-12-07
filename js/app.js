// vendor
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin'; injectTapEventPlugin();
import $ from 'jquery';

// Routing
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

// import routes
import ChatRoomApp from './components/ChatRoomApp.js';
import Home from './components/Home.js';

// Material-ui
const ThemeManager = require('./../node_modules/material-ui/lib/styles/theme-manager');
const MyRawTheme = require('./theme.js');

// Components
import Header from './components/Header.js';
import Login from './components/Login.js';

// Stores
import UserStore from './stores/UserStore.js';

// Actions
import UserActionCreators from './actions/UserActionCreators.js';

// Sockets
$.connection.hub.url = "http://slackie.azurewebsites.net/signalr";

// Set initial userStore
UserActionCreators.receiveLoggedInUser();

// get State
function getStateFromStores() {
    return {
        loggedInUser: UserStore.getLoggedInUser()
    };
}

// Base component
var App = React.createClass({

    // Setup Material-ui
    childContextTypes: {
        muiTheme: React.PropTypes.object,
    },

    // Setup Material-ui
    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
        };
    },

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

    // Render Base-view
    render() {

        // If user is loggedin --> start routing else --> show login
        var content = <Login />;
        if(this.state.loggedInUser) {
            content = <RouteHandler />;
        }

        return (
            <div>
                {/* Always show header and nav */}
                <Header />

                {/* this is the important part */}
                <div className="content">
                    {content}
                </div>
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

// Routing
var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="home" path="/" handler={Home}/>
        <Route name="room" path="/room/:id/:name" handler={ChatRoomApp}/>
    </Route>
);

Router.run(routes, function (Handler) {
        ReactDOM.render(<Handler/>, document.getElementById('react'));
});