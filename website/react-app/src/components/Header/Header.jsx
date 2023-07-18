// This Header page will include header used in the main page after user has logged in. 
// eslint-disable-next-line no-unused-vars 
import React, { useState, useContext } from 'react'
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import weblogo from '../../assets/AdVantageMain.svg'
import './Header.css';
// import SignedInHeader from "./SignedInHeader";

export default function Header() {
    const { currentUser } = useContext(UserContext);
    const [isNavExpanded, setIsNavExpanded] = useState(false)


    return (
        <header>          
            <div className="header-container">
            <FontAwesomeIcon className="dropdown-button" icon={faBars} onClick={() => {
            setIsNavExpanded(!isNavExpanded); 
            }}/>  
           <img src={weblogo} className="logo" alt="AdVantage-Header-Logo" />
           <nav>
                <div className={`nav-components ${isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}`}>
                    <div className="nav-left">
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li> 
                              {/* <Link to="/signup">Solutions</ Link> */}
                              <Link to="/solutions">Solutions</ Link>
                              </li>
                            <li>
                                <Link to="/testimonials">Testimonials</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="nav-right">
                    {currentUser ? (<Link className="getstarted-button" to="/heatmap"><button className="getstarted-button"> Get Started </button> </Link>) 
                    : (<Link className="getstarted-button" to="/signup"><button className="getstarted-button"> Get Started </button> </Link>)}
                        <button className="login-button"><Link className="login-link"to="/signup">Login</Link></button>
                    </div>
                </div> 
            </nav>
            </div>
        </header>
        
    )
}
