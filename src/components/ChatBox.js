import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

class ChatBox extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    username: this.props.username,
    message: "",
    names: this.props.names,
    messages: this.props.messages
  };

  render() {
    const listItems = this.state.names.map(name => (
      <a className="ui green label" key={name} value={name}>
        {name}
      </a>
    ));
    return (
      <div className="ui segment" style={{ top: 60 }}>
        <a className="ui left floated button label">online users:</a>
        <div className="ui left floated horizontal list">{listItems}</div>
        <br />
        <br />

        <MessageList messages={this.state.messages} />
        <MessageInput />
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
