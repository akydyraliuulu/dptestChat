var initialState = {
  user: {},
  name: "all",
  users: [
    {
      username: "Beka",
      userId: 5
    },
    {
      username: "Hasan",
      userId: 6
    },
    {
      username: "Andrey",
      userId: 7
    },
    {
      username: "Adilet",
      userId: 8
    },
    {
      username: "Ulan",
      userId: 9
    }
  ]
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
        name: action.name
      });

    default:
      return state;
  }
};

export default userReducer;
