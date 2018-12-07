import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
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

export default App;
