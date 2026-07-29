import { useState } from "react";
import logo from "@/assets/Logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import langData from "@/lang"; // ✅ ADDED

const Navbar = () => {

  const [open,setOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ LANGUAGE SETUP
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const t = langData[lang];

  const changeLang = (lng) => {
    localStorage.setItem("lang", lng);
    setLang(lng);
    window.location.reload(); // simple refresh
  };

  // get user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (

    <nav className="fixed top-0 left-0 w-full z-50 bg-[#1f3b57]/90 backdrop-blur-md shadow-lg">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-14 text-white">

          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="GO CLEAN" className="h-8 w-auto" />
            <span className="text-lg md:text-xl font-bold tracking-wide">
              GO.CLEAN
            </span>
          </NavLink>


          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">

  <NavLink
    to="/"
    className={({ isActive }) =>
      isActive ? "text-green-400" : "hover:text-green-400"
    }
  >
    {t.home}
  </NavLink>

  <NavLink
    to="/recycling"
    className={({ isActive }) =>
      isActive ? "text-green-400" : "hover:text-green-400"
    }
  >
    {t.recycling}
  </NavLink>

  <NavLink
    to="/report"
    className={({ isActive }) =>
      isActive ? "text-green-400" : "hover:text-green-400"
    }
  >
    {t.report}
  </NavLink>

  <NavLink
    to="/about"
    className={({ isActive }) =>
      isActive ? "text-green-400" : "hover:text-green-400"
    }
  >
    {t.about}
  </NavLink>
  <NavLink
  to="/feed"
  className={({ isActive }) =>
    isActive ? "text-green-400" : "hover:text-green-400"
  }
>
  {t.feed}
</NavLink>

  {user && (
    <NavLink
      to="/my-reports"
      className={({ isActive }) =>
        isActive ? "text-green-400" : "hover:text-green-400"
      }
    >
      {t.myReports}
    </NavLink>
  )}



            {/* ✅ LANGUAGE DROPDOWN (DESKTOP) */}
            <select
              value={lang}
              onChange={(e) => changeLang(e.target.value)}
              className="text-black px-2 py-1 rounded"
            >
  <option value="en">English</option>
<option value="hi">हिन्दी</option>
<option value="bn">বাংলা</option>
<option value="ta">தமிழ்</option>
<option value="te">తెలుగు</option>
<option value="mr">मराठी</option>
<option value="gu">ગુજરાતી</option>
<option value="kn">ಕನ್ನಡ</option>
<option value="ml">മലയാളം</option>
<option value="pa">ਪੰਜਾਬੀ</option>
            </select>

            {/* USER LOGIN STATUS */}
            {user ? (

              <div className="flex items-center gap-4">

                <span className="text-green-400">
                  {t.welcome} {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="border border-white px-3 py-1 rounded-full hover:bg-white hover:text-[#1f3b57]"
                >
                  {t.logout}
                </button>

              </div>

            ) : (

              <>
                <NavLink
                  to="/login"
                  className="bg-green-600 px-4 py-1 rounded-full hover:bg-green-700"
                >
                  {t.login}
                </NavLink>

                <NavLink
                  to="/signup"
                  className="border border-white px-4 py-1 rounded-full hover:bg-white hover:text-[#1f3b57]"
                >
                  {t.signup}
                </NavLink>
              </>

            )}

          </div>


          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={()=>setOpen(!open)}
          >
            {open ? <X size={26}/> : <Menu size={26}/>}
          </button>

        </div>

      </div>


      {/* MOBILE DROPDOWN */}
      {open && (

        <div className="md:hidden bg-[#1f3b57] text-white px-6 py-4 space-y-4">

          {/* ✅ LANGUAGE DROPDOWN (MOBILE) */}
          <select
            value={lang}
            onChange={(e) => changeLang(e.target.value)}
            className="text-black px-2 py-1 rounded w-full"
          >
<option value="en">English</option>
<option value="hi">हिन्दी</option>
<option value="bn">বাংলা</option>
<option value="ta">தமிழ்</option>
<option value="te">తెలుగు</option>
<option value="mr">मराठी</option>
<option value="gu">ગુજરાતી</option>
<option value="kn">ಕನ್ನಡ</option>
<option value="ml">മലയാളം</option>
<option value="pa">ਪੰਜਾਬੀ</option>
          </select>

          <NavLink
            to="/"
            onClick={()=>setOpen(false)}
            className="block"
          >
            {t.home}
          </NavLink>

          <NavLink
            to="/recycling"
            onClick={()=>setOpen(false)}
            className="block"
          >
            {t.recycling}
          </NavLink>

          <NavLink
            to="/report"
            onClick={()=>setOpen(false)}
            className="block"
          >
            {t.report}
          </NavLink>

          <NavLink
            to="/about"
            onClick={()=>setOpen(false)}
            className="block"
          >
            {t.about}
          </NavLink>
          <NavLink
            to="/feed"
            onClick={()=>setOpen(false)}
            className="block"
            >
             FEED
            </NavLink>

          {user && (
            <NavLink
              to="/my-reports"
              onClick={()=>setOpen(false)}
              className="block"
            >
              {t.myReports}
            </NavLink>
          )}

          {user ? (

            <button
              onClick={()=>{
                handleLogout();
                setOpen(false);
              }}
              className="block text-left w-full"
            >
              {t.logout}
            </button>

          ) : (

            <>
              <NavLink
                to="/login"
                onClick={()=>setOpen(false)}
                className="block"
              >
                {t.login}
              </NavLink>

              <NavLink
                to="/signup"
                onClick={()=>setOpen(false)}
                className="block"
              >
                {t.signup}
              </NavLink>
            </>

          )}

        </div>

      )}

    </nav>

  );

};

export default Navbar;