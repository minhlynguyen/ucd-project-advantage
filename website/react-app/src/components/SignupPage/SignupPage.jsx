// eslint-disable-next-line no-unused-vars 
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import weblogo from '../../assets/AdVantage.svg'
import './SignupPage.css'

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});
export default function SignupPage() {
    // setting credentials for registration page
    const { setCurrentUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [businessname, setBusinessname] = useState("");
    const [password, setPassword] = useState("");
    const [industry, setIndustry] = useState(""); // State to store the selected industry
    
    const handleIndustryChange = (event) => {
        const selectedIndustry = event.target.value; // Get the selected industry
        setIndustry(selectedIndustry); // Update the selected industry in state
        // console.log(selectedIndustry); // Log the selected industry  };

  }
//   handling submit
  const handleSubmit = (e) => {
    e.preventDefault();
    client
        .post(
            "/user/register",
            {
            email: email,
            password: password
            })
        .then(function() {
            client.post(
            "/user/login",
            {
                email: email,
                password: password
            })
        .then(function() {
            setCurrentUser(true);
            })  
        .catch(function (error) {
                // Handle registration error
                console.error('Registration error:', error);
            });
        })
  
    console.log('First name:', firstname)
    console.log('Second name:', lastname)
    console.log('Industry:', industry);
    console.log('Business name:', businessname)
    console.log('Registration submitted');
    console.log('Email:', email);
    console.log('Password:', password);
    
};
    return (
        <section className="signup-container">
            <div className="column signup-left">
                <img src={weblogo} className="logo" alt="AdVantage"/>
                <div className=" signup-left-content"> 
                </div>
            </div>
            <div className="column signup-right"> 
                <form action="" onSubmit={handleSubmit}>
                    <div className="login-right-content">
                        <h2>Register</h2>
                        <p> Create an account.</p>
                    </div>
                    <div className="signup-name-container">
                        <input type="" placeholder="Firstname" id="firstname" name="firstname" value={firstname}  onChange={(e) => setFirstname(e.target.value)}/>
                        <input type="" placeholder="Lastname" id="lastname" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                    </div>
                    <div className="industry-container">
                        <select id="industry" name="industry" value={industry} onChange={handleIndustryChange}>                       
                            <option value="">Select Your Industry</option>
                            <option value="automotive">Automotive</option>
                            <option value="technology">Technology</option>
                            <option value="finance">Finance</option>
                            <option value="retail">Retail</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="foodandbeverage">Food and Beverage</option>
                            <option value="tourism">Tourism</option>
                            <option value="education">Education</option>
                            <option value="realestate">Real Estate</option>
                            <option value="other">Other</option>

                        </select>
                        
                        <input type="" placeholder="Business Name" id="busiessname" value={businessname} name="businessname" onChange={(e) => setBusinessname(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <span className="input-icon"><FontAwesomeIcon icon={faEnvelope} beat/></span>
                        <input type="email" placeholder="" id="signup-email" name="signup-email" value={email} className="input-field-1" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <span  className="input-icon"><FontAwesomeIcon icon={faLock} beat/></span>
                        <input type="password" placeholder="" id="signup-password" name="signup-password" value={password} className="input-field-2" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="signup-button-container">
                        <button type="submit" className="register-button">Register</button>
                        <p> Already have an account?{" "}
                            <span className="login-link"> <Link className="registerpage-login-link"to="/login">Login </Link></span>
                        </p>

                    </div>
                </form>
            </div>           
        </section>
    )
}