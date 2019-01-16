import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { userActions } from "../actions/UserActions";
import Login from "../utils/Login";

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.onHandleClick();
    }
  };

  onHandleClick = () => {
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
        var userToSave = JSON.stringify(res.user);
        sessionStorage.setItem("user", userToSave);
        this.props.history.push("/home");
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
    const { username, password } = this.state;

    return (
      <FormControl
        container
        style={{
          marginTop: 60,
          alignItems: "center",
          alignContent: "center"
        }}
      >
        <Typography gutterBottom variant='outlined' component='h1'>
          sign in
        </Typography>

        <TextField
          id='outlined-dense'
          label='username'
          variant='outlined'
          margin='normal'
          onChange={this.handleChange("username")}
          value={username}
          placeholder='username'
        />
        <TextField
          id='outlined-dense'
          label='password'
          margin='normal'
          variant='outlined'
          onChange={this.handleChange("password")}
          value={password}
          onKeyPress={this.handleKeyPress}
          type='password'
          placeholder='********'
        />
        <Button
          size='large'
          variant='outlined'
          color='primary'
          margin='normal'
          type='submit'
          onClick={this.onHandleClick}
        >
          LOGIN
        </Button>
      </FormControl>
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
export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(LoginForm)
);
