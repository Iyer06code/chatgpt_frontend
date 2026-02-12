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

  // Hide header & footer on dashboard
  const hideLayout = location.pathname === "/dashboard";

  return (
    <>
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

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
