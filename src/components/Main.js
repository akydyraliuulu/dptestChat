import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ChatBox from "./ChatBox";
import LogoutComponent from "./LogoutComponent";
import UserSocket from "../socket/socketsApi";
import { userActions } from "../actions/UserActions";
import { store } from "../index";

class Main extends Component {
  constructor(props) {
    super(props);
    let user = sessionStorage.getItem("user");
    user = JSON.parse(user);
    if (user && user !== null && user.username !== "") {
      store.dispatch(userActions.login(user));
      UserSocket.disconnect();
      UserSocket.connectUser(user.userId, user.username);
    } else {
      this.props.history.push("/");
    }
  }

  initSocket = () => {
    UserSocket.connect();
    UserSocket.connectUser(this.props.user.userId, this.props.user.username);
  };

  render() {
    return (
      <div className="main" container spacing={24}>
        <LogoutComponent />
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
