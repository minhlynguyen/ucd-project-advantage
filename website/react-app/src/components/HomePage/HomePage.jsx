// eslint-disable-next-line no-unused-vars
import React from "react"
import LogoAnimated from "../AnimatedLogo/AnimatedLogo"
import './HomePage.css'
export default function HomePage() {
    return (
        <main> 
            <div className="homepage-container">
                <div className="logo-container">
                    <LogoAnimated className="animated-svg" />
                </div>
                <div className="homepage-button-container">
                    <button className="homepage-getstarted-button">
                    <a>Get Started</a>
                    </button>   
                </div>
             </div>
        </main>
    )
}