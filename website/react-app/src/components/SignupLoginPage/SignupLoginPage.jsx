// eslint-disable-next-line no-unused-vars
import React, { useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import * as Form from "@radix-ui/react-form";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import weblogo from "../../assets/AdVantage.svg";
import "./SignupLoginPage.css";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export default function SignupLoginPage() {
  // setting credentials for registration page
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [userName, setUsername] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [addclass, setaddclass] = useState("");
  const [errorMessageRegister, setErrorMessageRegister] = useState("");
  const [errorMessageLogin, setErrorMessageLogin] = useState("");

  //   handling submit
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    client
      .post("/user/register", {
        email: registerEmail,
        username: userName,
        password: registerPassword,
      })
      .then(function () {
        client
          .post("/user/login", {
            email: registerEmail,
            password: registerPassword,
          })
          .then(function () {
            setCurrentUser(true);
            navigate("/");
          }).catch(function (error) {
            console.log(error.response.status);
            // console.log("hello");
  
            // if (
            //   error.response &&
            //   (error.response.status === 500 || error.response.status === 400)
            // ) {
            //   // Set the error messages from the response
            //   setErrorMessage("An error occurred during registration.");
            // } else {
            //   // Handle generic error
            //   setErrorMessage("Unexpected error occurred.");
            // }
          });
      })
      .catch(function (error) {
        if (
          error.response &&
          (error.response.status === 500 || error.response.status === 400)
        ) {
          // Set the error messages from the response
          setErrorMessageRegister("An error occurred during registration.");
        } else {
          // Handle generic error
          setErrorMessageRegister("Unexpected error occurred during registration.");
        }
      });
      }
  

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    client
      .post("/user/login", {
        email: loginEmail,
        password: loginPassword,
      })
      .then(function () {
        setCurrentUser(true);
        navigate("/");
      })
      .catch(function (error) {
          if (error.response && error.response.data && error.response.data.errors) {
            // Set the error messages from the response
            setErrorMessageLogin(error.response.data.errors);
          } else {
            // Handle generic error
            setErrorMessageLogin('An error occurred during login. Please try again');
          }
        
      });
  };
  return (
    <section>
      <div className={`signup-login-container ${addclass}`}>
        <div className="form-container signup-container">
          <Form.Root className="FormRoot" onSubmit={handleSignupSubmit}>
            <div className="register-content">
            {errorMessageRegister && <div className="error-message">{errorMessageRegister}</div>}


              <h2>Register</h2>
            </div>
            <Form.Field className="FormField" name="username">
              <Form.Message className="FormMessage" match="valueMissing">
                Please enter your name
              </Form.Message>
              <div className="signup-username-container">
                <Form.Control asChild>
                  <input
                    type=""
                    placeholder="username"
                    id="username"
                    name="username"
                    required
                    aria-describedby="uidnote"
                    autoComplete="off"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Control>
              </div>
            </Form.Field>
            <Form.Field className="FormField" name="email">
              <div className="input-container">
                <Form.Message className="FormMessage" match="valueMissing">
                  Please enter your email
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Please provide a valid email
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  type="email"
                  placeholder="email"
                  id="signup-email"
                  name="signup-email"
                  required
                  value={registerEmail}
                  className="input-field-1"
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="password">
              <div className="input-container">
                <Form.Message className="FormMessage" match="valueMissing">
                  Please enter your password
                </Form.Message>
                {!isPasswordValid && (
                  <Form.Message className="FormMessage" htmlFor="password">
                    Please provide a password with a minimum of 8 characters.
                  </Form.Message>
                )}
              </div>
              {/* <span  className="input-icon"><FontAwesomeIcon icon={faLock} beat/></span> */}
              <Form.Control asChild>
                <input
                  type="password"
                  placeholder="password"
                  id="signup-password"
                  minLength={8}
                  name="signup-password"
                  required
                  value={registerPassword}
                  className="input-field-2"
                  onChange={(e) => {
                    setRegisterPassword(e.target.value);
                    setIsPasswordValid(e.target.value.length >= 8);
                  }}
                />
              </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
              <div className="signup-button-container">
                <button type="submit" className="register-button">
                  Register
                </button>
              </div>
            </Form.Submit>
          </Form.Root>
        </div>
        <div className="form-container login-container">
          <Form.Root className="FormRoot" onSubmit={handleLoginSubmit}>
            <div className="login-content">
            {errorMessageLogin && <div className="error-message">{errorMessageLogin}</div>}
              <h2>Login</h2>
            </div>
            <Form.Field className="FormField" name="email">
              <div className="input-container">
                <Form.Message className="FormMessage" match="valueMissing">
                  Please enter your email
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Please provide a valid email
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  type="email"
                  placeholder="email"
                  id="login-email"
                  name="login-email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="password">
              <div className="input-container">
                <Form.Message className="FormMessage" match="valueMissing">
                  Please enter your password
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  type="password"
                  placeholder="password"
                  id="login-password"
                  minLength={8}
                  name="login-password"
                  required
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    setIsPasswordValid(e.target.value.length >= 8);
                  }}
                />
              </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
              <div className="login-button-container">
                <button type="submit" className="login-button">
                  Login
                </button>
              </div>
            </Form.Submit>
          </Form.Root>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <img src={weblogo} className="logo" alt="AdVantage" />
              <button
                className="ghost"
                id="login-overlay-button"
                onClick={() => setaddclass("")}
              >
                GO TO LOGIN
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <img src={weblogo} className="logo" alt="AdVantage" />

              <button
                className="ghost"
                id="signup-overlay-button"
                onClick={() => setaddclass("right-panel-active")}
              >
                GO TO REGISTER
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
