import heroEnvironment from '@/assets/hero-environment.png';
import langData from "@/lang"; // ✅ ADDED


import heroGreenCity from "@/assets/hero-green-city.jpeg";
import heroOcean from "@/assets/hero-ocean.webp";
import GlobalHero from './GlobalHero';
const About = () => {

  // ✅ LANGUAGE SETUP
  const lang = localStorage.getItem("lang") || "en";
  const t = langData[lang];

  return (
    <GlobalHero>
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{
        backgroundImage: `url(${GlobalHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-white w-full max-w-4xl">

        {/* TITLE */}
        <div className="mb-12">
          <div className="inline-block bg-green-600 px-10 py-3 rounded-full text-lg md:text-xl font-semibold shadow-lg">
            {t.aboutTitle || "ABOUT US"}
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="mb-10 text-sm md:text-lg opacity-90 max-w-2xl mx-auto">
          {t.aboutDesc || "GO.CLEAN is a smart waste management platform that helps citizens report issues like illegal dumping, overflowing bins, and damaged infrastructure."}
        </p>

        {/* 3 CARDS */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">

          {/* CARD 1 */}
          <div className="bg-green-700 hover:bg-green-800 px-8 py-6 rounded-xl w-72 shadow-lg transition transform hover:scale-105">
            <h3 className="font-bold text-lg mb-2">01</h3>
            <p className="font-semibold">{t.whatWeDo || "What we do"}</p>
            <p className="text-sm mt-2 opacity-80">
              {t.whatDesc || "We allow users to report waste problems with images and location."}
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-green-700 hover:bg-green-800 px-8 py-6 rounded-xl w-72 shadow-lg transition transform hover:scale-105">
            <h3 className="font-bold text-lg mb-2">02</h3>
            <p className="font-semibold">{t.howWeWork || "How we work"}</p>
            <p className="text-sm mt-2 opacity-80">
              {t.howDesc || "Reports are sent to admins who track and update cleaning progress."}
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-green-700 hover:bg-green-800 px-8 py-6 rounded-xl w-72 shadow-lg transition transform hover:scale-105">
            <h3 className="font-bold text-lg mb-2">03</h3>
            <p className="font-semibold">{t.progressStatus || "Progress Status"}</p>
            <p className="text-sm mt-2 opacity-80">
              {t.progressDesc || "Users can see real-time updates like Pending, In Progress, or Completed."}
            </p>
          </div>

        </div>

        {/* EXTRA SECTION */}
        <div className="mt-14 grid md:grid-cols-3 gap-4 text-sm">

          <div className="bg-white/10 p-4 rounded-lg">
            📍 {t.feature1 || "Location-based reporting"}
          </div>

          <div className="bg-white/10 p-4 rounded-lg">
            📸 {t.feature2 || "Image upload proof"}
          </div>

          <div className="bg-white/10 p-4 rounded-lg">
            📊 {t.feature3 || "Live status tracking"}
          </div>

        </div>

        {/* FOOTER */}
        <p className="mt-14 text-sm md:text-base opacity-90 italic">
          {t.aboutQuote || "Together, small actions create a big environmental impact."}
        </p>

      </div>
    </section>
    </GlobalHero>
  );
};

export default About;