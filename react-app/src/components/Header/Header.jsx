// This Header page will include header used in the main page after user has logged in.
// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import weblogo from "../../assets/AdVantageMain.svg";
import "./Header.css";

export default function Header() {
  // checking if the user is logged in our not
  const { currentUser } = useContext(UserContext);
  // handles responsiveness of the page
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <header role="banner">
      <nav role="navigation" className="navbar">
          <img
            src={weblogo}
            className="navbar-logo"
            alt="AdVantage-Header-Logo"
          />
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link className="nav-links" to="/" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-links" to="/signup" onClick={closeMobileMenu}>
              Solutions
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-links" href="#testimonials">
              Testimonials
            </Link>
          </li> */}
          {currentUser ? (
            <Link className="login-register-link nav-links-mobile regbutton" to="/solutions">
              Get Started {" "}
            </Link>
          ) : (
            <Link className="login-register-link nav-links-mobile regbutton" to="/signup">
               Get Started{" "}
            </Link>
          )}
          <Link className="login-register-link nav-links-mobile loginbutton" to="/signup">
            Login
          </Link>
        </ul>
        {currentUser ? (
          <Link className="login-register-link getstarted-button" to="/solutions">
            Get Started {" "}
          </Link>
        ) : (
          <Link className="login-register-link getstarted-button" to="/signup">
            Get Started{" "}
          </Link>
        )}
        <Link className="login-register-link login-button" to="/signup">
        Login
        </Link>
      </nav>
    </header>
  );
}
