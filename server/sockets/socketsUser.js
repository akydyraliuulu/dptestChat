const onlineUsers = require("./actions/onlineUsers");

class SocketsUser {
  static onConnection({ socket, userId, username }) {
    onlineUsers.setUserOnline({ socketId: socket.id, userId, username });
    socket.emit("connected", { socketId: socket.id });
  }

  static onDisconnect({ socket, userId }, reason) {
    onlineUsers.setUserOffline({ socketId: socket.id, userId });
  }
}

module.exports = SocketsUser;
