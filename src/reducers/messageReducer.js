var initialState = { messages: [] };

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return addMessage(state, action.msg);
    default:
      return state;
  }
};
function addMessage(state, message) {
  let newMessages = state.messages.slice();
  newMessages.push(message);
  return Object.assign({}, state, {
    messages: newMessages
  });
}

export default messageReducer;
