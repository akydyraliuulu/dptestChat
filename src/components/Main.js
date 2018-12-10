import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ChatBox from "./ChatBox";
import LogoutComponent from "./LogoutComponent";
import UserSocket from "../socket/socketsApi";

UserSocket.disconnect();

class Main extends Component {

  componentWillMount(){
    this.initSocket();
  }

  initSocket = () => {
   // UserSocket.connectUser(this.props.user.userId, this.props.user.username);
    UserSocket.connect();
  }

  render() {
    return (
      <Container className="main" >
        <LogoutComponent />
        <ChatBox />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user:state.userReducer.user
  };
}

export default withRouter(connect(mapStateToProps)(Main));
