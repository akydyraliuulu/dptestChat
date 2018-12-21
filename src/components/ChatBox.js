import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import MessageList from "./MessageList";
import { userActions } from "../actions/UserActions";
import { store } from "../index";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import Grid from "@material-ui/core/Grid";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = userItem => {
    store.dispatch(userActions.setReceiver(userItem));
  };

  resetUser = e => {
    store.dispatch(userActions.setReceiver(""));
  };

  render() {
    console.log(this.props.users);

    const listItems = this.props.users.map((userItem, i) => (
      <Chip
        style={{ margin: 4, position: "relative", left: 32 }}
        key={i}
        icon={<TagFacesIcon />}
        label={userItem.username}
        onClick={() => this.handleClick(userItem)}
      >
        {userItem.username}
      </Chip>
    ));
    return (
      <div>
        <Paper
          style={{
            display: "flex",
            justifyContent: "left",
            flexWrap: "wrap",
            padding: 12
          }}
        >
          <Button
            color="primary"
            style={{ position: "relative", left: 16 }}
            variant="outlined"
            margin="normal"
            onClick={this.resetUser}
          >
            online users:
          </Button>
          {listItems}
        </Paper>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <MessageList />
          
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    users: state.userReducer.users
  };
};

export default withRouter(connect(mapStateToProps)(ChatBox));
