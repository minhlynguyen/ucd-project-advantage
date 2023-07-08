// This Header page will include header used in the main page after user has logged in. 

// eslint-disable-next-line no-unused-vars 
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import weblogo from '../../assets/AdVantageMain.svg'
import './Header.css';
// import SignedInHeader from "./SignedInHeader";


export default function Header() {
    const [isNavExpanded, setIsNavExpanded] = useState(false)

    return (
        <header>          
            <div className="container">
            <FontAwesomeIcon className="dropdown-button" icon={faBars} onClick={() => {
            setIsNavExpanded(!isNavExpanded); 
            }}/>  
<<<<<<< HEAD
           <img src={weblogo} className="logo" alt="AdVantage-Header-Logo" />
=======
           <img src={weblogo} className="logo" alt="AdVantage-Header-Logo"/>
>>>>>>> 8dabbb0 (changes made but not final)
           <nav>
                <div className={`nav-components ${isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}`}>
                    <div className="nav-left">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/heatmap">Solutions</a></li>
                            <li><a href="#">Testimonials</a></li>
                        </ul>
                    </div>
                    <div className="nav-right">
<<<<<<< HEAD
                    <Link className="getstarted-button" to ="/heatmap"><button className="getstarted-button"> Get Started </button> </Link>
=======
                        <button className="getstarted-button"> <a>Get Started</a></button>
>>>>>>> 8dabbb0 (changes made but not final)
                        <button className="login-button"><Link className="login-link"to="/login">Login</Link></button>
                    </div>
                </div> 
            </nav>
            </div>
        </header>
        
    )
}
