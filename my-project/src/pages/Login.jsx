import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Cursor interactive effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://127.0.0.1:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // ✅ Store tokens in localStorage
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                localStorage.setItem("token_type", data.token_type);

                navigate("/");
                setMessage("✅ Login successful!");

                // Optional: redirect after login
                // window.location.href = "/dashboard";
            } else if (response.status === 422) {
                setMessage("❌ Validation Error: Check your email & password format.");
            } else {
                setMessage(`❌ ${data.detail || "Invalid credentials"}`);
            }
        } catch (error) {
            setMessage("❌ Server error. Is backend running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-sky-100 to-cyan-200"></div>

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            ></div>

            {/* Cursor effect */}
            <div
                className="pointer-events-none absolute inset-0 transition-all duration-75"
                style={{
                    background: `radial-gradient(circle 180px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.6), transparent 80%)`,
                }}
            ></div>

            {/* Card */}
            <div className="relative bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-96 border border-white/40">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Login 🔐
                </h2>

                <form onSubmit={handleLogin} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="text-gray-600 text-sm">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full mt-1 p-3 rounded-xl bg-white/70 text-gray-800 outline-none focus:ring-2 focus:ring-sky-400"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="text-gray-600 text-sm">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full mt-1 p-3 rounded-xl bg-white/70 text-gray-800 outline-none focus:ring-2 focus:ring-sky-400"
                        />
                        <div
                            className="absolute right-3 top-9 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-sky-500 hover:bg-sky-600 transition text-white py-3 rounded-xl font-semibold"
                    >
                        {loading ? "Authenticating..." : "Login"}
                    </button>

                    {/* Message */}
                    {message && (
                        <p className="text-center text-sm mt-3 text-gray-700">
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;
