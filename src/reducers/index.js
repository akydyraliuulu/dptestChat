import { combineReducers } from 'redux'
import user from './userReducer'
import msg from './messageReducer'

export default combineReducers({
  user,
  msg
})
