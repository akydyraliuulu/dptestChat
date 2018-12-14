import { TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import PhotoIcon from "@material-ui/icons/Photo";
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
    this.state = {
      value: "",
      openSticker: true
    };
  }

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.sendMessage();
    }
  };

  sendMessage = e => {
    if (this.state.value !== "") {
      let msg = {
        senderId: this.props.user.userId,
        receiverId: this.props.receiverUser.userId,
        text: this.state.value,
        image: "image",
        sticker: "sticker"
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

  handleClickSendSticker = () => {
    this.setState(state => ({ openSticker: !state.openSticker }));
  };

  handleClickImage = () => {
    alert("send image");
  };

  render() {
    return (
      <Paper>
        <Button variant="text">
          <Typography gutterBottom="false" variant="caption" component="h6">
            {this.props.receiverUser === ""
              ? "all:"
              : "@" + this.props.receiverUser.username}
          </Typography>
        </Button>

        <TextField
          onChange={this.onChange}
          value={this.state.value}
          type="text"
          id="outlined-dense"
          onKeyPress={this.handleKeyPress}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickSendSticker}
                >
                  {this.state.openSticker ? <TagFacesIcon /> : <KeyboardIcon />}
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickImage}
                >
                  <PhotoIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button
          style={{ height: 56 }}
          onClick={this.sendMessage}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          Send
        </Button>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messageReducer.messages,
    editMessage: state.messageReducer.editMessage,
    user: state.userReducer.user,
    receiverUser: state.userReducer.receiverUser
  };
};

MessageInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps)(MessageInput));
