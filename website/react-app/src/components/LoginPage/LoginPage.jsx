// eslint-disable-next-line no-unused-vars 
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import weblogo from '../../assets/AdVantage.svg'
import './LoginPage.css'

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});
export default function LoginPage() {
// setting login credentials 
    const { setCurrentUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

// handling submit

    const handleSubmit = (e) => {
        e.preventDefault();
        client
        .post(
            "/user/login",
            {
              email: email,
              password: password
            })
        .then(function() {
            setCurrentUser(true);
          })
        .catch(function (error) {
            // Handle login error
            console.error('Login error:', error);
        });
        
        console.log('Login submitted');
        console.log('Email:', email);
        console.log('Password:', password);
    };
    return (
        <section className="login-container">
            <div className="column login-left">
                <img src={weblogo} className="logo" alt="AdVantage"/>
                <div className=" login-left-content"> 
                </div>
            </div>
            <div className="column login-right"> 
                <form action="" onSubmit={handleSubmit}>
                    <div className="login-right-content">
                        <h2>Login</h2>
                        <p>Welcome Back, Please login to your account.</p>
                    </div>
                    <div className="input-container">
                        <span className="input-icon"><FontAwesomeIcon icon={faEnvelope} beat/></span>
                      <input type="email" placeholder="" id="login-email" name="login-email" value={email} className="input-field-1" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <span  className="input-icon"><FontAwesomeIcon icon={faLock} beat/></span>
                      <input type="password" placeholder="" id="login-password" name="login-password" value={password} className="input-field-2" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="login-button-container">
                        <Link className="register-link"to="/signup"><button className="loginpage-register-button">Register</button></Link>
                        <button type="submit" className="login-button">Login</button>
                    </div>
                </form>
            </div>           
        </section>
    )
}