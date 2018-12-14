import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import LogoutComponent from "./LogoutComponent";
import { userActions } from "../actions/UserActions";
import { store } from "../index";

class ProfileSettings extends Component {
  constructor(props) {
    super(props);
    let user = sessionStorage.getItem("user");
    user = JSON.parse(user);
    if (user && user !== null && user.username !== "") {
      store.dispatch(userActions.login(user));
    }
  }

  render() {
    return (
      <div className="profileSettings" container spacing={24}>
        <LogoutComponent />
        <div>ProfileSettings</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

export default withRouter(connect(mapStateToProps)(ProfileSettings));
