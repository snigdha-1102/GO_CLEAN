import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);

  const handleSignup = async(e:any) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({name,email,password})
    });

    const data = await res.json();

    if(res.ok){
      alert("Signup successful");
      navigate("/login");
    }else{
      alert(data.message);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 px-4">

      <form
        onSubmit={handleSignup}
        className="backdrop-blur-xl bg-white/70 border border-white/30 p-8 shadow-2xl rounded-2xl w-full max-w-sm transition-all duration-300 hover:shadow-green-200"
      >

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Account 🚀
        </h2>

        {/* Name */}
        <input
          required
          placeholder="Name"
          className="border w-full mb-4 p-3 rounded-lg focus:outline-none focus:border-green-500"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        {/* Email */}
        <input
          required
          type="email"
          placeholder="Email"
          className="border w-full mb-4 p-3 rounded-lg focus:outline-none focus:border-green-500"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative mb-5">
          <input
            required
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border w-full p-3 rounded-lg focus:outline-none focus:border-green-500"
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

        <button className="bg-green-600 hover:bg-green-700 text-white w-full p-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02] shadow-md">
          Signup
        </button>

        <p className="text-sm text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={()=>navigate("/login")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </form>

    </div>
  );
};

export default Signup;