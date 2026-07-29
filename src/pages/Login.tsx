import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase";

const Login = () => {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);
  const [googleLoading,setGoogleLoading] = useState(false);

  // ✅ NORMAL LOGIN
  const handleLogin = async(e:any)=>{
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method:"POST",
          headers:{ "Content-Type":"application/json" },
          body:JSON.stringify({email,password})
        }
      );

      const data = await res.json();

      if(res.ok){
        localStorage.setItem("user",JSON.stringify(data.user));
        alert(`Welcome ${data.user.name}`);
        navigate("/");
      }else{
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    }

    setLoading(false);
  };

  // ✅ GOOGLE LOGIN (FIXED 🔥)
const handleGoogleLogin = async () => {
  setGoogleLoading(true);

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userData = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL
    };

    // ✅ CALL BACKEND
    const res = await fetch("http://localhost:5000/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    const data = await res.json();

    console.log("Backend user:", data);

    // ✅ STORE BACKEND USER (IMPORTANT)
    localStorage.setItem("user", JSON.stringify(data.user));

    navigate("/");

  } catch (error) {
    console.log(error);
    alert("Google login failed");
  }

  setGoogleLoading(false); // ✅ INSIDE FUNCTION
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 px-4">

      <form
        onSubmit={handleLogin}
        className="backdrop-blur-xl bg-white/70 border border-white/30 p-8 shadow-2xl rounded-2xl w-full max-w-sm transition-all duration-300 hover:shadow-green-200"
      >

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back 👋
        </h2>

        {/* Email */}
        <div className="relative mb-5">
          <input
            required
            type="email"
            className="peer w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-green-500 bg-transparent"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <label className="absolute left-3 top-3 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-600 bg-white px-1">
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <input
            required
            type={showPassword ? "text" : "password"}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-green-500"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <span
            onClick={()=>setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-600"
          >
            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
          </span>
        </div>

        {/* Login Button */}
        <button
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white w-full p-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02] shadow-md disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2 my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          disabled={googleLoading}
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          {googleLoading ? "Signing in..." : "Continue with Google"}
        </button>

        {/* Signup Link */}
        <p className="text-sm text-center mt-5 text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={()=>navigate("/signup")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Signup
          </span>
        </p>

      </form>

    </div>
  );
};

export default Login;