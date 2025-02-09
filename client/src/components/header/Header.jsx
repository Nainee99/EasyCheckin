"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./Header.css";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
    }));
  };

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <header className={`header ${type === "list" ? "list-mode" : ""}`}>
      <div className="header-container">
        <nav className="header-nav">
          <ul className="header-list">
            {[
              { icon: faBed, text: "Stays", active: true },
              { icon: faPlane, text: "Flights" },
              { icon: faCar, text: "Car rentals" },
              { icon: faBed, text: "Attractions" },
              { icon: faTaxi, text: "Airport taxis" },
            ].map((item, index) => (
              <li
                key={index}
                className={`header-list-item ${item.active ? "active" : ""}`}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </nav>
        {type !== "list" && (
          <>
            <div className="header-content">
              <h1 className="header-title">
                A lifetime of discounts? It's Genius.
              </h1>
              <p className="header-desc">
                Get rewarded for your travels – unlock instant savings of 10% or
                more with a free EasyCheckin account
              </p>
            </div>
            <div className="header-search">
              <div className="header-search-item">
                <FontAwesomeIcon icon={faBed} className="header-icon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="header-search-input"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="header-search-item">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="header-icon"
                />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="header-search-text"
                >
                  {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                    date[0].endDate,
                    "MM/dd/yyyy"
                  )}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="header-search-item">
                <FontAwesomeIcon icon={faPerson} className="header-icon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="header-search-text"
                >
                  {`${options.adult} adult · ${options.children} children · ${options.room} room`}
                </span>
                {openOptions && (
                  <div className="options">
                    {Object.entries(options).map(([key, value]) => (
                      <div key={key} className="option-item">
                        <span className="option-text">{key}</span>
                        <div className="option-counter">
                          <button
                            disabled={key === "adult" ? value <= 1 : value <= 0}
                            className="option-counter-button"
                            onClick={() => handleOption(key, "d")}
                          >
                            -
                          </button>
                          <span className="option-counter-number">{value}</span>
                          <button
                            className="option-counter-button"
                            onClick={() => handleOption(key, "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="header-search-item">
                <button className="header-btn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
