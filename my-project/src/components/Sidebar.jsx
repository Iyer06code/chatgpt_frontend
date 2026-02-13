import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar, onNewChat, chatHistory = [], onSelectChat, activeChatId }) => {
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem("user_email");
        if (email) {
            setUserEmail(email);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_email");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("token_type");
        navigate("/");
        window.location.reload();
    };

    return (
        <div
            className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out z-40`}
        >
            <div className="p-4 flex flex-col h-full">
                {/* Header / Close */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold">MyApp AI</h1>
                    <button onClick={toggleSidebar} className="text-gray-400 hover:text-white transition-colors">
                        ✕
                    </button>
                </div>

                {/* New Chat Button */}
                <button
                    onClick={onNewChat}
                    className="w-full flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg transition-colors mb-4"
                >
                    <span className="text-xl">+</span>
                    New Chat
                </button>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto">
                    <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                        Chat History
                    </h2>
                    <div className="space-y-1">
                        {chatHistory.length === 0 ? (
                            <p className="text-gray-500 text-sm italic px-2">No chats yet</p>
                        ) : (
                            chatHistory.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => onSelectChat(item)}
                                    className={`p-2 rounded cursor-pointer text-sm truncate transition-colors ${activeChatId === item.id
                                            ? "bg-indigo-700 text-white"
                                            : "text-gray-300 hover:bg-gray-800"
                                        }`}
                                >
                                    💬 {item.title}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* User Profile / Bottom Section */}
                <div className="border-t border-gray-700 pt-4 mt-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold">
                            {userEmail ? userEmail.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium truncate">{userEmail || "User"}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors text-sm"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
