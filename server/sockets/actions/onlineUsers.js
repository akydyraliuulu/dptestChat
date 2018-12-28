let SocketContainer = require("../socketContainer");

class OnlineUsers {
  static async setUserOnline({ socketId, userId, username }) {
    SocketContainer.users = await SocketContainer.users.filter(
      _user => _user.userId !== userId
    );
    let socketIdwithoutNamespace = socketId;
    let onlineUser = {
      userId,
      username: username,
      userSocketId: socketId,
      socketId: socketIdwithoutNamespace
    };
    await SocketContainer.users.push(onlineUser);
    socketIO.sendToAll("getUserList", SocketContainer.users);
  }

  static async setUserOffline({ socketId, userId }) {
    console.log(socketId);
    SocketContainer.users = await SocketContainer.users.filter(
      _user => _user.userId !== userId
    );
    socketIO.sendToAll("getUserList", SocketContainer.users);
  }

  static logOutActionUsers(socketId) {
    console.log(socketId);
  }
}

module.exports = OnlineUsers;
