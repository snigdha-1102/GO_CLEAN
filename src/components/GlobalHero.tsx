import { useEffect, useState } from "react";

import heroEnvironment from "@/assets/hero-environmentt.jpg";
//import heroGreenCity from "@/assets/hero-green-city.jpeg";
//import heroOcean from "@/assets/hero-ocean.webp";

//import gar from "@/assets/gar.webp";
//import sar from "@/assets/sar.jpeg";
import few from "@/assets/new.jpg";
import hhh from "@/assets/hhh.jpg";
import abc from "@/assets/abc.jpg";
//import five from "@/assets/5.jpg";
import six from "@/assets/6.jpg";
import seven from "@/assets/7.jpg";
import eight from "@/assets/8.jpg";
import nine from "@/assets/9.jpg";

const images = [
  heroEnvironment,
  //heroGreenCity,
  //heroOcean,
  //gar,
  //sar,
  few,
  hhh,
  //five,
  six,
  seven,
  abc,
  eight,
  nine
];

const GlobalHero = ({ children }) => {

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        src={images[currentImage]}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* PAGE CONTENT */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
};

export default GlobalHero;