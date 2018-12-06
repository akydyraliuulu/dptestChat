import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container } from "semantic-ui-react";
import ChatBox from "./ChatBox";
import LogoutComponent from "./LogoutComponent";
import { store } from "..";

const DUMMY_DATA = [
  {
    senderName: "perborgen",
    msg: "who'll win?"
  },
  {
    senderName: "janedoe",
    msg: "I'll win"
  },
  {
    senderName: "perborgen",
    msg: "who'll win?"
  },
  {
    senderName: "janedoe",
    msg: "I'll win"
  }
]

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      message: "",
      names: ["beka", "andrei", "aibek", "hasan", "adilet"],
      messages: DUMMY_DATA
    };
  }

  render() {
    const user = store.getState().user;
    console.log("main");
    console.log(user);
    return (
      <Container className="main" style={{ textalign: "right" }} key={this.state.username}>
        <LogoutComponent user={user}/>
        <ChatBox username={this.state.username} names={this.state.names} messages={this.state.messages}  />
      </Container>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default withRouter(connect(mapStateToProps)(Main));
