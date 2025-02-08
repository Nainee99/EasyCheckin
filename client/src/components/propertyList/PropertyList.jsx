import React from "react";
import "./PropertyList.css";

const PropertyList = () => {
  const properties = [
    {
      image:
        "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
      title: "Hotels",
      count: 233,
    },
    {
      image:
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
      title: "Apartments",
      count: 2331,
    },
    {
      image:
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
      title: "Resorts",
      count: 2331,
    },
    {
      image:
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
      title: "Villas",
      count: 2331,
    },
    {
      image:
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
      title: "Cabins",
      count: 2331,
    },
  ];

  return (
    <div className="property-list">
      {properties.map((property, index) => (
        <div key={index} className="property-item">
          <img
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            className="property-img"
          />
          <div className="property-titles">
            <h3>{property.title}</h3>
            <p>{property.count} properties</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
