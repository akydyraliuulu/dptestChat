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
import Typography from "@material-ui/core/Typography";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";

class MessageList extends Component {
  state = {
    anchorEl: null,
    open: false
  };

  handleClick = (id) => {
    console.log(id);
    // store.dispatch(userActions.setReceiver(name));
    this.setState(state => ({
      anchorEl: id.currentTarget,
      open: !state.open
    }));
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
    const id = open ? "simple-popper" : null;
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
                <ListItem aria-describedby={id} onClick={() => this.handleClick(message._id)}>
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
          <Popper id={id} open={open} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper style={{margin:20}}>
                  <Typography>The content of the Popper.</Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
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
