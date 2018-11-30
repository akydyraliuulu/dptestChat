import {
  LOGIN,
} from '../actions/UserActions'

function user (state = {}, action) {

  switch (action.type) {

    case LOGIN :
    
      const { user } = action.params

      return {
        ...state,
        user: user,
      }

    default :
      return state
  }
}

export default user
