import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

/* ------------------- Layout Wrapper ------------------- */

function Layout() {
  const location = useLocation();

  // Hide header & footer on dashboard, and on home when logged in (sidebar layout)
  const isLoggedIn = !!localStorage.getItem("access_token");
  const hideLayout = location.pathname === "/dashboard" || (location.pathname === "/" && isLoggedIn);

  return (
    <>
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />


        {/* 🔐 Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            localStorage.getItem("access_token")
              ? <Dashboard />
              : <Navigate to="/login" />
          }
        />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

/* ------------------- App Root ------------------- */

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;