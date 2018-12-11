import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { userActions } from "../actions/UserActions";
import { store } from "../index";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = name => {
    store.dispatch(userActions.setReceiver(name));
  };

  resetUser = e => {
    let name = "all";
    store.dispatch(userActions.setReceiver(name));
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
        <MessageInput />
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
