import React from "react";
import "./Featured.css";

const Featured = () => {
  const featuredCities = [
    {
      name: "Dublin",
      properties: 123,
      image:
        "https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=",
    },
    {
      name: "Reno",
      properties: 533,
      image:
        "https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=",
    },
    {
      name: "Austin",
      properties: 532,
      image:
        "https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=",
    },
  ];

  return (
    <section className="featured">
      {featuredCities.map((city, index) => (
        <div key={index} className="featured-item">
          <img
            src={city.image || "/placeholder.svg"}
            alt={city.name}
            className="featured-img"
          />
          <div className="featured-titles">
            <h2>{city.name}</h2>
            <p>{city.properties} properties</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Featured;
