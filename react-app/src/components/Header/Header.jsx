// This Header page will include header used in the main page after user has logged in. 

// eslint-disable-next-line no-unused-vars 
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import weblogo from '../../assets/AdVantageMain.svg'
import './Header.css';

export default function Header() {
    const [isNavExpanded, setIsNavExpanded] = useState(false)

    return (
        <nav className='navbar-parent'>          
        <FontAwesomeIcon className="dropdown-button" icon={faBars} onClick={() => {
          setIsNavExpanded(!isNavExpanded); 
        //   console.log("hello")
        }}/>
    
           <img src={weblogo} className="logo" alt="AdVantage"/>
            <div className={`nav-components ${isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}`}>
                <div className="nav-left">
                    <ul className="navbar-links">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Solutions</a></li>
                        <li><a href="#">Testimonials</a></li>
                    </ul>
                </div>
                <div className="nav-right">
                    <button className="getstarted-button"> <a>Get Started</a></button>
                    <button className="login-button"><Link className="login-link"to="/login">Login</Link></button>
                </div>
            </div> 
        </nav>
        
    )
}
