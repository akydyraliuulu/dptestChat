const onlineUsers = require('./actions/onlineUsers');

class SocketsUser {
    static onConnection({ socket, userId, username }){
        
        onlineUsers.setUserOnline({ socketId:socket.id, userId, username })
        onlineUsers.getUsers();
        console.log(`socketId`)
        console.log(socket.id)
        socketIO.sendToAll(socket.id, 'connected', { socketId:socket.id });
        socket.emit('connected', { socketId:socket.id })
    }

    static onDisconnect({ socket, userId }, reason){
        onlineUsers.setUserOffline({ socketId:socket.id, userId })
        // actions.logOutActionUsers(JSON.stringify(skt.id))
    }

}

module.exports = SocketsUser;