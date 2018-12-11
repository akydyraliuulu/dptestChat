import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";

class Registration extends Component {
  render() {
    return (
      <div className="sign_up">
        <div style={{ marginTop: 60 }}>
          <Link to="/" className="ui right floated blue button">
            LOGIN
          </Link>
        </div>

        <RegistrationForm />
      </div>
    );
  }
}

export default withRouter(connect(null)(Registration));
