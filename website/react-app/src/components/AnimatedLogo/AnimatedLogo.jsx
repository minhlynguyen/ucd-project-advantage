// eslint-disable-next-line no-unused-vars 
import React from 'react';
import './AnimatedLogo.css'; // Import CSS styles for animations
import WeblogoAnimated from '../../assets/AdVantageMainAnimated.svg';

const LogoAnimated = () => {
  return (
    <div className="svg-container">
      <img src={WeblogoAnimated} className="animated-svg" alt="Animated Logo" />
    </div>
  );
}

export default LogoAnimated;
