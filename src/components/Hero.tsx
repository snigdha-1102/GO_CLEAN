import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import langData from "@/lang";

import heroEnvironment from "@/assets/hero-environmentt.jpg";
import few from "@/assets/new.jpg";
import hhh from "@/assets/hhh.jpg";
import abc from "@/assets/abc.jpg";
import six from "@/assets/6.jpg";
import seven from "@/assets/7.jpg";
import eight from "@/assets/8.jpg";
import nine from "@/assets/9.jpg";

const images = [
  heroEnvironment,
  few,
  hhh,
  six,
  seven,
  abc,
  eight,
  nine
];

const Hero = () => {

  const navigate = useNavigate();

  const lang = localStorage.getItem("lang") || "en";
  const t = langData[lang];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // slightly slower for better UX

    return () => clearInterval(interval);
  }, []);

  return (

    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden">

      {/* Background Images */}
      {images.map((img, index) => (

        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-in-out ${
            index === currentImage ? "opacity-100 scale-110" : "opacity-0 scale-100"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />

      ))}

      {/* Gradient + Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80 backdrop-blur-[2px]" />

      {/* TEXT CONTENT */}
      <div className="relative z-10 max-w-3xl text-white animate-fadeInUp">

        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-6 tracking-wide drop-shadow-lg">

          {t.heroTitle.split(",")[0]},<br />
          <span className="text-green-400">
            {t.heroTitle.split(",")[1]}
          </span>

        </h1>

        <p className="text-sm sm:text-base md:text-lg italic opacity-90 mb-10 sm:mb-12 max-w-xl mx-auto">
          {t.heroSubtitle}
        </p>

      </div>

      {/* BOTTOM BUTTONS */}
      <div className="absolute bottom-28 sm:bottom-20 z-10 flex flex-col sm:flex-row gap-4 sm:gap-6">

        <Button
          onClick={() => navigate("/recycling")}
          className="w-48 sm:w-56 h-12 sm:h-14 bg-green-500/90 backdrop-blur-md border border-white/20 hover:bg-green-600 text-white text-base sm:text-lg rounded-full shadow-xl hover:scale-105 transition-all duration-300"
        >
          {t.recycleBtn}
        </Button>

        <Button
          onClick={() => navigate("/report")}
          className="w-48 sm:w-56 h-12 sm:h-14 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white text-base sm:text-lg rounded-full shadow-xl hover:scale-105 transition-all duration-300"
        >
          {t.reportBtn}
        </Button>

      </div>

      {/* SLIDER DOT INDICATORS */}
      <div className="absolute bottom-6 sm:bottom-8 z-10 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-all duration-300 ${
              index === currentImage ? "bg-green-400 scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* CAMERA BUTTON */}
      <button
        onClick={() => navigate("/scan")}
        className="hidden md:flex items-center justify-center fixed bottom-8 right-8 z-20 bg-white/90 hover:bg-white text-black p-4 rounded-full shadow-2xl transition transform hover:scale-110 backdrop-blur-md border border-gray-200"
      >
        <Camera size={28} />
      </button>

    </section>

  );

};

export default Hero;