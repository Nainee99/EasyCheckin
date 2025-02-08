import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(
    location.state?.destination || ""
  );
  const [date, setDate] = useState(
    location.state?.date || [
      { startDate: new Date(), endDate: new Date(), key: "selection" },
    ]
  );
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(
    location.state?.options || { adult: 1, children: 0, room: 1 }
  );

  // Reference for the date picker
  const dateRef = useRef(null);

  // Close the date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setOpenDate(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="list-page">
      <Navbar />
      <Header type="list" />
      <div className="list-container">
        <div className="list-wrapper">
          {/* Search Section */}
          <div className="list-search">
            <h2 className="ls-title">Find Your Stay</h2>

            {/* Destination Input */}
            <div className="ls-item">
              <label>Destination</label>
              <input
                type="text"
                placeholder="Where are you going?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            {/* Date Picker */}
            <div className="ls-item" ref={dateRef}>
              <label>Check-in Date</label>
              <span
                className="date-text"
                onClick={() => setOpenDate(!openDate)}
              >
                {`${format(date[0].startDate, "MM/dd/yyyy")} - ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                  className="date-range"
                />
              )}
            </div>

            {/* Options */}
            <div className="ls-item">
              <label>Options</label>
              <div className="ls-options">
                {[
                  { label: "Min Price", key: "minPrice", unit: "per night" },
                  { label: "Max Price", key: "maxPrice", unit: "per night" },
                  { label: "Adult", key: "adult" },
                  { label: "Children", key: "children" },
                  { label: "Room", key: "room" },
                ].map((item) => (
                  <div className="ls-option-item" key={item.key}>
                    <span className="ls-option-text">
                      {item.label} {item.unit && <small>({item.unit})</small>}
                    </span>
                    <input
                      type="number"
                      min={item.key === "adult" || item.key === "room" ? 1 : 0}
                      className="ls-option-input"
                      value={options[item.key]}
                      onChange={(e) =>
                        setOptions({ ...options, [item.key]: e.target.value })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <button className="list-search-btn">Search</button>
          </div>

          {/* Results Section */}
          <div className="list-result">
            {[...Array(6)].map((_, index) => (
              <SearchItem key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
