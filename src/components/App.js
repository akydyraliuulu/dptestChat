import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "../App.css";
import Home from "./Home";
import NoMatch from "./NoMatch";
import ProfileSettings from "./ProfileSettings";
import GiftEditor from "./giftsEditor";
import Registration from "./Registration";
import Welcome from "./Welcome";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

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
      <div className='App'>
        <Switch>
          <Route exact path='/' render={() => <Welcome />} />

          <Route exact path='/notfound' component={NoMatch} />

          <Route
            exact
            path='/home'
            render={() => (logedIn ? <Home /> : <Redirect to='/' />)}
          />
          <Route
            exact
            path='/giftEdit'
            render={() => (logedIn ? <GiftEditor /> : <Redirect to='/' />)}
          />
          <Route
            exact
            path='/profileSettings'
            render={() =>
              logedIn ? (
                <MuiThemeProvider>
                  <ProfileSettings />
                </MuiThemeProvider>
              ) : (
                <Redirect to='/' />
              )
            }
          />

          <Route exact path='/registration' render={() => <Registration />} />

          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
