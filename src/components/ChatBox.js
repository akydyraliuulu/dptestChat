import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { messageActions } from "../actions/MessageActions";
import getMessage from "../utils/GetMessage";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

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

  state = {
    sendTo: "all"
  };

  handleClick = name => {
    this.setState({
      sendTo: name
    });
  };

  resetUser = e => {
    this.setState({
      sendTo: "all"
    });
  };

  render() {
    console.log(this.props.users);

    const listItems = this.props.users.map((item, i) => (
      <a
        className="ui green label"
        key={i}
        value={item.username}
        onClick={() => this.handleClick(item.username)}
      >
        {item.username}
      </a>
    ));
    return (
      <div className="ui segment" style={{ top: 60 }}>
        <a className="ui left floated button label" onClick={this.resetUser}>
          online users:
        </a>
        <div className="ui left floated horizontal list">{listItems}</div>
        <br />
        <br />

        <MessageList />
        <MessageInput sendTo={this.state.sendTo} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    users: state.userReducer.users
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
  )(ChatBox)
);
