import { store } from "../index";
import openSocket from "socket.io-client";
import { userActions } from "../actions/UserActions";
class UserSocket {
  static socket = null;
  static usocket = null;
  static connect = () => {
    UserSocket.socket = openSocket('http://localhost:8000');
    UserSocket.addListenerToSocket(UserSocket.socket);

    UserSocket.socket.on("connected", socketIdData => {
      console.log("socketIdData.sockedId")
      console.log(socketIdData.sockedId)
      sessionStorage.setItem("socketId", socketIdData.socketId);
    });
  };

  static addListenerToSocket = skt => {
    skt.on("getUserList", userList => {
      console.log("getUsersList");
      console.log(userList);
      userList = userList.map(user => {
        return {
          userId: Number(user.userId),
          userSocketId: user.userSocketId,
          socketId: user.sockedId
        };
      });
      store.dispatch(userActions.setOnlineUsers(userList));
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
    UserSocket.usocket = openSocket("/users", {
      query: `userId=${userId}&username=${username}`
    });
    UserSocket.usocket = openSocket('http://localhost:8000');

    UserSocket.addListenerToSocket(UserSocket.usocket);
    UserSocket.addListenerToUserSocket(UserSocket.usocket);

    UserSocket.usocket.on("connected", socketIdData => {
      console.log("socketIdData");
      console.log(socketIdData);
      sessionStorage.setItem("usocketId", socketIdData.socketId);
      sessionStorage.setItem("socketId", socketIdData.socketId);
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

  static addListenerToUserSocket = skt => {};
}

export default UserSocket;
