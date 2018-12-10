import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";
import RegistrationForm from "./RegistrationForm";

class Registration extends Component {
  render() {
    return (
      <Container className="sign_up" style={{ textalign: "center" }}>
        <Grid style={{ marginTop: 60 }}>
          <Grid.Column textalign="right" width={16}>
            <Link to="/" className="ui right floated blue button">
              LOGIN
            </Link>
          </Grid.Column>
        </Grid>

        <RegistrationForm />
      </Container>
    );
  }
}

export default withRouter(connect(null)(Registration));
