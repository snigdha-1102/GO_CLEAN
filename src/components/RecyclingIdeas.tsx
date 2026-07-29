import heroEnvironment from "@/assets/hero-environment.png";
import langData from "@/lang"; // ✅ ADDED
import GlobalHero from "./GlobalHero";

const RecyclingIdeas = () => {

  // ✅ LANGUAGE SETUP
  const lang = localStorage.getItem("lang") || "en";
  const t = langData[lang];

  const openVideo = (type) => {

    let url = "";

    if (type === "solid") {
      url = "https://www.youtube.com/results?search_query=solid+waste+management+recycling+process";
    }
    else if (type === "organic") {
      url = "https://www.youtube.com/results?search_query=organic+waste+composting+at+home";
    }
    else if (type === "hazardous") {
      url = "https://www.youtube.com/results?search_query=hazardous+waste+disposal+and+ewaste+management";
    }

    window.open(url, "_blank");
  };

  return (
    <GlobalHero>

    <section
    
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 py-20"
      style={{
        backgroundImage: `url(${GlobalHero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-5xl text-white">

        {/* TITLE */}
        <div className="mb-10">
          <div className="inline-block bg-green-600 px-10 py-4 rounded-full text-lg md:text-2xl font-bold shadow-xl">
            {t.recycling || "Recycling Ideas"}
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="mb-10 text-sm md:text-lg opacity-90 max-w-2xl mx-auto">
          {t.recycleDesc || "Learn how to manage waste efficiently and contribute to a cleaner and greener environment."}
        </p>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* SOLID */}
          <div
            onClick={() => openVideo("solid")}
            className="cursor-pointer bg-green-800/90 hover:bg-green-900 p-6 rounded-2xl shadow-xl transition transform hover:scale-105"
          >
            <h3 className="text-lg font-bold mb-2">
              {t.solidWaste || "Solid Waste"}
            </h3>
            <p className="text-sm opacity-80">
              {t.solidDesc || "Includes plastics, paper, metals. Learn how to recycle and reduce landfill waste."}
            </p>
          </div>

          {/* ORGANIC */}
          <div
            onClick={() => openVideo("organic")}
            className="cursor-pointer bg-green-800/90 hover:bg-green-900 p-6 rounded-2xl shadow-xl transition transform hover:scale-105"
          >
            <h3 className="text-lg font-bold mb-2">
              {t.organicWaste || "Organic Waste"}
            </h3>
            <p className="text-sm opacity-80">
              {t.organicDesc || "Food scraps, biodegradable waste. Convert it into compost for plants."}
            </p>
          </div>

          {/* HAZARDOUS */}
          <div
            onClick={() => openVideo("hazardous")}
            className="cursor-pointer bg-green-800/90 hover:bg-green-900 p-6 rounded-2xl shadow-xl transition transform hover:scale-105"
          >
            <h3 className="text-lg font-bold mb-2">
              {t.hazardousWaste || "Hazardous Waste"}
            </h3>
            <p className="text-sm opacity-80">
              {t.hazardousDesc || "Chemicals, batteries, e-waste. Needs safe disposal to avoid harm."}
            </p>
          </div>

        </div>

        {/* EXTRA SECTION */}
        <div className="mt-14 grid md:grid-cols-3 gap-6 text-sm">

          <div className="bg-white/10 p-4 rounded-xl">
            ♻️ {t.tip1 || "Reduce usage of plastic in daily life."}
          </div>

          <div className="bg-white/10 p-4 rounded-xl">
            🌱 {t.tip2 || "Compost kitchen waste at home."}
          </div>

          <div className="bg-white/10 p-4 rounded-xl">
            ⚡ {t.tip3 || "Recycle e-waste responsibly."}
          </div>

        </div>

        {/* QUOTE */}
        <p className="mt-12 text-sm md:text-base opacity-90 max-w-xl mx-auto italic">
          {t.recycleQuote || "When we keep our surroundings clean, we protect not just nature, but our future."}
        </p>

      </div>
    
    </section>
    </GlobalHero>

  );

};

export default RecyclingIdeas;