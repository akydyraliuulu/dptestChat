import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import UserSocket from "../socket/socketsApi";
import Logout from "../utils/Logout";
import Button from "@material-ui/core/Button"
import { FormLabel } from "@material-ui/core";
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
          <FormLabel >{this.props.user.username} </FormLabel>
          <Button
            className="colored primary"
            variant="contained"
            color="primary"
            margin="dense"
            onClick={() => this.logoutRequest()}
          >
            LOGOUT
          </Button>
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
