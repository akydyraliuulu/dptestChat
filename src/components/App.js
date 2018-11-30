import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import { loginRedux } from "../actions/UserActions";
import "../App.css";
import Main from "./Main";
import NoMatch from "./NoMatch";
import Registration from "./Registration";
import Welcome from "./Welcome";

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Welcome />} />

          <Route exact path="/notfound" component={NoMatch} />

          <Route exact path="/main" render={() => <Main />} />

          <Route exact path="/registration" render={() => <Registration />} />

          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mapDispatchToLogin: data => dispatch(loginRedux({ params: data }))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
