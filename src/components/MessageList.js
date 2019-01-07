import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ImageIcon from "@material-ui/icons/Image";
import axios from "axios";
import React, { Component, Fragment } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { messageActions } from "../actions/MessageActions";
import { store } from "../index";
import MessageInput from "./MessageInput";
import moment from "moment";
import { userActions } from "../actions/UserActions";
require("moment/locale/ja");
moment.locale("ja");

const options = [
  { action: "Edit", icon: <EditIcon /> },
  { action: "Delete", icon: <DeleteIcon /> }
];

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      selectedIndex: 0,
      messageItem: {},
      img: ""
    };
  }

  scrollToBottom = () => {
    this._scrollbarRef.scrollTo(0, this._scrollbarRef.scrollHeight);
  };

  componentDidMount() {
    this.scrollToBottom();
    this.getMessages();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleClick = (event, message) => {
    event.preventDefault();
    console.log(message);
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open,
      messageItem: message
    });
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
          this.deleteMessage(this.state.messageItem._id);
          break;
        default:
          console.log("default");
          break;
      }
    } else {
      alert("This is not your message");
    }
  };

  deleteMessage = _id => {
    axios.delete(`/api/messages/deleteMessage/${_id}`).then(res => {
      console.log("res", res);
      this.getMessages();
    });
  };

  getMessages = () => {
    axios.get(`/api/messages/${this.props.user.userId}`).then(res => {
      console.log("allMessage", res);

      this.props.getAllMessages(res.data.messages);
      this.props.allUsers(res.data.users);
    });
  };

  render() {
    let today = new Date().toISOString();
    let yesterday = new Date().setDate(new Date().getDate() - 1);
    let lastDate = new Date().toISOString();
    let todayIsSet = false;
    let yesterdayIsSet = false;
    const { anchorEl, open } = this.state;
    return (
      <div style={{ maxWidth: 800, padding: 10, alignItems: "center" }}>
        <PerfectScrollbar
          style={{
            maxHeight: 550,
            minHeight: 550,
            overflow: "hidden",
            height: "100%"
          }}
          containerRef={ref => {
            this._scrollbarRef = ref;
          }}
        >
          <List>
            {this.props.messages.map(message => {
              let todayB =
                moment(message.createdOn).isSame(today, "day") &&
                todayIsSet === false;
              if (todayB) {
                todayIsSet = true;
              }
              let yesterdayB =
                moment(message.createdOn).isSame(yesterday, "day") &&
                yesterdayIsSet === false;
              if (yesterdayB) {
                yesterdayIsSet = true;
              }
              let sameDay = moment(message.createdOn).isSame(lastDate, "day");
              if (!sameDay) {
                lastDate = message.createdOn;
              }

              return this.props.all_users
                .filter(user => user.userId === message.senderId)
                .map(user => {
                  return (
                    <Fragment key={message._id}>
                      {todayB && (
                        <ListSubheader
                          style={{
                            background:
                              "linear-gradient(to right, #FFFFFF, #ECE9E6)"
                          }}
                        >
                          Today
                        </ListSubheader>
                      )}
                      {yesterdayB && (
                        <ListSubheader
                          style={{
                            background:
                              "linear-gradient(to right, #FFFFFF, #ECE9E6)"
                          }}
                        >
                          Yesterday
                        </ListSubheader>
                      )}
                      {!sameDay && !todayB && !yesterdayB && (
                        <ListSubheader
                          style={{
                            background:
                              "linear-gradient(to right, #FFFFFF, #ECE9E6)"
                          }}
                        >{`${moment(message.createdOn).format(
                          "MM月DD日"
                        )}`}</ListSubheader>
                      )}
                      <ListItem
                        key={message._id}
                        button
                        aria-haspopup='true'
                        aria-controls='lock-menu'
                        aria-label='When device is locked'
                        onClick={event => this.handleClick(event, message)}
                      >
                        <Avatar src={user.avatarUrl}>
                          <ImageIcon />
                        </Avatar>

                        <ListItemText
                          primary={
                            <div
                              style={{
                                direction: "row",
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between"
                              }}
                            >
                              <p>{`${user.username}`}</p>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row"
                                }}
                              >
                                <p
                                  style={{ color: "#999999", fontSize: 10 }}
                                >{`${moment(message.createdOn).format(
                                  "h:mm "
                                )}`}</p>
                              </div>
                            </div>
                          }
                          secondary={message.text}
                        />

                        <img
                          alt=''
                          src={message.imageUrl !== "" ? message.imageUrl : ""}
                        />
                      </ListItem>
                    </Fragment>
                  );
                });
            })}
          </List>
          <Menu
            id='lock-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleClose}
          >
            {options.map((option, index) => (
              <MenuItem
                key={index}
                onClick={event => this.handleMenuItemClick(event, index)}
              >
                <ListItemText primary={option.action} />
                <ListItemIcon>{option.icon}</ListItemIcon>
              </MenuItem>
            ))}
          </Menu>
        </PerfectScrollbar>
        <br />
        <br />
        <MessageInput value={this.state.messageItem.text} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messageReducer.messages,
    user: state.userReducer.user,
    all_users: state.userReducer.all_users
  };
};
function mapDispatchToProps(dispatch) {
  return {
    getAllMessages: function(messages) {
      dispatch(messageActions.getAllMessages(messages));
    },
    allUsers: function(all_users) {
      dispatch(userActions.allUsers(all_users));
    }
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MessageList)
);
