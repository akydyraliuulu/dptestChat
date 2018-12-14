import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import React, { Component } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { messageActions } from "../actions/MessageActions";
import { userActions } from "../actions/UserActions";
import { store } from "../index";
import getMessage from "../utils/GetMessage";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const options = ["Edit", "Delete"];

class MessageList extends Component {
  state = {
    anchorEl: null,
    open: false,
    selectedIndex: 1
  };

  handleClick = event => {
    // console.log(id);
    // store.dispatch(userActions.setReceiver(name));
    this.setState({ anchorEl: event.currentTarget, open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, open: !this.state.open });
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
    const { anchorEl, open } = this.state;
    return (
      <div style={{ maxWidth: 550, padding: 10, alignItems: "center" }}>
        <PerfectScrollbar
          style={{
            maxHeight: 550,
            minHeight: 550,
            overflow: "hidden",
            height: "100%"
          }}
        >
          <List>
            {this.props.messages.map(message => {
              return (
                <ListItem
                  button
                  aria-haspopup="true"
                  aria-controls="lock-menu"
                  aria-label="When device is locked"
                  onClick={this.handleClick}
                >
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                  <ListItemText
                    primary={message.senderName}
                    secondary={message.text}
                  />
                </ListItem>
              );
            })}
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleClose}
          >
            {options.map((option, index) => (
              <MenuItem key={option} onClick={this.handleClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </PerfectScrollbar>
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
