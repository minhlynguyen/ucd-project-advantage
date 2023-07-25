// eslint-disable-next-line no-unused-vars
import React, { useState, useContext, useRef } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import "./HomePage.css";
import webhomepagelogo from "../../assets/AdVantageMainAnimated.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faLaptop,
  faPhoneVolume,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function HomePage() {
  // checking if user is loggged in
  const { currentUser } = useContext(UserContext);

  return (
    <main role="main">
      <section className="section-1" role="information about adVantage">
        <div className="section1-content">
          <h2>Grow your business with AdVantage</h2>
          <p>
            Get in data-driven support in growing your business. Find prime
            locations with high visiability when displaying your outdoor
            advertisment
          </p>
          <p className="contact-homepage">
            {" "}
            <FontAwesomeIcon className="phone-icon" icon={faPhone} />1 808 876
            783{" "}
          </p>
          <p className="small-text">
            Get started with free personalised support. Create your custom ad
            plan with a AdVantage Ads Expert.**
          </p>
          <p className="smaller-text">Monday - Friday, 9am-6pm</p>
          <div className="section1-homepage-button-container">
            {currentUser ? (
              <Link to="/solutionsp">
                <a className="homepage-getstarted-button">
                  Start now
                </a>
              </Link>
            ) : (
              <Link to="/signup">
                <a className="homepage-getstarted-button">
                  Start now
                </a>
              </Link>
            )}
          </div>
        </div>
        <img
          src={webhomepagelogo}
          className="section1-logo"
          alt="AdVantage-Header-Logo"
        />
      </section>
      <section className="section-2" role="benefits of using adVantage">
        <h2>Get the results that matter to you</h2>

        <div className="section2-content">
          <div className="content">
            <FontAwesomeIcon className="section2-icon" icon={faLaptop} beat />

            <h3>Drive Website Visits</h3>
          </div>
          <div className="content">
            {" "}
            <FontAwesomeIcon
              className="section2-icon"
              icon={faPhoneVolume}
              beat
            />
            <h3>Get More Phone Calls</h3>
          </div>
          <div className="content">
            {" "}
            <FontAwesomeIcon className="section2-icon" icon={faShop} beat />
            <h3>Increase Store Visits</h3>
          </div>
        </div>
      </section>

      <section className="section-3" id="testimonials" role="testimonials">
        <h2>Testimonials</h2>
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={6100}
        >
            <div className="myCarousel">
              <h3>Elite Fitness</h3>
              <h4>success with AdVantage</h4>
              <p className="testimonial-text">
                Using adVantage was a game-changer for our marketing efforts!
                With its powerful analytics and optimization tools, we were able
                to identify the most effective ad campaigns and channels. The
                platform is user-friendly interface made it easy for our team to
                understand the data and make data-driven decisions. 
              </p>
              <div className="stats-container">
                <div className="stats">
                  <h1>57%</h1>
                  <p>increase in sales</p>
                </div>
              <div className="stats">
                <h1>60%</h1>
                <p>expansion in market reach</p>
              </div>
              <div className="stats">
                <h1>25%</h1>
                <p>increase in conversion rate</p>
              </div>
            </div>
            </div>
            <div className="myCarousel">
              <h3>StartUp Enterprise</h3>
              <h4>Rapid Growth with AdVantage</h4>
              <p className="testimonial-text">
                When we launched our startup, we knew that getting our
                advertising strategy right was crucial for success. adVantage
                came to the rescue! It provided us with valuable insights into
                our target audience and allowed us to experiment with different
                ad creatives and placements
              </p>

              <div className="stats-container">
                <div className="stats">
                  <h1>267%</h1>
                  <p>increase in ROAS</p>
                </div>
              <div className="stats">
                <h1>11x</h1>
                <p>increase in web search</p>
              </div>
              <div className="stats">
                <h1>600%</h1>
                <p>increase in website traffic</p>
              </div>
            </div>
            </div>
            <div className="myCarousel">
              <h3>Non-profit</h3>
              <h4>Reach A Wider Audience</h4>
              <p className="testimonial-text">
                As a non-profit organization with a limited budget, we needed an
                advertising solution that could help us reach a wider audience
                and drive donations. adVantage delivered beyond our
                expectations! Its audience targeting tools helped us connect
                with individuals who were genuinely interested in our cause.
              </p>
              <div className="stats-container">
                <div className="stats">
                  <h1>40%</h1>
                  <p>increase in donations</p>
                </div>
              <div className="stats">
                <h1>100+</h1>
                <p>commmunity partnerships</p>
              </div>
              <div className="stats">
                <h1>20%</h1>
                <p>increase doners retention</p>
              </div>
            </div>
              
            </div>
        </Carousel>
      </section>
      <section className="section-4"  role="contacting adVantage">

       <h2>
          <span>Get more customers with </span> AdVantage
        </h2>
        <div className="homepage-button-container">
          {currentUser ? (
            <Link to="/solutions">
              <a className="homepage-getstarted-button">Start now</a>
            </Link>
          ) : (
            <Link to="/signup">
              <a className="homepage-getstarted-button">Start now</a>
            </Link>
          )}
        </div>
        <p>
          Get started with free personalised support. Create your custom ad plan
          with a AdVantage Ads Expert.**
        </p>
        <p className="contact-homepage">
          {" "}
          <FontAwesomeIcon className="phone-icon" icon={faPhone} />1 808 876 783{" "}
        </p>
      </section>
    </main>
  );
}
