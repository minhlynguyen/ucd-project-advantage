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
        <div className="login-container">
            <div> </div>
            <div> </div>


            
        </div>
    )
}