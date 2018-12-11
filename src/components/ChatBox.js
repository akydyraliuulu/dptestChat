import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { userActions } from "../actions/UserActions";
import { store } from "../index";
import { Button } from "@material-ui/core";

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
      <div className="list" style={{ top: 60,justifyContent:'center', alignItems:'center' }}>
        <Button color="primary" className="button" onClick={this.resetUser}>
          online users:
        </Button>
        <div className="ui left floated horizontal list">{listItems}</div>
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
