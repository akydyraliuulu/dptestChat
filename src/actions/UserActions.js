export const userActions = {
  login: user => ({
    type: "LOGIN",
    user
  }),
  logout: () => ({
    type: "LOGOUT"
  }),
  setUsersList: users => ({
    type: "SET_ALL_USERS_LIST",
    users
  }),
  setOnlineUsers: users => ({
    type: "SET_ONLINE_USERS",
    users
  })
};
