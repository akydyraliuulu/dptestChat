const port2 = 8000;
  
const socketsUser = require('./socketsUser')

module.exports = class socketIO {

static init(server){
  global.io = require('socket.io')(server);
  global.io.listen(port2);
}

static connectUsersSocket(){
  global.io.of('/users').on('connection', (socket) => {
    let userId = socket.handshake.query['userId']
    let username = socket.handshake.query['username']
    socketsUser.onConnection({ socket, userId, username })
    socket.on('disconnect', (reason) => {
      socketsUser.onDisconnect({socket, userId}, reason);
  });
  })
}

    static sendToUsers(event, data){
      io.of('/users').emit(event, data);
    }
    
    static sendToUser(userSocketId, event, data){
      io.of('/users').to(`${userSocketId}`).emit(event, data);
    }
    
    static sendToDefault(socketId, event, data){
      io.to(`${socketId}`).emit(event, data);
    }
}
