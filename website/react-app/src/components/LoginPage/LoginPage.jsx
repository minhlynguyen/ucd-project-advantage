// eslint-disable-next-line no-unused-vars 
import React from "react"
import weblogo from '../../assets/AdVantage.svg'
import './LoginPage.css'
export default function LoginPage() {


    // const handleSubmit = (e) 
    return (
        <section className="login-container">
            <div className="column login-left">
                <img src={weblogo} className="logo" alt="AdVantage"/>
                <div className=" login-left-content"></div>
            </div>
            <div className="column login-right"> 
                <form action="">
                    <div className="login-right-content">
                        <h2>Login</h2>
                        <p>Welcome Back, Please login to your account.</p>
                    </div>
                    <div className="input-container">
                      <input type="login-email" placeholder="example@gmail.com" id="login-email" name="login-email"/>
                        <input type="login-password" placeholder="password"id="login-assword" name="login-password"></input>
                    </div>
                    <div className="button-container">
                        <button>Register</button>
                        <button>Login</button>
                    </div>
                </form>
            </div>           
        </section>
    )
}