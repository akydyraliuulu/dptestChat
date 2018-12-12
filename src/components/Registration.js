import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import RegistrationForm from "./RegistrationForm";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class Registration extends Component {
  render() {
    return (
      <div>
        <AppBar position="static" color="#009688">
          <Toolbar>
            <Typography variant="h6">
              <Link to="/">
                <Button
                  className="colored primary"
                  variant="outlined"
                  style={{ position: "absolute", right: 16, bottom: 16 }}
                  color="primary"
                >
                  LOGIN
                </Button>
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <RegistrationForm />
      </div>
    );
  }
}

export default withRouter(connect(null)(Registration));
