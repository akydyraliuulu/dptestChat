import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import PhotoIcon from "@material-ui/icons/Photo";
import SendIcon from "@material-ui/icons/SendRounded";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import axios from "axios";
import classNames from "classnames";
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import uuid from "uuid";
import { messageActions } from "../actions/MessageActions";
import { store } from "../index";

const styles = {
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
};

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

  sendMessage = () => {
    if (this.state.value !== "") {
      console.log(this.props.editMessage.text);
      if (this.props.editMessage.text !== undefined) {
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
          receiverId: this.props.receiverUser.userId
            ? this.props.receiverUser.userId
            : "all",
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
    let msg = this.props.editMessage;
    msg.text = "";
    store.dispatch(messageActions.edit(msg));
  };

  handleClickSendSticker = () => {
    this.setState(state => ({ openSticker: !state.openSticker }));
  };

  onDrop = acceptedFiles => {
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
        receiverId: this.props.receiverUser.userId
          ? this.props.receiverUser.userId
          : "all",
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
    const { classes } = this.props;
    return (
      <Paper className={classes.root} elevation={1}>
        <Button variant='text'>
          <Typography variant='caption' component='h3'>
            {this.props.receiverUser === ""
              ? "all:"
              : "@" + this.props.receiverUser.username}
          </Typography>
        </Button>
        <IconButton
          className={classes.iconButton}
          onClick={this.handleClickSendSticker}
        >
          {this.state.openSticker ? <TagFacesIcon /> : <KeyboardIcon />}
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder={
            this.props.editMessage.text !== "" &&
            this.props.editMessage.text !== undefined
              ? "edit message"
              : "send message..."
          }
          onChange={this.onChange}
          onKeyPress={this.handleKeyPress}
          value={
            this.props.editMessage.text !== "" &&
            this.props.editMessage.text !== undefined
              ? this.props.editMessage.text
              : value
          }
          type='text'
        />
        <IconButton className={classes.iconButton}>
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
        <Divider className={classes.divider} />
        <IconButton
          onClick={this.sendMessage}
          color='primary'
          className={classes.iconButton}
        >
          <SendIcon />
        </IconButton>
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

export default withStyles(styles)(
  withRouter(connect(mapStateToProps)(MessageInput))
);
