import { useState } from "react";
import Home from "./home";

const Dashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen overflow-hidden">

      {/* ================= Sidebar ================= */}
      <div
        className={`bg-gray-900 text-white flex flex-col transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 hover:bg-gray-800 text-left"
        >
          ☰
        </button>

        {/* New Chat */}
        {sidebarOpen && (
          <button className="bg-blue-600 mx-4 p-2 rounded hover:bg-blue-700">
            + New Chat
          </button>
        )}

        {/* History */}
        <div className="flex-1 overflow-y-auto p-4 text-sm text-gray-300">
          {sidebarOpen && <p>History will appear here</p>}
        </div>

        {/* Bottom Profile Section */}
        <div className="border-t border-gray-700 p-4">
          {sidebarOpen && (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">
                  {localStorage.getItem("user_email")}
                </p>
                <p className="text-xs text-gray-400">
                  GPT-4 Turbo
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-500 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>

      {/* ================= Chat Area ================= */}
      <div className="flex-1 overflow-hidden bg-blue-100">
        <Home />
      </div>

   </div>
  );
};
export default Dashboard;
