const port2 = 80;
  
const socketsUser = require('./socketsUser')

module.exports = class socketIO {

static init(server){
  global.io = require('socket.io')(server);
  server.listen(port2);
}

static connectUsersSocket(){
  console.log("Client Successfully Connected");
  global.io.on('connection', (socket) => {
    console.log("Socket id:" + socket.id)
    socket.emit('news', { hello: 'world' });
    socket.on('getData', function (data) {
      console.log(data);
    });
    // let userId = socket.handshake.query['userId']
    // let username = socket.handshake.query['username']
    // socketsUser.onConnection({ socket, userId, username })
  })
}

    static sendToAll(event, data){
      io.of('/users').emit(event, data);
    }
    
    static sendToAll(userSocketId, event, data){
      io.of('/users').to(`${userSocketId}`).emit(event, data);
    }
    
    static sendToDefault(socketId, event, data){
      io.to(`${socketId}`).emit(event, data);
    }
}
