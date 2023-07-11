// eslint-disable-next-line no-unused-vars
import React from "react"
<<<<<<< HEAD
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import './HomePage.css'
import webhomepagelogo from '../../assets/AdVantageMainAnimated.svg'

export default function HomePage() {
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
                    <Link className="getstarted-button" to ="/heatmap"><button className="homepage-getstarted-button"> Get Started</button>   </Link>
                </div>
=======
import LogoAnimated from "../AnimatedLogo/AnimatedLogo"
=======
import { Link } from 'react-router-dom';
>>>>>>> b3710aa (changes made to navbar, signin and signup)
import './HomePage.css'
import webhomepagelogo from '../../assets/AdVantageMainAnimated.svg'

export default function HomePage() {
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
                    <Link className="getstarted-button" to ="/heatmap"><button className="homepage-getstarted-button"> Get Started</button>   </Link>
                </div>
>>>>>>> 8dabbb0 (changes made but not final)
             </div>
        </main>
    )
}