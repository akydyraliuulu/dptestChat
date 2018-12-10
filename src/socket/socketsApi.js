import { store } from "../index";
import openSocket from "socket.io-client";
import { userActions } from "../actions/UserActions";

const socketUrl = "http://localhost";
class UserSocket {
  static socket = null;
  static usocket = null;

  static connect = () => {
    UserSocket.socket = openSocket(socketUrl);
    UserSocket.addListenerToSocket(UserSocket.socket);

    UserSocket.socket.on("connect", socketIdData => {
      console.log("socketIdData.sockedId")
     console.log(socketIdData)
    });
  };

  static addListenerToSocket = skt => {
    skt.on("news", userList => {
      console.log("getUsersList");
      console.log(userList);
      // userList = userList.map(user => {
      //   return {
      //     userId: Number(user.userId),
      //     userSocketId: user.userSocketId,
      //     socketId: user.sockedId
      //   };
      // });
     // store.dispatch(userActions.setOnlineUsers(userList));
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
    UserSocket.usocket = openSocket(socketUrl);

    UserSocket.addListenerToSocket(UserSocket.usocket);
    UserSocket.addListenerToUserSocket(UserSocket.usocket);

    UserSocket.usocket.on("connect", socketIdData => {
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

  static addListenerToUserSocket = skt => {};
}

export default UserSocket;
