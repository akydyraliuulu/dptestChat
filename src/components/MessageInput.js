import { TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import PhotoIcon from "@material-ui/icons/Photo";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import axios from "axios";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { messageActions } from "../actions/MessageActions";
import { store } from "../index";
import uuid from "uuid";

class MessageInput extends Component {
  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      value: "",
      openSticker: true,
      image: null,
      imageName: "image"
    };
  }

  componentDidMount() {
    console.log("messageinput %s!", JSON.stringify(this.props.editMessage));
    this.setState({ value: this.props.editMessage.text });
  }

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.sendMessage();
    }
  };

  sendMessage = e => {
    if (this.state.value !== "") {
      console.log(this.props.editMessage.text);
      if (
        this.props.editMessage.text !== "" &&
        this.props.editMessage.text !== undefined
      ) {
        let msg = {
          msgId: this.props.editMessage.msgId,
          text: this.state.value,
          sticker: "sticker"
        };
        axios.post("/api/messages/edit", msg).then(res => {
          console.log("res", res);
          store.dispatch(messageActions.edit({}));
          this.onSendMessageSuccess(res.data);
        });
      } else {
        let msg = {
          senderId: this.props.user.userId,
          receiverId: this.props.receiverUser.userId,
          text: this.state.value,
          sticker: "sticker"
        };
        axios.post("/api/messages", msg).then(res => {
          console.log("res", res);
          this.onSendMessageSuccess(res.data);
        });
      }
    } else {
      alert("message is empty");
    }
  };

  onSendMessageSuccess = res => {
    switch (res.status) {
      case "success":
        console.log("Response");
        console.log(res.messages);
        store.dispatch(messageActions.add(res.messages));
        this.setState({
          value: "",
          image: null,
          imageName: "image"
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

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({
      image: acceptedFiles[0],
      imageName: acceptedFiles[0].name
    });
    let reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = e => {
      console.log("img data", e.target.result);

      let msg = {
        senderId: this.props.user.userId,
        receiverId: this.props.receiverUser.userId,
        text: this.state.value,
        uniqId: uuid(),
        image: e.target.result,
        sticker: "sticker",
        imgName: acceptedFiles[0].name
      };

      console.log("msg", msg);

      axios.post("/api/messages/image", msg).then(res => {
        console.log("res", res);
        if (res.data.status === "success") {
          store.dispatch(messageActions.add(res.data.messages));
          this.setState({
            value: "",
            image: null,
            imageName: "image"
          });
        }
      });
    };
  };

  render() {
    let { value } = this.state;
    return (
      <Paper>
        <Button variant="text">
          <Typography variant="caption" component="h6">
            {this.props.receiverUser === ""
              ? "all:"
              : "@" + this.props.receiverUser.username}
          </Typography>
        </Button>

        <TextField
          onChange={this.onChange}
          value={value}
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
                <IconButton>
                  <Dropzone onDrop={this.onDrop}>
                    {({ getRootProps, getInputProps, isDragActive }) => {
                      return (
                        <div
                          {...getRootProps()}
                          className={classNames("dropzone", {
                            "dropzone--isActive": isDragActive
                          })}
                        >
                          <input {...getInputProps()} />
                          {isDragActive ? <PhotoIcon /> : <PhotoIcon />}
                        </div>
                      );
                    }}
                  </Dropzone>
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
