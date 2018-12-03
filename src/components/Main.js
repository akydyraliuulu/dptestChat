import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Grid } from "semantic-ui-react";
import SendMessage from "../utils/SendMessage";
import ChatBox from "./ChatBox";
import LogoutComponent from "./LogoutComponent";

class Main extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
      username: "",
      message: "",
      names: ["beka", "andrei", "aibek", "hasan", "adilet"]
    }

  }

  render() {

    return (
      <Container className="main" style={{ textalign: "right" }}>
        <LogoutComponent />
        <ChatBox username={this.state.username} 
                  names={this.state.names} />
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
