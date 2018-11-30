export const LOGIN = 'LOGIN'

export function loginRedux ({ params }) {

  return {
    type: LOGIN,
    params
  }
}
