import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";
import LoginForm from "./LoginForm";

class Welcome extends Component {
  render() {
    return (
      <Container className="welcome" style={{ textAlign: "center" }}>
        <Grid style={{ marginTop: 60 }}>
          <Grid.Column textAlign="right" width={16}>
            <Link to="/registration" className="ui right floated blue button">REGISTRATION</Link>
          </Grid.Column>
        </Grid>

        <LoginForm />
      </Container>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

// export default withRouter(MainPage);
export default withRouter(connect(mapStateToProps)(Welcome));
