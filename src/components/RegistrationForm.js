import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button, Container, Form, Input } from "semantic-ui-react";
import { userActions } from "../actions/UserActions";
import Register from "../utils/Register";

class RegistrationForm extends Component {
  state = {
    username: "",
    password: ""
  };

  onSubmit = () => {
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
      this.props.login(res.user);
        this.props.history.push("/main");
        break;
      case "error":
        console.log("errorResponse");
        break;
      default:
    }
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <Container className="ui segment" style={{ padding: 60 }}>
        <Form onSubmit={this.onSubmit} style={{ marginTop: 60 }}>
          <div>
            <label
              textalign="center"
              style={{ width: "100%", margin: 20 }}
              className="ui grey label"
            >
              {" "}
              <h1>REGISTRATION</h1>
            </label>
            <label>Username</label>
            <Input
              style={{ width: "100%", margin: 20 }}
              icon="mail outline"
              iconPosition="left"
              name="username"
              onChange={this.handleChange}
              value={username}
              placeholder="username"
            />
            <label>Password</label>
            <Input
              style={{ width: "100%", margin: 20 }}
              icon="key"
              iconPosition="left"
              name="password"
              onChange={this.handleChange}
              value={password}
              placeholder="********"
            />
            <Button
              className="ui green button"
              style={{ width: "100%", margin: 20 }}
              loading={this.state.loading}
              disabled={this.state.loading}
              type="submit"
            >
              REGISTER
            </Button>
          </div>
        </Form>
      </Container>
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
