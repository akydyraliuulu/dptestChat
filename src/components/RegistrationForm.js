import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { userActions } from "../actions/UserActions";
import Login from "../utils/Login";
import Register from "../utils/Register";
import Input from "@material-ui/core/Input";
import Avatar from "@material-ui/core/Avatar";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";

class RegistrationForm extends Component {
  state = {
    username: "",
    password: "",
    error: "",
    required: "",
    file: null
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.onHandleClick();
    }
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
        console.log(res.hint);
        if (res.hint === "required") {
          if (this.state.username === "") {
            this.setState({ error: "username is required" });
          } else if (this.state.password === "") {
            this.setState({ required: "password is required" });
          }
        }
        break;
      case "verifiedTrue":
        console.log("verifiedTrue");
        console.log(res.error);
        this.setState({ error: res.error });
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
    if (name === "username") {
      this.setState({ error: "" });
    } else {
      this.setState({ required: "" });
    }
  };

  onImageChange = event => {
    if (event.target.files[0]) {
      this.setState({
        file: URL.createObjectURL(event.target.files[0])
      });
      console.log("event.target");
      console.log(URL.createObjectURL(event.target.files[0]));
    }
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
        <Typography gutterBottom variant="outlined" component="h1">
          sign up
        </Typography>
        <Input
          style={{ display: "none" }}
          type="file"
          onChange={this.onImageChange}
          inputRef={fileInput => (this.fileInput = fileInput)}
        />
        <Avatar
          style={{
            margin: 10,
            width: 70,
            height: 70
          }}
          onClick={() => this.fileInput.click()}
          src={this.state.file}
        >
          <AddPhotoIcon />
        </Avatar>

        <TextField
          id="outlined-dense"
          label={this.state.error ? this.state.error : "username"}
          variant="outlined"
          margin="normal"
          onChange={this.handleChange("username")}
          value={username}
          onKeyPress={this.handleKeyPress}
          error={this.state.error}
          placeholder="username"
        />
        <TextField
          id="outlined-dense"
          label={this.state.required ? this.state.required : "password"}
          margin="normal"
          variant="outlined"
          onChange={this.handleChange("password")}
          value={password}
          onKeyPress={this.handleKeyPress}
          type="password"
          error={this.state.required}
          placeholder="********"
        />
        <Button
          size="large"
          variant="outlined"
          color="primary"
          margin="normal"
          type="submit"
          onClick={this.onHandleClick}
        >
          REGISTER
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
  )(RegistrationForm)
);
