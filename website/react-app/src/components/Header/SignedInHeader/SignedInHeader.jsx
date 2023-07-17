// Signed In Header that the user sees  whenn they log in
// eslint-disable-next-line no-unused-vars 
import React, { useState, useContext } from 'react'
import { UserContext } from '../../../App';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import weblogo from '../../../assets/AdVantageMain.svg';
import '../Header.css'


export default function SignedInHeader(){
   const { currentUser } = useContext(UserContext);
   const [isNavExpanded, setIsNavExpanded] = useState(false)

    return(
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
                        <li> <Link to="/">Home</Link></li>
                        <li>{currentUser ? ( <Link to="/heatmap">Solutions</Link> ) : ( <Link to="/signup">Solutions</Link> )} </li> 
                        <li> <Link to="/testimonials"> Testimonials</Link></li>
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