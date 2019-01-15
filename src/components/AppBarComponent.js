import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountIcon from "@material-ui/icons/AccountBox";
import HomeIcon from "@material-ui/icons/Home";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import UserSocket from "../socket/socketsApi";
import { withStyles } from "@material-ui/core/styles";
import Logout from "../utils/Logout";


const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class AppBarComponent extends Component {
  state = {
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logoutRequest = () => {
    let logoutRequest = new Logout();
    logoutRequest.data = {
      user: {
        username: this.props.user.username,
        password: this.props.user.password
      }
    };
    logoutRequest.onSuccess = this.onLogoutSuccess;
    logoutRequest.send();
  };

  onLogoutSuccess = res => {
    switch (res.status) {
      case "success":
        this.setState({ anchorEl: null });
        sessionStorage.setItem("user", null);
        UserSocket.disconnect();
        this.props.history.push("/");
        break;
      case "error":
        alert("something was wrong!");
        console.log("errorResponse");
        break;
      default:
    }
  };

  onProfileClick = () => {
    this.setState({ anchorEl: null });
    this.props.history.push("/profileSettings");
  };

  onHomeClick = () => {
    this.props.history.push("/main");
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar position='static' color='inherit'>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color='inherit'
            aria-label='Menu'
            onClick={() => this.onHomeClick()}
          >
            <HomeIcon />
          </IconButton>
          <Typography
            variant='h6'
            color='inherit'
            className={classes.grow}
          >
            {this.props.user.username}
          </Typography>
          {
            <div>
              <Avatar
                src={this.props.user.avatarUrl}
                aria-owns='menu-appbar'
                aria-haspopup='true'
                onClick={this.handleMenu}
                color='inherit'
              >
                <AccountIcon />
              </Avatar>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={() => this.onProfileClick()}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => this.logoutRequest()}>Logout</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps)(AppBarComponent))
);
