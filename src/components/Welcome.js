import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

class Welcome extends Component {
  render() {
    return (
      <div className="sign_in">
        <div style={{ marginTop: 60, left: "0px" }}>
          <Link to="/registration">REGISTRATION</Link>
        </div>
        <LoginForm />
      </div>
    );
  }
}

export default withRouter(connect(null)(Welcome));
