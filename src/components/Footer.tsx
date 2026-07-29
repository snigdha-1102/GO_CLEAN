import logo from "@/assets/Logo.png";

const Footer = () => {
  return (
    <footer className="hidden md:block bg-[#1f3b57] text-white py-3 px-4 text-sm">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="GO CLEAN"
            className="h-6 w-auto"
          />
          <span className="font-semibold">GO.CLEAN</span>
        </div>

        <p className="text-xs opacity-80">
          © 2026 GO.CLEAN · Clean community, healthy future
        </p>

        <span className="text-xs opacity-80">
          Punjab, India
        </span>

      </div>
    </footer>
  );
};

export default Footer;