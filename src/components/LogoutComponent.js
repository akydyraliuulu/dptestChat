import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import UserSocket from "../socket/socketsApi";
import Logout from "../utils/Logout";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { FormLabel } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AccountIcon from "@material-ui/icons/AccountBox";
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

  onHandleClick = () => {
    this.props.history.push("/profileSettings");
  };

  onNameClick = () => {
    this.props.history.push("/main");
  };

  render() {
    return (
      <AppBar position="static" color="#009688">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Avatar
              onClick={() => this.onHandleClick()}
              style={{
                position: "absolute",
                right: 136,
                width: 40,
                height: 40,
                top: 16
              }}
            >
              <AccountIcon />
            </Avatar>
            <FormLabel onClick={() => this.onNameClick()}>
              {this.props.user.username}{" "}
            </FormLabel>
            <Button
              style={{ position: "absolute", right: 16, top: 16 }}
              className="colored primary"
              variant="outlined"
              color="primary"
              margin="normal"
              onClick={() => this.logoutRequest()}
            >
              LOGOUT
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

export default withRouter(connect(mapStateToProps)(LogoutComponent));
