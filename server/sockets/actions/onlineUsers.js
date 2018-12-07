let SocketContainer = require('../socketContainer');

class OnlineUsers {
    static async setUserOnline({ socketId, userId }){
        SocketContainer.users = await SocketContainer.users.filter(_user => _user.userId !== userId);
        //let socketIdwithoutNamespace = socketId.replace('/users#', '');
        let socketIdwithoutNamespace = socketId;
        let onlineUser = {
            userId,
            userSocketId:socketId,
            socketId:socketIdwithoutNamespace,
        }
        await SocketContainer.users.push(onlineUser)
        socketIO.sendToAll('getUserList', SocketContainer.users);
    }

    static async setUserOffline({socketId, userId}){
        SocketContainer.users = await SocketContainer.users.filter(_user => _user.userId !== userId);
        socketIO.sendToAll('getUserList', SocketContainer.users);
    }
    
    static getUsers(){
        socketIO.sendToAll('getUserList', SocketContainer.users);
    }
    
    static loginActionUsers(socketId,user){
        socketIO.sendToAll(socketId,'getUserList', SocketContainer.users);
    }

    static logOutActionUsers(socketId){
    }
}

module.exports = OnlineUsers;