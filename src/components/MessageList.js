import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
class MessageList extends Component {
  render() {
    return (
      <div className="ui list">
        {this.props.messages.map(message => {
          return (
            <div className="ui list" key={message.createdOn}>
              <p className="ui green label">{message.senderName}</p>{" "}
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

export default withRouter(connect(mapStateToProps)(MessageList));
