import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import {
  faGlobe,
  faHotel,
  faPlane,
  faCar,
  faUmbrellaBeach,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./footer.css";

const Footer = () => {
  const footerLists = [
    {
      title: "Destinations",
      icon: faGlobe,
      items: [
        "Countries",
        "Regions",
        "Cities",
        "Districts",
        "Airports",
        "Hotels",
      ],
    },
    {
      title: "Accommodations",
      icon: faHotel,
      items: [
        "Homes",
        "Apartments",
        "Resorts",
        "Villas",
        "Hostels",
        "Guest houses",
      ],
    },
    {
      title: "Travel Inspiration",
      icon: faUmbrellaBeach,
      items: [
        "Unique places to stay",
        "Reviews",
        "Travel articles",
        "Travel communities",
        "Seasonal deals",
      ],
    },
    {
      title: "Transportation",
      icon: faCar,
      items: ["Car rental", "Flight finder", "Airport taxis", "Train tickets"],
    },
    {
      title: "About",
      icon: faInfoCircle,
      items: [
        "About EasyCheckin",
        "Careers",
        "Press center",
        "Investor relations",
        "Terms & conditions",
        "Partner dispute",
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-lists">
          {footerLists.map((list, index) => (
            <div key={index} className="footer-list">
              <h3 className="footer-list-title">
                <FontAwesomeIcon
                  icon={list.icon}
                  className="footer-list-icon"
                />
                {list.title}
              </h3>
              <ul>
                {list.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="footer-list-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <div className="footer-social">
            <a href="#" className="footer-social-link">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="footer-social-link">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="footer-social-link">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="footer-social-link">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
          <div className="footer-text">
            Copyright © {new Date().getFullYear()} EasyCheckin. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
