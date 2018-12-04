import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button, Grid, Input } from "semantic-ui-react";
import SendMessage from "../utils/SendMessage";
import MessageList from "./MessageList";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    username: this.props.username,
    message: "",
    names: this.props.names,
    messages: this.props.messages
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
        this.AddItemsToArray(res.mData);
        this.setState({
          message: "",
          username: ""
        });
        alert("message have been sent successfully");
        break;
      case "error":
        alert("something was error!");
        console.log("errorResponse");
        break;
      default:
    }
  };

  AddItemsToArray = mData => {
    let lists = this.state.messages;
    lists.push(mData);

    this.setState({
      messages: lists
    });
  };

  render() {
    const listItems = this.state.names.map(name => (
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
      <div>
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
              <MessageList
                messages={this.state.messages}
                style={{ left: 10, position: "absolute" }}
              />
              <Input
                style={{
                  position: "absolute",
                  bottom: 5,
                  left: 5,
                  width: "85%"
                }}
                label={
                  this.state.username === ("" || undefined)
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
      </div>
    );
  }
}
function mapStateToProps({ user }) {
  return {
    user
  };
}

export default withRouter(connect(mapStateToProps)(ChatBox));
