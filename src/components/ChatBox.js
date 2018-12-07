import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

class ChatBox extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    sendTo: ""
  };

  handleClick = name => {
    this.setState({
      sendTo: "@" + name
    });
  };

  resetUser = e => {
    this.setState({
      sendTo: ""
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

export default withRouter(connect(mapStateToProps)(ChatBox));
