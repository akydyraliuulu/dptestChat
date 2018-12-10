const port2 = 80;

const socketsUser = require("./socketsUser");

module.exports = class socketIO {
  static init(server) {
    global.io = require("socket.io")(server);
    server.listen(port2);
  }

  static connectUsersSocket() {
    global.io.on("connection", socket => {
      let userId = socket.handshake.query["userId"];
      let username = socket.handshake.query["username"];
      socketsUser.onConnection({ socket, userId, username });

      socket.on("disconnect", reason => {
        console.log(reason);
        socketsUser.onDisconnect({ socket, userId }, reason);
      });
    });
  }

  static sendToAll(event, data) {
    global.io.emit(event, data);
  }
};
