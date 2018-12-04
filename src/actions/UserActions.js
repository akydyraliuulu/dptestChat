// export const LOGIN = 'LOGIN';

export function loginRedux ({ params }) {

  return {
    type: 'LOGIN',
    params
  }
};
export function UserActions () {
  return{
  setUsersList:(users) => ({
      type: 'SET_ALL_ACTIVE_USERS_LIST',
      users,
  }),
  setOnlineUsers:(users) => ({
      type: 'SET_ONLINE_USERS',
      users,
  })
}
};
export const userActions = {

  login:(user) => ({
      type: 'LOGIN',
      user,
  }),
  logout:() => ({
      type: 'LOGOUT',
  })
};

