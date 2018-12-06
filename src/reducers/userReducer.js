// import {
//   LOGIN,
// } from '../actions/UserActions'

function user(state = {}, action) {
  switch (action.type) {
    case "LOGIN":
      return Object.assign({}, state, {
        user: action.user
      });

    default:
      return state;
  }
}

export default user;
