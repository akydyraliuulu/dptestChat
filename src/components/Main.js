import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { userActions } from "../actions/UserActions";
import { store } from "../index";
import UserSocket from "../socket/socketsApi";
import ChatBox from "./ChatBox";
import AppBarComponent from "./AppBarComponent";

class Main extends Component {
  constructor(props) {
    super(props);
    var user = sessionStorage.getItem("user");
    user = JSON.parse(user);
    if (user && user !== null && user.username !== "") {
      store.dispatch(userActions.login(user));
      UserSocket.disconnect();
      UserSocket.connectUser(user.userId, user.username);
    }
  }

  initSocket = () => {
    UserSocket.connect();
    UserSocket.connectUser(this.props.user.userId, this.props.user.username);
  };

  render() {
    return (
      <div>
        <AppBarComponent />
        <ChatBox />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

export default withRouter(connect(mapStateToProps)(Main));
