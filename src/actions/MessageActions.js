export const messageActions = {
  add: msg => ({
    type: "ADD_MESSAGE",
    msg
  }),
  delete: index => ({
    type: "DELETE_MESSAGE",
    index
  })
};
