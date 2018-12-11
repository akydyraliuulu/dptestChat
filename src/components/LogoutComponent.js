import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import UserSocket from "../socket/socketsApi";
import Logout from "../utils/Logout";
class LogoutComponent extends Component {
  logoutRequest = () => {
    let logoutRequest = new Logout();
    logoutRequest.data = {
      user: {
        username: this.props.user.username,
        password: this.props.user.password
      }
    };
    logoutRequest.onSuccess = this.onLogoutSuccess;
    logoutRequest.send();
  };

  onLogoutSuccess = res => {
    switch (res.status) {
      case "success":
        sessionStorage.setItem("user", null);
        UserSocket.disconnect();
        this.props.history.push("/");
        break;
      case "error":
        alert("something was error!");
        console.log("errorResponse");
        break;
      default:
    }
  };

  render() {
    return (
      <div textalign="right" style={{ marginTop: 60 }}>
        <div textalign="right">
          <label className="ui label">{this.props.user.username} </label>
          <button
            className="ui right floated right labeled icon button"
            onClick={() => this.logoutRequest()}
          >
            <i className="right arrow icon" />
            LOGOUT
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

export default withRouter(connect(mapStateToProps)(LogoutComponent));
