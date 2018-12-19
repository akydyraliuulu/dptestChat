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

const imgUrl = 'data:image/jpeg;base64,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'

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
              src={imgUrl}
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
