import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Account created! Logging you in...");

        // 🔹 Auto-Login after Signup
        try {
          const loginResponse = await fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });

          const loginData = await loginResponse.json();

          if (loginResponse.ok) {
            // Store tokens
            localStorage.setItem("access_token", loginData.access_token);
            localStorage.setItem("user_email", email);
            localStorage.setItem("refresh_token", loginData.refresh_token);
            localStorage.setItem("token_type", loginData.token_type);

            // Redirect to Home
            navigate("/");
          } else {
            // Fallback if login fails
            setMessage("✅ Account created! Redirecting to login...");
            setTimeout(() => navigate("/login"), 1500);
          }
        } catch (loginError) {
          console.error("Auto-login error:", loginError);
          navigate("/login");
        }

      } else {
        setMessage(`❌ ${data.detail || "Signup failed"}`);
      }
    } catch (error) {
      setMessage("❌ Server error. Is FastAPI running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-sky-300">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account ✨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg transition"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

          {message && (
            <p className="text-center text-sm mt-3">{message}</p>
          )}

        </form>
      </div>
    </div>
  );
};

export default SignUp;