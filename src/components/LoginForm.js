import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import { userActions } from "../actions/UserActions";
import Login from "../utils/Login";
import { FormControl } from "@material-ui/core";
import PropTypes from 'prop-types';

class LoginForm extends Component {

  state = {
    username: "",
    password: ""
  };

  onHandleClick = e => {
    const { username, password } = this.state;

    console.log(username);
    console.log(password);

    let loginRequest = new Login();
    loginRequest.data = {
      user: {
        username: username,
        password: password
      }
    };
    loginRequest.onSuccess = this.onLoginSuccess;
    loginRequest.send();
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
        alert("username or password is incorrect!");
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
            <h3>sign in</h3>
          </label>

          <TextField
            id="outlined-dense"
            label="username"
            className={classNames(classes.textField)}
            variant="outlined"
            margin="dense"
            onChange={this.handleChange("username")}
            value={username}
            placeholder="username"
          />
          <TextField
            id="outlined-dense"
            label="password"
            margin="dense"
            className={classNames(classes.textField)}
            variant="outlined"
            onChange={this.handleChange("password")}
            value={password}
            type="password"
            placeholder="********"
          />
          <Button size="small"
            variant="contained"
            color="primary"
            margin="dense"
            className={classes.button}
            type="submit"
            onClick={this.onHandleClick}
          >
            LOGIN
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

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(withRouter(LoginForm))
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
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit
  }
});
