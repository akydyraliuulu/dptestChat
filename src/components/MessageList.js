import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
class MessageList extends Component {
    render() {
      return (
        <ul style={this.props.style}>                 
          {this.props.messages.map(message => {
            return (
             <li key={message.id} style={{ marginTop: 10 }}>
               <div className="ui floated left grey label">
                 {message.senderName}
               </div>

               <div className="ui floated left yellow">
                 {message.message}
               </div>
             </li>
           )
         })}
       </ul>
      )
    }
  }
  function mapStateToProps({ user }) {
    return {
      user
    };
  }
  
  export default withRouter(connect(mapStateToProps)(MessageList));