var initialState = {
  user: {},
  users: [
    {
      username: "Beka",
      userId: 5,
      isOnline: true,
      createdOn: Date.now,
      password: "admin"
    },
    {
      username: "Hasan",
      userId: 6,
      isOnline: true,
      createdOn: Date.now,
      password: "admin"
    },
    {
      username: "Andrey",
      userId: 7,
      isOnline: true,
      createdOn: Date.now,
      password: "admin"
    },
    {
      username: "Adilet",
      userId: 8,
      isOnline: true,
      createdOn: Date.now,
      password: "admin"
    },
    {
      username: "Ulan",
      userId: 9,
      isOnline: true,
      createdOn: Date.now,
      password: "admin"
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

    default:
      return state;
  }
};

export default userReducer;
