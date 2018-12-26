import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { userActions } from "../actions/UserActions";
import MessageList from "./MessageList";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = userItem => {
    this.props.setReceiver(userItem);
  };

  resetUser = e => {
    this.props.setReceiver("");
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
function mapDispatchToProps(dispatch) {
  return {
    setReceiver: function(userItem) {
      dispatch(userActions.setReceiver(userItem));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatBox));
