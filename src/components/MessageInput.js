import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import SendMessage from "../utils/SendMessage";
import { store } from "../index";
import { messageActions } from "../actions/MessageActions";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { InputLabel, TextField } from "@material-ui/core";


const styles = theme => ({
  button: {
    margin: theme.spacing.unit* 1.5,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  textField: {
    margin: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});


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
    const { classes } = this.props;
    return (
      <div className="ui input">
        <InputLabel className="ui label" style={{ padding: 10 }}>
          {this.props.name === "all" ? "all:" : "@" + this.props.name}
        </InputLabel>
        <TextField 
          onChange={this.onChange} 
          value={this.state.value} 
          type="text"
          id="outlined-dense"
          label="message"
          margin="dense"
          className={classNames(classes.textField)}
          variant="outlined" />
        <Button
          style={{ padding: 10 }}
          onClick={this.sendMessage}
          type="submit"
          variant="contained" 
          color="primary" 
          size="large"
          className={classes.button}
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
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
  connect(
    mapStateToProps
  )(withRouter(MessageInput))
);
