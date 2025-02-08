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
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1",
    },
    {
      name: "Four Seasons Hotel",
      city: "Lisbon",
      price: 99,
      rating: 8.8,
      review: "Excellent",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/232902339.jpg?k=3947def526b8af0429568b44f9716e79667d640842c48de5e66fd2a8b776accd&o=&hp=1",
    },
    {
      name: "Hilton Garden Inn",
      city: "Berlin",
      price: 105,
      rating: 8.9,
      review: "Excellent",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1",
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
