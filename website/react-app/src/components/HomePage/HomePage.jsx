// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react'
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import './HomePage.css'
import webhomepagelogo from '../../assets/AdVantageMainAnimated.svg'

export default function HomePage() {
    const { currentUser } = useContext(UserContext);

    return (
        <main> 
          
            <div className="homepage-container">
                <div className="logo-container">
                <img src={webhomepagelogo} className="homepagelogo" alt="AdVantage-Header-Logo"/>
                </div>
                <div className="homepage-text">
                    <p>Make Better Decisions.</p>
                </div>
                <div className="homepage-button-container">
                {currentUser ? (<Link className="getstarted-button" to="/solutionsp">
                              <button className="homepage-getstarted-button">Get Started</button>
                                 </Link>
                                ) : (
                                <Link className="getstarted-button" to="/signup">
                                 <button className="homepage-getstarted-button">Get Started</button>
                                 </Link>
                                 )}               
                                 
                 </div>
             </div>
        </main>
    )
}