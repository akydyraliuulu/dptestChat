var initialState = {
  user: {},
  receiverUser: "",
  users: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return Object.assign({}, state, {
        user: action.user
      });
    case "SET_ONLINE_USERS":
      return Object.assign({}, state, {
        users: action.users
      });

    case "SET_RECEIVER":
      return Object.assign({}, state, {
        receiverUser: action.receiverUser
      });

    default:
      return state;
  }
};

export default userReducer;
