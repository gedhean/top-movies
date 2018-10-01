// Authentication actions
export const login = userData => ({
  type: 'LOGIN',
  payload: userData
})

export const logout = () => ({
  type: 'LOGOUT'
})

// Authentication reducer
const INIT_STATE = {
  authenticated: false,
  userData: {}
}

const auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, authenticated: true, userData: action.payload }
    case 'LOGOUT':
      return { ...state, authenticated: false, userData: {} }
    default:
      return state
  }
}

export default auth
