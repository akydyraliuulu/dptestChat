import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Grid, Input, Button } from "semantic-ui-react";
import Logout from "../utils/Logout";
import SendMessage from "../utils/SendMessage";

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    username: "",
    message: ""
  };

  sendMessage = e => {
    let msg = {
      senderName: "noname",
      createdOn: Date.now(),
      message: this.state.message
    };
    console.log(msg);
    let sendMessageRequest = new SendMessage();
    sendMessageRequest.data = msg;
    sendMessageRequest.onSuccess = this.onSendMessageSuccess;
    sendMessageRequest.send();
  };

  onSendMessageSuccess = res => {
    switch (res.status) {
      case "success":
        this.setState({
          message: "",
          username: ""
        });
        alert("message have been sent successfully")
        break;
      case "error":
        alert("something was error!");
        console.log("errorResponse");
        break;
      default:
    }
  };

  logoutRequest = () => {
    const { username, password } = this.props;

    let logoutRequest = new Logout();
    logoutRequest.data = {
      user: {
        username: "noname",
        password: 123456
      }
    };
    logoutRequest.onSuccess = this.onLogoutSuccess;
    logoutRequest.send();
  };

  onLogoutSuccess = res => {
    switch (res.status) {
      case "success":
        this.props.history.push("/");
        break;
      case "error":
        alert("something was error!");
        console.log("errorResponse");
        break;
      default:
    }
  };

  handleClick = name => {
    this.setState({
      username: "@" + name
    });
    console.log(this.state.username);
  };

  resetUser = e => {
    this.setState({
      username: ""
    });
  };

  handleChange = event => {
    this.setState({
      message: event.target.value
    });
    console.log(this.state.username);
  };

  render() {
    const names = ["beka", "andrei", "aibek", "hasan", "adilet"];

    const listItems = names.map(name => (
      <a
        className="ui green label"
        key={name}
        onClick={() => this.handleClick(name)}
        value={name}
        className="ui item button"
        style={{ padding: 10 }}
      >
        {name}
      </a>
    ));

    return (
      <Container className="main" style={{ textalign: "right" }}>
        <Grid textalign="right" style={{ marginTop: 60 }}>
          <Grid.Column textalign="right">
            <button
              className="ui right floated right labeled icon button"
              onClick={() => this.logoutRequest()}
            >
              <i className="right arrow icon" />
              LOGOUT
            </button>
          </Grid.Column>
        </Grid>
        <Grid style={{ marginTop: 20 }}>
          <Grid.Column textalign="right" width={16}>
            <button className="ui left floated button" onClick={this.resetUser}>
              ONLINE:
            </button>
            <div className="ui left floated horizontal list">{listItems}</div>
          </Grid.Column>
        </Grid>
        <Grid style={{ marginTop: 20 }}>
          <Grid.Column textalign="right" width={16} height={400}>
            <div
              className="ui left floated raised very padded text container segment"
              style={{ minHeight: "400px" }}
            >
              <Input
                style={{
                  position: "absolute",
                  bottom: 5,
                  left: 5,
                  width: "85%"
                }}
                label={
                  this.state.username === ""
                    ? "all"
                    : "only " + this.state.username
                }
                className="ui fluid action input"
                type="text"
                placeholder="Send message..."
                value={this.state.message}
                onChange={this.handleChange}
              />
              <Button
                style={{ position: "absolute", bottom: 10, right: 10 }}
                className="ui button"
                onClick={this.sendMessage}
              >
                Send
              </Button>
            </div>
          </Grid.Column>
        </Grid>
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
