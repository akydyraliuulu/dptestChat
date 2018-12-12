import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { messageActions } from "../actions/MessageActions";
import getMessage from "../utils/GetMessage";
import { store } from "../index";
import { userActions } from "../actions/UserActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import Grid from "@material-ui/core/Grid";

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
      <Grid style={{ maxHeight: 500, padding: 20 }}>
        <PerfectScrollbar
          style={{
            maxHeight: 450,
            maxWidth: 450,
            overflow: "hidden",
            position: "absolute",
            height: "100%",
            left: "30%"
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
                  {message.senderName}

                  {":  "}
                  {message.text}
                </ListItem>
              );
            })}
          </List>
        </PerfectScrollbar>
      </Grid>
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
