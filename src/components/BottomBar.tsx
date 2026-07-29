import { Home, Camera, FileText } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import langData from "@/lang"; // ✅ ADDED

const BottomBar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ LANGUAGE
  const lang = localStorage.getItem("lang") || "en";
  const t = langData[lang];

  const isActive = (path) =>
    location.pathname === path ? "text-green-400" : "text-white";

  return (

    <div className="fixed bottom-0 left-0 w-full bg-[#1f3b57] shadow-2xl md:hidden z-50">

      <div className="flex justify-between items-center px-8 h-16 relative">

        {/* HOME */}
        <button
          onClick={() => navigate("/")}
          className={`flex flex-col items-center text-xs ${isActive("/")}`}
        >
          <Home size={22} />
          <span className="mt-1">{t.home || "Home"}</span>
        </button>


        {/* CAMERA */}
        <button
          onClick={() => navigate("/scan")}
          className="absolute left-1/2 -translate-x-1/2 -top-7 bg-green-500 p-5 rounded-full shadow-xl border-4 border-[#1f3b57] active:scale-95 transition"
        >
          <Camera size={28} className="text-white" />
        </button>


        {/* REPORT */}
        <button
          onClick={() => navigate("/report")}
          className={`flex flex-col items-center text-xs ${isActive("/report")}`}
        >
          <FileText size={22} />
          <span className="mt-1">{t.report || "Report"}</span>
        </button>

      </div>

    </div>

  );

};

export default BottomBar;