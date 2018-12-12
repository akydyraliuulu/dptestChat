import { TextField, Typography, InputLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { messageActions } from "../actions/MessageActions";
import { store } from "../index";
import SendMessage from "../utils/SendMessage";

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  state = {
    value: ""
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.sendMessage();
    }
  };

  sendMessage = e => {
    if (this.state.value !== "") {
      let msg = {
        senderName: this.props.user.username,
        receiverName: e.target.value,
        text: this.state.value
      };

      store.dispatch(messageActions.add(msg));
      this.setState({
        value: ""
      });

      let sendMessageRequest = new SendMessage();
      sendMessageRequest.data = msg;
      sendMessageRequest.onSuccess = this.onSendMessageSuccess;
      sendMessageRequest.send();
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
      <div style={{ position: "absolute", bottom: "10%", left: "30%" }}>
        <InputLabel>
          <Typography gutterBottom="false" component="h1">
            {this.props.name === "all" ? "all:" : "@" + this.props.name}
          </Typography>
        </InputLabel>
        <TextField
          onChange={this.onChange}
          value={this.state.value}
          type="text"
          id="outlined-dense"
          label="message"
          onKeyPress={this.handleKeyPress}
          variant="outlined"
        />
        <Button
          style={{ margin: 5 }}
          onClick={this.sendMessage}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          Send
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messageReducer.messages,
    user: state.userReducer.user,
    name: state.userReducer.name
  };
};

MessageInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps)(MessageInput));
