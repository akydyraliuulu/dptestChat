import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container } from "semantic-ui-react";
import ChatBox from "./ChatBox";
import LogoutComponent from "./LogoutComponent";

const DUMMY_DATA = [
  {
    senderName: "perborgen",
    message: "who'll win?"
  },
  {
    senderName: "janedoe",
    message: "I'll win"
  }
]

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username,
      message: "",
      names: ["beka", "andrei", "aibek", "hasan", "adilet"],
      messages: DUMMY_DATA
    };
  }

  render() {
    return (
      <Container className="main" style={{ textalign: "right" }} key={this.state.messages.senderName}>
        <LogoutComponent username={this.state.username}/>
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
