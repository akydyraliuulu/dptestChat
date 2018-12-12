import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { userActions } from "../actions/UserActions";
import { store } from "../index";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TagFacesIcon from "@material-ui/icons/TagFaces";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = name => {
    store.dispatch(userActions.setReceiver(name));
  };

  resetUser = e => {
    let name = "all";
    store.dispatch(userActions.setReceiver(name));
  };

  render() {
    console.log(this.props.users);

    let icon = <TagFacesIcon />;
    const listItems = this.props.users.map((item, i) => (
      <Chip
        style={{ margin: 4, position: "relative", left: 148 }}
        key={i}
        icon={icon}
        label={item.username}
        onClick={() => this.handleClick(item.username)}
      >
        {item.username}
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
            style={{ position: "absolute", left: 16 }}
            variant="outlined"
            margin="normal"
            onClick={this.resetUser}
          >
            online users:
          </Button>
          {listItems}
        </Paper>
        <Grid container spacing={24}>
          <MessageList />
          <MessageInput />
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
