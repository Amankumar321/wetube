const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') ?? false,
  token: localStorage.getItem('token') ?? "",
  showAuth: false
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNIN':
          return { ...state, isLoggedIn: true, token: action.data.token }
        case 'SIGNUP':
          return { ...state, isLoggedIn: true, token: action.data.token }
        case 'LOGOUT':
          return { ...state, isLoggedIn: false, token: ""}
        case 'SHOW_AUTH':
          return { ...state, showAuth: true }
        case 'CLOSE_AUTH':
          return { ...state, showAuth: false }
        default:
          return state
      }
}

export default user