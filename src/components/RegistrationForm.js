import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button, Container, Form, Grid, Input } from "semantic-ui-react";
import { loginRedux } from "../actions/UserActions";
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
      <Container text className="registration_form">
        <Form onSubmit={this.onSubmit} style={{ marginTop: 60 }}>
          <Grid>
            <Grid.Column width={16}>
              <label textalign="center" style={{ width: "100%" }}>
                {" "}
                <h1>REGISTRATION</h1>
              </label>
            </Grid.Column>
            <br />
            <br />

            <Grid.Column textalign="left" width={16}>
              <label>Username</label>
              <Input
                style={{ width: "100%" }}
                icon="mail outline"
                iconPosition="left"
                name="username"
                onChange={this.handleChange}
                value={username}
                placeholder="username"
              />
            </Grid.Column>

            <Grid.Column textalign="left" width={16}>
              <label>Password</label>
              <Input
                style={{ width: "100%" }}
                icon="key"
                iconPosition="left"
                name="password"
                onChange={this.handleChange}
                value={password}
                placeholder="********"
              />
            </Grid.Column>

            <Grid.Column width={16}>
              <Button
                style={{ width: "100%" }}
                loading={this.state.loading}
                disabled={this.state.loading}
                type="submit"
              >
                REGISTER
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      </Container>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mapDispatchToLogin: data => dispatch(loginRedux({ params: data }))
  };
}

// export default withRouter(MainPage);
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegistrationForm)
);
