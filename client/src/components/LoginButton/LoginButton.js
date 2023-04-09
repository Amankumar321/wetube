import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutAction } from '../../redux/actions/user'

const LoginButton = () => {
  const isLogged = useSelector(state => state.user.isLoggedIn)
  const dispatch = useDispatch()

  const openAuth = () => {
    dispatch({type: 'SHOW_AUTH'})
  }

  const handleClick = () => {
    if (isLogged) {
      dispatch(logoutAction())
    }
    else {
      openAuth()
    }
  }

  return (
    <button className="px-2 py-1 border-2 rounded-md border-gray-500 ml-1 md:ml-4 mr-4 md:mr-8 w-20 md:w-28 font-bold md:px-4" onClick={handleClick}>
        {
          isLogged ? "Logout" : "Login"
        }
    </button>
  )
}

export default LoginButton