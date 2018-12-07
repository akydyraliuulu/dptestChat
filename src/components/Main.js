import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import ChatBox from "./ChatBox";
import LogoutComponent from "./LogoutComponent";

class Main extends Component {
  render() {
    return (
      <Container className="main" >
        <LogoutComponent />
        <ChatBox />
      </Container>
    );
  }
}

export default Main;
