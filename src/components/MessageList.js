import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import React, { Component } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { messageActions } from "../actions/MessageActions";
import { store } from "../index";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";

const options = [
  { action: "Edit", icon: <EditIcon /> },
  { action: "Delete", icon: <DeleteIcon /> }
];

class MessageList extends Component {
  state = {
    anchorEl: null,
    open: false,
    selectedIndex: 0,
    messageItem: "",
    img: ""
  };

  handleClick = (event, message) => {
    event.preventDefault();
    console.log(message);
    this.setState({ anchorEl: event.currentTarget, open: !this.state.open });
    this.setState({ messageItem: message });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      open: !this.state.open
    });
  };

  handleMenuItemClick = (event, index) => {
    event.preventDefault();

    this.setState({
      selectedIndex: index,
      anchorEl: null,
      open: !this.state.open
    });
    if (this.props.user.userId === this.state.messageItem.senderId) {
      switch (index) {
        case 0:
          store.dispatch(messageActions.edit(this.state.messageItem));
          break;
        case 1:
          this.deletMessage(this.state.messageItem._id);
          break;
        default:
          console.log("default");
          break;
      }
    } else {
      alert("This is not your message");
    }
  };

  deletMessage = _id => {
    axios.delete(`/api/messages/deleteMessage/${_id}`).then(res => {
      console.log("res", res);
      this.getMessages();
    });
  };

  componentDidMount() {
    this.getMessages();
  }

  getMessages = () => {
    axios.get("/api/messages").then(res => {

    //  const img =  new Buffer(res.data.messages.map(message => {
    //     return message.imageUrl.data.data
    //   }), 'binary').toString('base64')

      console.log("allMessage", res);
      var base64Flag = "data:image/jpeg;base64,";
      var imageStr = this.arrayBufferToBase64(
        res.data.messages.map(message => {
          return message.imageUrl.data;
        })
      );
      this.setState({
        img: base64Flag + imageStr
      });
      console.log("imageStr",base64Flag + imageStr);

      this.props.getAllMessages(res.data.messages);
    });
  };

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

  render() {
    const { anchorEl, open, img } = this.state;
    return (
      <div style={{ maxWidth: 550, padding: 10, alignItems: "center" }}>
        <PerfectScrollbar
          style={{
            maxHeight: 550,
            minHeight: 550,
            overflow: "hidden",
            height: "100%"
          }}
        >
          <List>
            {this.props.messages.map(message => {
              return (
                <ListItem
                  key={message._id}
                  button
                  aria-haspopup="true"
                  aria-controls="lock-menu"
                  aria-label="When device is locked"
                  onClick={event => this.handleClick(event, message)}
                >
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                  <ListItemText
                    primary={message.senderId}
                    secondary={message.text}
                  />
                  <img src={img} />
                </ListItem>
              );
            })}
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleClose}
          >
            {options.map((option, index) => (
              <MenuItem
                onClick={event => this.handleMenuItemClick(event, index)}
              >
                <ListItemText primary={option.action} />
                <ListItemIcon>{option.icon}</ListItemIcon>
              </MenuItem>
            ))}
          </Menu>
        </PerfectScrollbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messageReducer.messages,
    user: state.userReducer.user
  };
};
function mapDispatchToProps(dispatch) {
  return {
    getAllMessages: function(messages) {
      dispatch(messageActions.getAllMessages(messages));
    }
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MessageList)
);
