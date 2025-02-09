import React from "react";
import "./FeaturedProperties.css";

const FeaturedProperties = () => {
  const properties = [
    {
      name: "Aparthotel Stare Miasto",
      city: "Madrid",
      price: 120,
      rating: 8.9,
      review: "Excellent",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
    },
    {
      name: "Comfort Suites Airport",
      city: "Austin",
      price: 140,
      rating: 9.3,
      review: "Exceptional",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/283357449.jpg?k=0f523f4d595dd77263e47df31ff5950931819f5c80107500f4cf3b8b5b6c5d98&o=&hp=1",
    },
    {
      name: "Four Seasons Hotel",
      city: "Lisbon",
      price: 99,
      rating: 8.8,
      review: "Excellent",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRaCkQn3FdDP_yyO1yf2iq3Y1E9vUVemT0ajV_JTGAd_ugOZI4sYEtHFbtnkUH-Te1ljM&usqp=CAU",
    },
    {
      name: "Hilton Garden Inn",
      city: "Berlin",
      price: 105,
      rating: 8.9,
      review: "Excellent",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9AZNYb5cGw6N9py7Yj-Yf3qbDImvMBO6hBQ&s",
    },
  ];

  return (
    <section className="featured-properties">
      {properties.map((property, index) => (
        <div key={index} className="fp-item">
          <img
            src={property.image || "/placeholder.svg"}
            alt={property.name}
            className="fp-img"
          />
          <div className="fp-details">
            <h3 className="fp-name">{property.name}</h3>
            <p className="fp-city">{property.city}</p>
            <p className="fp-price">Starting from ${property.price}</p>
            <div className="fp-rating">
              <span className="fp-rating-score">{property.rating}</span>
              <span className="fp-rating-review">{property.review}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeaturedProperties;
