var initialState = { messages: [], editMessage: {} };

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return addMessage(state, action.msg);
    case "GET_ALL_MESSAGES":
      return allMessage(state, action.msg);
    case "EDIT_MESSAGE":
      return editMessage(state, action.msg);
    default:
      return state;
  }
};
function addMessage(state, message) {
  let newMessages = state.messages
    .filter(oldMessage => {
      return oldMessage.msgId !== message.msgId;
    })
    .slice();
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
      messages.senderId === user.userId || messages.receiverId === user.userId
    );
  });

  return Object.assign({}, state, {
    messages: newMessage
  });
}

function editMessage(state, message) {
  return Object.assign({}, state, {
    editMessage: message
  });
}

export default messageReducer;
