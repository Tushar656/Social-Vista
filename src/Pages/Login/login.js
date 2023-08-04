import React, { useContext, useRef } from 'react'
import './login.css'
import {loginCalls} from "../../APIcalls"
import { AuthContext } from '../../context/Authcontext'
import CircularProgress from '@mui/material/CircularProgress';


function Login() {
    const email = useRef()
    const password = useRef()

    const {user, isFetching, error, dispetch} = useContext(AuthContext)

    const loginsubmit = (e) =>{
        e.preventDefault();
        // console.log(email)
        // console.log(email.current.value)
        loginCalls({email: email.current.value, password: password.current.value}, dispetch)
    }
    // console.log(user);

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginleft">
                    <h3 className="loginLogo">iChat App</h3>
                    <span className="loginDesc">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis.</span>
                </div>
                <div className="loginright">
                    <form className="loginBox" onSubmit={loginsubmit}>
                        <input type="email" placeholder="Email" required className="loginInput" ref={email}/>
                        <input type="password" placeholder="Password" required minLength="6" className="loginInput" ref={password}/>
                        <button className="loginbtn" disabled={isFetching}>{isFetching ? <CircularProgress color="success" size="22px" /> : "Log in"}</button>
                        <span className="forgotPassword">Forgot Password?</span>
                        <button className="loginRegisterBtn"><a href="/register">Create a New Account</a></button>
                    </form>
                    {
                        error && (
                            <div style={{color: 'red'}}>Incorrect email or Password</div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Login
