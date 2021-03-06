import { combineReducers } from "redux";
import messageReducer from "./messageReducer";
import userReducer from "./userReducer";

export default combineReducers({
  userReducer,
  messageReducer
});
