import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import SendMessage from "../utils/SendMessage";
import { store } from "../index";
import {messageActions} from "../actions/MessageActions"

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  state = {
    value: ""
  };

  sendMessage = e => {
    if (this.state.value !== '') {
      let msg = {
        senderName: "noname",
        createdOn: Date.now(),
        message: this.state.value
      };

      store.dispatch(messageActions.add(msg))
      this.setState({
        value: ""
      });
      const saved = store.getState().msg
      console.log(saved)

    //   let sendMessageRequest = new SendMessage();
    //   sendMessageRequest.data = msg;
    //   sendMessageRequest.onSuccess = this.onSendMessageSuccess;
    //   sendMessageRequest.send();
    } else {
      alert("message is empty");
    }
  };

  onSendMessageSuccess = res => {
    switch (res.status) {
      case "success":
        console.log("Response");
        console.log(res.mData);
        this.setState({
          value: ""
        });
        alert("message have been sent successfully");
        break;
      case "error":
        alert("something was error!");
        console.log("errorResponse");
        break;
      default:
    }
  };

  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    return (
      <div className="ui input">
        <input onChange={this.onChange} value={this.state.value} type="text" />
        <button
          onClick={this.sendMessage}
          className="ui primary button"
          type="submit"
        >
          Send
        </button>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default withRouter(connect(mapStateToProps)(MessageInput));
