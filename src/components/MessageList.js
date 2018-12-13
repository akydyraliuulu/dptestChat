import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
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

class MessageList extends Component {
  state = {
    dense: false,
    secondary: false
  };

  handleClick = name => {
    store.dispatch(userActions.setReceiver(name));
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
                  className="list"
                  key={message.id}
                  color="primary"
                  className="header"
                  onClick={() => this.handleClick(message.senderName)}
                >
                  <Typography variant="headline" color="textPrimary" align="left">
                    {message.senderName}
                    {":  "}{" "}
                  </Typography>
                  <Typography variant="body1" style={{marginLeft:10}}>{message.text}</Typography>
                </ListItem>
              );
            })}
          </List>
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
