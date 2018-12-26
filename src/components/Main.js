import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { userActions } from "../actions/UserActions";
import UserSocket from "../socket/socketsApi";
import ChatBox from "./ChatBox";
import LogoutComponent from "./LogoutComponent";

class Main extends Component {
  constructor(props) {
    super(props);
    let user = sessionStorage.getItem("user");
    user = JSON.parse(user);
    if (user && user !== null && user.username !== "") {
      this.props.login(user);
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
function mapDispatchToProps(dispatch) {
  return {
    login: function(user) {
      dispatch(userActions.login(user));
    }
  };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
