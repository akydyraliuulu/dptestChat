import { store } from "../index";
import openSocket from "socket.io-client";
import {UserActions} from "../actions/UserActions";
class UserSocket {
  static socket = null;
  static usocket = null;
  static connect = () => {
    UserSocket.socket = openSocket();
    UserSocket.addListenerToSocket(UserSocket.socket);

    UserSocket.socket.on('connected', socketIdData => {
      sessionStorage.setItem("socketId", socketIdData.socketId);
    });
  };

  static addListenerToSocket = skt => {
    skt.on("get_users_list", onUsersList => {
      console.log("getOnUsersList");
      console.log(onUsersList);
      onUsersList = onUsersList.map(user => {
        return {
          userId: Number(user.userId)
        };
      });
      store.dispatch(UserActions.setOnlineUsers(onUsersList));
    });
  };

  static removeAllListnersToSocket = skt => {
    //skt.removeAllListeners("get_users_list");
  };

  static disconnect = () => {
    if (UserSocket.socket) {
      UserSocket.removeAllListnersToSocket(UserSocket.socket);
      UserSocket.socket.disconnect();
    }
  };
  static connectUser = (userId, username) => {
    UserSocket.usocket = openSocket("/users", {
      query: `userId=${userId}&username=${username}`
    });

    UserSocket.addListenerToSocket(UserSocket.usocket);

    UserSocket.usocket.on('connected', socketIdData => {
      console.log(socketIdData);
      sessionStorage.setItem("usocketId", socketIdData.socketId);
      sessionStorage.setItem("socketId", socketIdData.socketId);
    });
    UserSocket.usocket.on("disconnect", () => {
      console.log("USOCKET DISCONNECTED");
      //socket.open();
    });
  };
}

export default UserSocket;
