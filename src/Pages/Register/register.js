import axios from '../../http'
import React, { useRef } from 'react'
import './register.css'
import { useHistory } from "react-router-dom";

function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const conpassword = useRef()
    const history = useHistory()

    const loginsubmit = async(e) =>{
        e.preventDefault();
        if(password.current.value !== conpassword.current.value){
            conpassword.current.setCustomValidity("Password don't match")
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value, 
                password: password.current.value,
            }
            try{
                const res = await axios.post("/auth/register", user)
                console.log(res)
                history.push('/login')
            }catch(err){
                console.log(err)
            }

        }
    }
    

    return (
        <div className="login">
            <div className="RegisterContainor">
                <div className="RegLeftSide">
                    <div style={{fontSize: '28px'}}>Welcome to SocialVista</div>
                    <div>Connecting hearts, sharing stories, and spreading smiles across the digital horizon.</div>
                    <a href="/login"><button className="RegLoginbtn">Login</button></a>
                </div>
                <div className="RegRightSide">
                    <div className="RegBtns">
                        <button style={{marginTop: '0px', border: 'none', width: '118px'}} className="RegLoginbtn">Registration</button>
                        <button style={{marginTop: '0px', border: 'none', width: '118px'}} className="RegLoginbtn">Login</button>
                    </div>
                    <form action="/register" method="post" className="RegSubForm" id="myRegistrationForm" onSubmit={loginsubmit}>
                        <input type="text" name="Fname" required ref={username} placeholder="First Name *"/>
                        <input type="text" name="Lname" placeholder="Last Name"/>
                        <input type="email" name="email" required ref={email} placeholder="Your Email *"/>
                        <input type="phone" name="phone" placeholder="Your Mobile Number"/>
                        {/* <input type="number" name="age" placeholder="Enter your age *"/>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <input style={{width: '10%', height: '16px', marginRight:'2px'}} type="radio" name="gender" value="male"/> Male
                            <input style={{width: '10%', height: '16px', marginRight:'2px'}} type="radio" name="gender" value="female"/> Female
                        </div> */}
                        <input type="password" name="password" required ref={password} placeholder="Enter Password *"/>
                        <input type="password" name="copass" required ref={conpassword} placeholder="Confirm Password *"/>
                        <button style={{margin: '30px auto', marginRight:'-332px', alignSelf: 'right'}} className="RegLoginbtn" id="subBTN">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
