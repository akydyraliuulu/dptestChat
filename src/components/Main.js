import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class Main extends Component {
  logoutRequest = () => {};

  render() {
    const user = this.props;

    return (
      <div className="main" style={{ textAlign: "center" }}>
        <div style={{ marginTop: 60 }}>
          <div>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => this.logoutRequest()}
            >
              logout
            </span>
          </div>
        </div>

        <div>
          <div>{JSON.stringify(user)}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default withRouter(connect(mapStateToProps)(Main));
