import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import MessageIcon from "@material-ui/icons/Message";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { userActions } from "../actions/UserActions";
import { store } from "../index";
import MessageList from "./MessageList";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = userItem => {
    store.dispatch(userActions.setReceiver(userItem));
  };

  resetUser = () => {
    store.dispatch(userActions.setReceiver(""));
  };

  render() {
    console.log(this.props.users);
    return (
      <div>
        {this.props.users.length > 0 ? (
          <Paper
            style={{
              display: "flex",
              justifyContent: "left",
              flexWrap: "wrap",
              padding: 12
            }}
          >
            <IconButton onClick={this.resetUser}>
              <MessageIcon />
            </IconButton>
            {this.props.users.map((userItem, i) => (
              <Chip
                style={{ margin: 4, marginTop: 15 }}
                key={i}
                icon={<TagFacesIcon />}
                label={userItem.username}
                onClick={() => this.handleClick(userItem)}
              >
                {userItem.username}
              </Chip>
            ))}
          </Paper>
        ) : null}

        <Grid
          container
          direction='column'
          alignItems='center'
          justify='center'
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
