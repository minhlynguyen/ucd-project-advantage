
// eslint-disable-next-line no-unused-vars 
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebook, faTwitter} from '@fortawesome/free-brands-svg-icons';
import './Footer.css'
const Footer = () => {
  // Define the data for the footer
//   const description =
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
//   const title = "Lorem Ipsum";

  const columns = [
    {
      title: "About AdVantage",
      resources: [
        { name: "About Us", link: "/item1" },
        { name: "Careers", link: "/item2" },
        { name: "FAQ", link: "/item2" },
        { name: "Contact", link: "/item2" },


      ]
    },
    {
      title: "Resources",
      resources: [
        { name: "Consulation", link: "/item5" },
        { name: "Costs", link: "/item6" },
        { name: "Business Solutions", link: "/item7" },

      ]
    },
    {
      title: "Learning & Support",
      resources: [
        { name: "Your Guide", link: "/item8" },
      ]
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* <h3>{title}</h3>
        <p>{description}</p> */}
      </div>
      <div className="footer-columns">
        {columns.map((column, index) => (
          <div key={index} className="footer-column">
            <h4>{column.title}</h4>
            <ul>
              {column.resources.map((resource, index) => (
                <li key={index}>
                  <a href={resource.link}>{resource.name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-social-icons">
        <FontAwesomeIcon icon={faLinkedin} />
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faTwitter} />
      </div>
    </footer>
  );
};

export default Footer;
