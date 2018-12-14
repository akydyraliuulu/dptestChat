import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "../App.css";
import Main from "./Main";
import NoMatch from "./NoMatch";
import Registration from "./Registration";
import Welcome from "./Welcome";
import ProfileSettings from "./ProfileSettings";

class App extends Component {
  render() {
    let logedIn = false;
    let user = sessionStorage.getItem("user");
    user = JSON.parse(user);
    if (!user) {
      logedIn = false;
    } else {
      logedIn = true;
    }
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Welcome />} />

          <Route exact path="/notfound" component={NoMatch} />

          <Route
            exact
            path="/main"
            render={() => (logedIn ? <Main /> : <Redirect to="/" />)}
          />
          <Route
            exact
            path="/profileSettings"
            render={() => (logedIn ? <ProfileSettings /> : <Redirect to="/" />)}
          />

          <Route exact path="/registration" render={() => <Registration />} />

          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
