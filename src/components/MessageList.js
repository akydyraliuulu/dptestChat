import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { store } from "../index";
class MessageList extends Component {
  render() {
    return (
      <div className="ui segment">
        {this.props.messages.map(message => {
          return (
            <div className="ui list" key={message.id}>
              <p className="ui green label">{message.senderName}</p>{" "}
              {message.msg}
            </div>
          );
        })}
      </div>
    );
  }
}
function mapStateToProps({ user }) {
  return {
    user
  };
}

export default withRouter(connect(mapStateToProps)(MessageList));
