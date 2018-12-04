// import {
//   LOGIN,
// } from '../actions/UserActions'

function user (state = {}, action) {

  switch (action.type) {

    case 'LOGIN' :
    
      user = action.user

      return {
        ...state,
        user: user,
      }

    default :
      return state
  }
}

export default user
