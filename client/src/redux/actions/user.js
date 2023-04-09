import { signIn, signUp } from "../../api/index.js"

export const signInAction = (form) => async dispatch => {
    try {
        await signIn(form)
        .then((response) => {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('isLoggedIn', true)
            dispatch({type: 'SIGNIN', data: response.data})
            window.location.reload()
        })
        .catch((error) => {
            alert(error.response.data.message)
        })
    } catch (error) {
        console.log(error)
    }
}

export const signUpAction = (form) => async dispatch => {
    try {
        await signUp(form)
        .then((response) => {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('isLoggedIn', true)
            dispatch({type: 'SIGNUP', data: response.data})
            window.location.reload()
        })
        .catch((error) => {
            alert(error.response.data.message)
        })    
      } 
      catch (error) {
        console.log(error)
      }
}

export const logoutAction = () => dispatch => {
    try {
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("token")
        dispatch({type: 'LOGOUT'})
        window.location.reload()
    } catch (error) {
        console.log(error)
    }
}