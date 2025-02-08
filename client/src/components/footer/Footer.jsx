import "./Footer.css";

const Footer = () => {
  const footerLists = [
    ["Countries", "Regions", "Cities", "Districts", "Airports", "Hotels"],
    ["Homes", "Apartments", "Resorts", "Villas", "Hostels", "Guest houses"],
    [
      "Unique places to stay",
      "Reviews",
      "Unpacked: Travel articles",
      "Travel communities",
      "Seasonal and holiday deals",
    ],
    ["Car rental", "Flight Finder", "Restaurant reservations", "Travel Agents"],
    [
      "Customer Service",
      "Partner Help",
      "Careers",
      "Sustainability",
      "Press center",
      "Safety Resource Center",
      "Investor relations",
      "Terms & conditions",
    ],
  ];

  return (
    <footer className="footer">
      <div className="footer-lists">
        {footerLists.map((list, index) => (
          <ul key={index} className="footer-list">
            {list.map((item, itemIndex) => (
              <li key={itemIndex} className="footer-list-item">
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="footer-text">
        Copyright © {new Date().getFullYear()} EasyCheckin.
      </div>
    </footer>
  );
};

export default Footer;
