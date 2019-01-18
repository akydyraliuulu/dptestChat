import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

class Welcome extends Component {
  render() {
    return (
      <div>
        <AppBar position='static' color='inherit'>
          <Toolbar>
            <Typography variant='h6'>
              <Link to='/registration'>
                <Button
                  variant='outlined'
                  style={{ position: "absolute", right: 16, bottom: 16 }}
                  color='primary'
                >
                  REGISTRATION
                </Button>
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
          spacing={0}
          direction='column'
          alignItems='center'
          justify='center'
          style={{ minHeight: "90vh" }}
        >
          <Grid>
            <LoginForm />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(connect(null)(Welcome));
