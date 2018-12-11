var initialState = { messages: [] };

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return addMessage(state, action.msg);
    case "GET_ALL_MESSAGES":
      return allMessage(state, action.msg);
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

function allMessage(state, message) {
  let user = sessionStorage.getItem("user");
  user = JSON.parse(user);

  let newMessage = message.filter(messages => {
    return (
      messages.receiverName === "all" ||
      messages.senderName === user.username ||
      messages.receiverName === user.username
    );
  });

  return Object.assign({}, state, {
    messages: newMessage
  });
}

export default messageReducer;
