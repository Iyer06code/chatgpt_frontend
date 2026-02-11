import React, { useState, useEffect } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Aesthetic Light Blue Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-blue-100 to-cyan-200"></div>

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Cursor Pattern Effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-75"
        style={{
          background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.6), transparent 80%)`,
        }}
      ></div>

      {/* Login Card */}
      <div className="relative bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-96 border border-white/40">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome Back 👋
          Good Day!!
        </h2>

        <form className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-gray-600 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-3 rounded-xl bg-white/70 text-gray-800 outline-none focus:ring-2 focus:ring-sky-400 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-gray-600 text-sm">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full mt-1 p-3 rounded-xl bg-white/70 text-gray-800 outline-none focus:ring-2 focus:ring-sky-400 transition"
            />
            <div
              className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-gray-800"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-sky-500" />
              Remember me
            </label>
            <a href="#" className="text-sky-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 transition transform hover:scale-105 text-white py-3 rounded-xl font-semibold shadow-lg"
          >
            Login
          </button>

          {/* Signup */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Don’t have an account?{" "}
            <a href="#" className="text-sky-600 hover:underline">
              Sign Up
            </a>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;
