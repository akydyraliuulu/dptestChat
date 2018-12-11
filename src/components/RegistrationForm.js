import React, { Component } from "react";
import { connect } from "react-redux";
import Register from "../utils/Register";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import { userActions } from "../actions/UserActions";
import Login from "../utils/Login";
import { FormControl } from "@material-ui/core";
import PropTypes from "prop-types";

class RegistrationForm extends Component {
  state = {
    username: "",
    password: ""
  };

  onHandleClick = e => {
    const { username, password } = this.state;

    let signUpRequest = new Register();
    signUpRequest.data = {
      user: {
        username: username,
        password: password
      }
    };
    signUpRequest.onSuccess = this.onRegisteringSuccess;
    signUpRequest.send();
  };

  onRegisteringSuccess = res => {
    switch (res.status) {
      case "success":
        console.log("res.user");
        console.log(res.user);
        this.loginForm(res.user);
        break;
      case "error":
        console.log("errorResponse");
        break;
      default:
    }
  };

  loginForm = user => {
    let signInRequest = new Login();
    signInRequest.data = {
      user: {
        username: user.username,
        password: user.password
      }
    };
    signInRequest.onSuccess = this.onLoginSuccess;
    signInRequest.send();
  };

  onLoginSuccess = res => {
    switch (res.status) {
      case "success":
        this.props.login(res.user);
        let userToSave = JSON.stringify(res.user);
        sessionStorage.setItem("user", userToSave);
        this.props.history.push("/main");
        break;
      case "error":
        console.log("errorResponse");
        break;
      default:
    }
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { username, password } = this.state;

    return (
      <div style={{ marginTop: 60 }}>
        <FormControl className={classes.container}>
          <label className={classes.button}>
            <h3>sign up</h3>
          </label>
          <TextField
            id="outlined-dense"
            label="username"
            className={classNames(classes.textField)}
            variant="outlined"
            onChange={this.handleChange("username")}
            value={username}
            margin="dense"
            placeholder="username"
          />
          <TextField
            id="outlined-dense"
            label="password"
            className={classNames(classes.textField)}
            variant="outlined"
            onChange={this.handleChange("password")}
            value={password}
            margin="dense"
            type="password"
            placeholder="********"
          />
          <Button
            variant="contained"
            color="primary"
            margin="dense"
            className={classes.button}
            type="submit"
            onClick={this.onHandleClick}
          >
            REGISTER
          </Button>
        </FormControl>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: function(user) {
      dispatch(userActions.login(user));
    }
  };
}

RegistrationForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(withRouter(RegistrationForm))
);

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    margin: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit
  }
});
