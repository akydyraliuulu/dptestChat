export const userActions = {
  login: user => ({
    type: "LOGIN",
    user
  }),
  logout: () => ({
    type: "LOGOUT"
  }),
  setOnlineUsers: users => ({
    type: "SET_ONLINE_USERS",
    users
  }),
  setReceiver: name => ({
    type: "SET_RECEIVER",
    name
  })
};
