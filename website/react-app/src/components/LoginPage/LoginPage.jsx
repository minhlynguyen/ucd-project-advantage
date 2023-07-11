// eslint-disable-next-line no-unused-vars 
import React , {useState} from "react"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import weblogo from '../../assets/AdVantage.svg'
import './LoginPage.css'
export default function LoginPage() {
// setting login credentials 
<<<<<<< HEAD
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

<<<<<<< HEAD
// handling submit

=======
=======
>>>>>>> b3710aa (changes made to navbar, signin and signup)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

// handling submit

>>>>>>> 8dabbb0 (changes made but not final)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login submitted');
        console.log('Email:', email);
        console.log('Password:', password);
    };
    return (
        <section className="login-container">
            <div className="column login-left">
                <img src={weblogo} className="logo" alt="AdVantage"/>
                <div className=" login-left-content"> 
<<<<<<< HEAD
<<<<<<< HEAD
=======
                <p>A paragraph is a series of sentences that are .</p>
>>>>>>> 8dabbb0 (changes made but not final)
=======
>>>>>>> b3710aa (changes made to navbar, signin and signup)
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