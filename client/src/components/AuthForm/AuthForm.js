import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signInAction, signUpAction } from '../../redux/actions/user'

const AuthForm = () => {
    const [isSignUp, setIsSignUp] = useState(false)
    const dispatch = useDispatch()
    
    const setSignIn = () => {
        setIsSignUp(false)
    }

    const setSignUp = () => {
        setIsSignUp(true)
    }

    const login = () => {
        const username = document.getElementById("login-username").value
        const password = document.getElementById("login-password").value

        if (username.length < 3) {
            alert("Username must be atleast 3 character")
            return
        }
        if (password.length < 3) {
            alert("Passoword must be atleast 3 character")
            return
        }

        const form = {username: username, password: password}

        if (isSignUp) {
            dispatch(signUpAction(form))
        }
        else {
            dispatch(signInAction(form))
        }
    }

    const closeAuth = () => {
        dispatch({type: 'CLOSE_AUTH'})
    }


  return (
    <div className="z-50 flex bg-white fixed w-5/6 max-w-sm origin-center top-1/2 left-1/2 justify-center -translate-x-1/2 -translate-y-1/2">
        <button className="absolute top-0 right-0  p-1 -translate-x-1 -translate-y-1" onClick={closeAuth}>
            <i className="fa-solid fa-xmark text-2xl"></i>    
        </button>
        <div className="h-inherit w-full m-8">
            <div className="grid grid-cols-2 w-full h-max font-bold text-lg ">
                <div className={"col-end-2 flex justify-center " + (isSignUp ? "bg-gray-200" : "")}>
                    <button className="w-full h-full py-4" onClick={setSignIn}>
                        Sign In
                    </button>
                </div>
                <div className={"col-end-3 flex justify-center " + (isSignUp ? "" : "bg-gray-200")}>
                    <button className="w-full h-full py-4" onClick={setSignUp}>
                        Sign Up
                    </button>
                </div>
            </div>
            <div className="grid grid-rows-2 py-8 gap-4">
                <div className="flex w-full justify-center">
                    <input className="w-11/12 px-2 h-4 py-4 ring-2 ring-gray-400" type="text" required={true} placeholder="Username" name="username" id="login-username"></input>
                </div>
                <div className="flex w-full justify-center">
                    <input className="w-11/12 px-2 h-4 py-4 ring-2 ring-gray-400" type="text" required={true} placeholder="Password" name="password" id="login-password"></input>
                </div>
            </div>
            <div className="flex w-full justify-center font-bold text-md">
                <button className="px-4 py-1 border-2 rounded-md border-gray-500 w-28" onClick={login}>
                    {isSignUp ? "Sign Up" : "Sign In"}
                </button>
            </div>
        </div>
    </div>
  )
}

export default AuthForm