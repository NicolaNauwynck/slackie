import React from 'react';
import mui, {Card, CardHeader, CardText} from 'material-ui';
import moment from 'moment';

var Message = React.createClass({
    render() {
        return (
            <Card key={this.props.message.MessageId} className="card">
                <CardHeader
                    title={this.props.message.Name}
                    subtitle={moment(this.props.message.Timestamp).fromNow()}
                    avatar={"http://www.gravatar.com/avatar/11111111111111" + this.props.message.Name.length + "" + this.props.message.Name.charCodeAt() + "?s=32&d=identicon&r=PG"}/>

                <CardText>
                    {this.props.message.Content}
                </CardText>
            </Card>
        );
    }
});

module.exports = Message;