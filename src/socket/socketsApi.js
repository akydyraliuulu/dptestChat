import { store } from "../index";
import openSocket from "socket.io-client";
import { userActions } from "../actions/UserActions";
import { messageActions } from "../actions/MessageActions";

const socketUrl = "http://localhost";
class UserSocket {
  static usocket = null;

  static addListenerToSocket = skt => {
    skt.on("getUserList", userList => {
      console.log("getUserList1");
      console.log(userList);
    });
  };

  static removeAllListnersToSocket = skt => {
    skt.removeAllListeners("getUserList");
  };

  static disconnect = () => {
    if (UserSocket.socket) {
      UserSocket.removeAllListnersToSocket(UserSocket.socket);
      UserSocket.socket.disconnect();
    }
  };
  static connectUser = (userId, username) => {
    UserSocket.usocket = openSocket(socketUrl, {
      query: `userId=${userId}&username=${username}`
    });
    UserSocket.addListenerToUserSocket(UserSocket.usocket);

    UserSocket.usocket.on("connected", socketIdData => {
      console.log("socketIdData");
      console.log(socketIdData);
    });
    UserSocket.usocket.on("disconnect", () => {
      console.log("USOCKET DISCONNECTED");
      //socket.open();
    });
  };

  static disconnect = () => {
    if (UserSocket.usocket) {
      UserSocket.removeAllListnersToSocket(UserSocket.usocket);
      UserSocket.usocket.disconnect();
    }
  };

  static addListenerToUserSocket = skt => {
    skt.on("getUserList", userList => {
      console.log("getUserList");
      console.log(userList);
      let user = sessionStorage.getItem("user");
      user = JSON.parse(user);
      userList = userList.filter(users => {
        return user.username !== users.username;
      });
      store.dispatch(userActions.setOnlineUsers(userList));
    });

    skt.on("getMessage", messages => {
      console.log("getMessage");
      console.log(messages);
      store.dispatch(messageActions.add(messages));
    });
  };
}

export default UserSocket;
