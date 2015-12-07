// Vendor
import React from 'react';
import mui, {AppBar, LeftNav, MenuItem} from 'material-ui';

// Actions
import ChatMessageActionCreator from './../actions/ChatMessageActionCreators.js';

var Header = React.createClass({

    contextTypes: {
        router: React.PropTypes.func.isRequired
    },

    // Open / close menu
    _toggleMenu: function() {
        this.refs.leftNav.toggle();
    },

    // Menu onCLick
    _onMenuItemChange: function(e, key, payload) {
        this.context.router.transitionTo(payload.route, payload.params);
        if (payload.params.id) {
            ChatMessageActionCreator.joinServer(payload.params.id);
        }
    },

    render() {

        var menuItems = [
            {
                route: 'home',
                params: {},
                text: 'Home'
            },
            {
                type: MenuItem.Types.SUBHEADER,
                text: 'Rooms'
            },
            {
                route: 'room',
                params: {id: 'football', name: 'Football'},
                text: 'Football'
            },
            {
                route: 'room',
                params: {id: 'cod4', name: 'Call of duty 4'},
                text: 'Call of duty 4'
            },
            {
                route: 'room',
                params: {id: 'work', name: 'Work'},
                text: 'Work'
            }
        ];

        return (
            <div>
                <AppBar title="Slackie" onLeftIconButtonTouchTap={this._toggleMenu} isInitiallyOpen={true} />
                <LeftNav ref="leftNav" docked={false} menuItems={menuItems} onChange={this._onMenuItemChange} />
            </div>
        );
    }
});

module.exports = Header;