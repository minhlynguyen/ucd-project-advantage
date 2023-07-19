// Signed In Header that the user sees  whenn they log in
// eslint-disable-next-line no-unused-vars
import React, { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../../../App";
import { Link} from "react-router-dom";
import {
  GearIcon,
  HeartIcon,
  ExitIcon,
  PersonIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import weblogo from "../../../assets/AdVantageMain.svg";
import "../Header.css";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

// const client = axios.create({
//   baseURL: "http://127.0.0.1:8000",
// });

export default function SignedInHeader() {
  // const navigate = useNavigate();
  // const { setCurrentUser } = useContext(UserContext);
  const { currentUser} = useContext(UserContext);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  // console.log("this is the current user", username);

  // function submitLogout(e) {
  //   e.preventDefault();
  //   client.post("/user/logout", { withCredentials: true }).then(function (res) {
  //     setCurrentUser(false);
  //     console.log('you clicked logout', res)
  //     navigate("/");
  //   });
  // }

  return (
    <header>
      <div className="header-container">
        <FontAwesomeIcon
          className="dropdown-button"
          icon={faBars}
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        />
        <img src={weblogo} className="logo" alt="AdVantage-Header-Logo" />
        <nav>
          <div
            className={`nav-components ${
              isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
            }`}
          >
            <div className="nav-left">
              <ul>
                <li>
                  {" "}
                  <Link to="/">Home</Link>
                </li>
                <li>
                  {currentUser ? (
                    <Link to="/solutions">Solutions</Link>
                  ) : (
                    <Link to="/signup">Solutions</Link>
                  )}{" "}
                </li>
                <li>
                  {" "}
                  <Link to="/testimonials"> Testimonials</Link>
                </li>
              </ul>
            </div>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="IconButton" aria-label="Customise options">
                  <FontAwesomeIcon className="profile-user" icon={faUser} />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="DropdownMenuContent"
                  sideOffset={5}
                >
                  {/* <h3>
                    {username}
                    <br />
                    <span>{email}</span>
                  </h3> */}

                  <DropdownMenu.Item className="DropdownMenuItem">
                    <PersonIcon className="icon" /> My Profile
                  </DropdownMenu.Item>

                  <DropdownMenu.Item className="DropdownMenuItem">
                    <HeartIcon className="icon" />
                    Saved Locations
                  </DropdownMenu.Item>

                  <DropdownMenu.Item className="DropdownMenuItem" disabled>
                    <GearIcon className="icon" /> Settings
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="DropdownMenuItem" disabled>
                    <QuestionMarkCircledIcon className="icon" /> Help
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="DropdownMenuItem">
                    <ExitIcon className="icon"  /> Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </nav>
      </div>
    </header>
  );
}
