import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { messageActions } from "../actions/MessageActions";
import getMessage from "../utils/GetMessage";
import { store } from "../index";
import { userActions } from "../actions/UserActions";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Scrollbar from 'perfect-scrollbar-react';
import 'perfect-scrollbar-react/dist/style.min.css';

class MessageList extends Component {

  state = {
    dense: false,
    secondary: false,
  };

  handleClick = name => {
    store.dispatch(userActions.setReceiver(name));
  };
  componentDidMount() {
    this.getMessages();
    setInterval(this.getMessages, 30000);
  }

  getMessages = () => {
    try {
      let getAllMessagesRequest = new getMessage();
      getAllMessagesRequest.onSuccess = this.onGotAllMessages;
      getAllMessagesRequest.send();
    } catch (e) {
      console.log(e);
    }
  };

  onGotAllMessages = res => {
    console.log("res.messages");
    console.log(res.messages);
    this.props.getAllMessages(res.messages);
  };

  render() {
    const { dense, secondary } = this.state;
    return (
      <div
        className="list-data"
        style={{ display: 'flex', maxHeight: '350px' }}
      >
      <Scrollbar>
      <List dense={dense}>
        {this.props.messages.map(message => {
          return (
            <ListItem className="list" key={message.id}
                color="primary"
                className="header"
                onClick={() => this.handleClick(message.senderName)}
             >
                {message.senderName}
            
              {":  "}
              {message.text}
            </ListItem>
          );
        })}
      </List>
      </Scrollbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messageReducer.messages,
    user: state.userReducer.user
  };
};
function mapDispatchToProps(dispatch) {
  return {
    getAllMessages: function(messages) {
      dispatch(messageActions.getAllMessages(messages));
    }
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MessageList)
);
