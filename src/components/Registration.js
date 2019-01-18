import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";

class Registration extends Component {
  render() {
    return (
      <div>
        <AppBar position='static' color='inherit'>
          <Toolbar>
            <Typography variant='h6'>
              <Link to='/'>
                <Button
                  className='colored primary'
                  variant='outlined'
                  style={{ position: "absolute", right: 16, bottom: 16 }}
                  color='primary'
                >
                  LOGIN
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
          style={{ minHeight: "85vh" }}
        >
          <Grid>
            <RegistrationForm />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(connect(null)(Registration));
