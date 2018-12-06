function msg(state = [], action) {
    switch (action.type) {
      case "ADD_MESSAGE":
        return Object.assign({}, state, {
          message: action.msg
        });
  
      default:
        return state;
    }
  }
  
  export default msg;