import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Grid } from "semantic-ui-react";
import UserSocket from "../socket/socketsApi";
import Logout from "../utils/Logout";
class LogoutComponent extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: this.props.username,
    };
  }

  

  logoutRequest = () => {
    let logoutRequest = new Logout();
    logoutRequest.data = {
      user: {
        username: "noname",
        password: 123456
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
        //UserSocket.connect();
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
      <Grid textalign="right" style={{ marginTop: 60 }}>
        <Grid.Column textalign="right">
          <button
            className="ui right floated right labeled icon button"
            onClick={() => this.logoutRequest()}
          >
            <i className="right arrow icon" />
            LOGOUT
          </button>
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default withRouter(connect(mapStateToProps)(LogoutComponent));
