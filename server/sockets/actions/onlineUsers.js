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
        socketIO.sendToUsers('get_users_list', SocketContainer.users);
    }

    static async setUserOffline({socketId, userId}){
        SocketContainer.users = await SocketContainer.users.filter(_user => _user.userId !== userId);
        socketIO.sendToUsers('get_users_list', SocketContainer.users);
    }
    
    static getUsers(){
        socketIO.sendToUsers('get_users_list', SocketContainer.users);
    }
    
    static loginActionUsers(socketId,user){
        socketIO.sendToUser(socketId,'get_users_list', SocketContainer.users);
    }

    static logOutActionUsers(socketId){
    }
}

module.exports = OnlineUsers;