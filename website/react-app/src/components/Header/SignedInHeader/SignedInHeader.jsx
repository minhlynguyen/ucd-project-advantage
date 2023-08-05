// Signed In Header that the user sees  whenn they log in
// eslint-disable-next-line no-unused-vars
import React, { useState, useContext} from "react";
import { UserContext } from "../../../App";
import { Link, useNavigate } from "react-router-dom";
import {
  GearIcon,
  HeartIcon,
  ExitIcon,
  PersonIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import axiosInstance from "../../../AxiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import weblogo from "../../../assets/AdVantageMain.svg";
import "../Header.css";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";


export default function SignedInHeader() {
  const navigate = useNavigate();
  const { setCurrentUser} = useContext(UserContext);
  const { currentUser } = useContext(UserContext);

  // handles responsive side bar
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);


  // submit logout functionality
const submitLogout= (e)=> {
    e.preventDefault();
    axiosInstance.post("api/user/logout/blacklist/", { refresh_token: localStorage.getItem('refresh_token')})
    .then(function () {
      setCurrentUser(false);
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      axiosInstance.defaults.headers['Authorization'] = '';
      toast.success("Logout successful.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // console.log("you clicked logout", res);
      navigate("/");
    }).catch(function () {
    // console.error('Logout failed:', error);
    toast.error('Logout failed. Please try again later.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  })
}

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
            {currentUser ? (
              <Link
                className="nav-links"
                to="/solutions"
                onClick={closeMobileMenu}
              >
                Solutions
              </Link>
            ) : (
              <Link className="nav-links" to="/signup">
                Solutions
              </Link>
            )}
          </li>
          <li className="nav-item">
            {currentUser ? (
              <Link
                className="nav-links saved-locations"
                to=""
                onClick={closeMobileMenu}
              >
                Saved Locations
              </Link>
            ) : (
              <Link className="nav-links saved-locations" to="/signup">
                Saved Locations
              </Link>
            )}
          </li>
          <Link className="login-register-link" onClick={submitLogout}>
            <button className="nav-links-mobile logoutbutton">Logout</button>
          </Link>
        </ul>

        <div className="dropdown-container">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className="IconButton"
                aria-label="Customise user options"
              >
                <FontAwesomeIcon className="profile-user" icon={faUser} />
              </button>
            </DropdownMenu.Trigger>


            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="DropdownMenuContent"
                sideOffset={5}
              >

                <DropdownMenu.Item className="DropdownMenuItem">
                  <PersonIcon className="icon" /> Profile
                </DropdownMenu.Item>

                <DropdownMenu.Item 
                  className="DropdownMenuItem"
                  onClick={()=>navigate('/saved')}
                >
                  <HeartIcon className="icon" />
                  Saved Locations
                </DropdownMenu.Item>

                <DropdownMenu.Item className="DropdownMenuItem" disabled>
                  <GearIcon className="icon" /> Settings
                </DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem" disabled>
                  <QuestionMarkCircledIcon className="icon" /> Help
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={submitLogout}
                  className="DropdownMenuItem"
                  tabIndex="0"
                >
                  <ExitIcon className="icon" /> Logout
                </DropdownMenu.Item>
                <DropdownMenu.Arrow className="DropdownMenuArrow" />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </nav>
    </header>
  );
}
