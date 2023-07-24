// This Header page will include header used in the main page after user has logged in. 
// eslint-disable-next-line no-unused-vars 
import React, { useState, useRef, useContext } from 'react'
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import weblogo from '../../assets/AdVantageMain.svg'
import './Header.css';



export default function Header() {
    const { currentUser } = useContext(UserContext);
    const[click, setClick] = useState(false) 
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false);


    return (
        <header>          
            <nav className="navbar">
           <Link to="/" >  <img src={weblogo} className="navbar-logo" alt="AdVantage-Header-Logo"/></Link>
           <div className="menu-icon" onClick={handleClick}>
            <i className={ click ? "fas fa-times" : "fas fa-bars"} />
           </div>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className='nav-item'>
                                <Link className="nav-links" to="/" onClick={closeMobileMenu}>Home</Link>
                            </li>
                            <li className='nav-item'> 
                              <Link  className="nav-links" to="/signup" onClick={closeMobileMenu}>Solutions</ Link>
                              </li>
                            <li className='nav-item'>
                                <Link  className="nav-links" href="#testimonials">Testimonials</Link>
                            </li>
                            {currentUser ? (<Link className="login-register-link" to="/solutions"><button className="nav-links-mobile regbutton"> Get Started </button> </Link>) 
                            : (<Link className="login-register-link" to="/signup"><button className="nav-links-mobile regbutton"> Get Started </button> </Link>)}
                            <Link className="login-register-link"to="/signup"><button className="nav-links-mobile loginbutton">Login</button></Link>
                        </ul>
                        {currentUser ? (<Link className="login-register-link" to="/solutions"><button className="getstarted-button"> Get Started </button> </Link>) 
                            : (<Link className="login-register-link" to="/signup"><button className="getstarted-button"> Get Started </button> </Link>)}
                            <Link className="login-register-link"to="/signup"><button className="login-button">Login</button></Link>

            </nav>
        </header>
        
    )
    
}
