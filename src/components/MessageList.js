import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { messageActions } from "../actions/MessageActions";
import getMessage from "../utils/GetMessage";
import { store } from "../index";
import { userActions } from "../actions/UserActions";
class MessageList extends Component {
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
    return (
      <div className="ui list">
        {this.props.messages.map(message => {
          return (
            <div className="ui list" key={message.id}>
              <p
                className="ui green image header"
                onClick={() => this.handleClick(message.senderName)}
              >
                {message.senderName}
              </p>
              {":  "}
              {message.text}
            </div>
          );
        })}
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
