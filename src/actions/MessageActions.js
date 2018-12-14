export const messageActions = {
  add: msg => ({
    type: "ADD_MESSAGE",
    msg
  }),
  getAllMessages: msg => ({
    type: "GET_ALL_MESSAGES",
    msg
  }),
  delete: index => ({
    type: "DELETE_MESSAGE",
    index
  }),
  edit: msg => ({
    type: "EDIT_MESSAGE",
    msg
  })
};
