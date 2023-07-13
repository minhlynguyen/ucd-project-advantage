// Signed In Header that the user sees  whenn they log in
// eslint-disable-next-line no-unused-vars 
import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import weblogo from '../../../assets/AdVantageMain.svg';
import '../Header.css'


export default function SignedInHeader(){
    const [isNavExpanded, setIsNavExpanded] = useState(false)


    return(
        <header>          
        <div className="container">
        <FontAwesomeIcon className="dropdown-button" icon={faBars} onClick={() => {
        setIsNavExpanded(!isNavExpanded); 
        }}/>  
       <img src={weblogo} className="logo" alt="AdVantage-Header-Logo" />
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
                <FontAwesomeIcon className="profile-user" icon={faUser} />              
                </div>
            </div> 
        </nav>
        </div>
    </header>
    )
}