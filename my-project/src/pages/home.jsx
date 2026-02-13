import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const bottomRef = useRef(null);

  const isLoggedIn = !!localStorage.getItem("access_token");

  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("chat_history");
      if (savedHistory) setChatHistory(JSON.parse(savedHistory));

      const savedChat = localStorage.getItem("active_chat");
      if (savedChat) setChat(JSON.parse(savedChat));

      const savedChatId = localStorage.getItem("active_chat_id");
      if (savedChatId) setActiveChatId(JSON.parse(savedChatId));
    } catch (e) {
      console.error("Error loading saved data:", e);
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("chat_history", JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Save active chat to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("active_chat", JSON.stringify(chat));
  }, [chat]);

  // Save active chat ID to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("active_chat_id", JSON.stringify(activeChatId));
  }, [activeChatId]);

  // Scroll to bottom when chat updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNewChat = () => {
    setChat([]);
    setActiveChatId(null);
    setIsSidebarOpen(false);
  };

  const handleSelectChat = (chatItem) => {
    setChat(chatItem.messages || []);
    setActiveChatId(chatItem.id);
    setIsSidebarOpen(false);
  };

  const askAI = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    const currentChatId = activeChatId || Date.now();

    if (!activeChatId) {
      setActiveChatId(currentChatId);
    }

    // Optimistic UI update
    const newChat = [...chat, { role: "user", content: userMessage }];
    setChat(newChat);
    setMessage("");
    setLoading(true);

    const payload = {
      message: userMessage,
      user_id: 1,
      chat_id: currentChatId,
    };

    console.log("📤 Sending to backend:", payload);

    try {
      const res = await fetch("http://127.0.0.1:8000/ai/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // Try to get error details from response
        let errorDetails = `Server returned status ${res.status}: ${res.statusText}`;
        try {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = await res.json();
            errorDetails = errorData.detail || errorData.message || errorData.error || JSON.stringify(errorData);
          }
        } catch (e) {
          // Ignore JSON parsing errors, use default errorDetails
        }
        throw new Error(errorDetails);
      }

      // Check content type before parsing JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Backend returned non-JSON response");
      }

      const data = await res.json();
      console.log("📥 Backend response:", data);

      if (!data.response) {
        throw new Error("AI response field is missing from backend response");
      }

      const aiReply =
        data.response || "No response received from AI.";

      const updatedChat = [
        ...newChat,
        { role: "assistant", content: aiReply },
      ];

      setChat(updatedChat);

      // Update local chat history
      setChatHistory((prev) => {
        const existingIndex = prev.findIndex(
          (c) => c.id === currentChatId
        );

        const title =
          updatedChat[0]?.content?.slice(0, 30) || "New Chat";

        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            messages: updatedChat,
          };
          return updated;
        } else {
          return [
            {
              id: currentChatId,
              title,
              messages: updatedChat,
            },
            ...prev,
          ];
        }
      });
    } catch (error) {
      console.error("❌ Error:", error);

      // Provide more helpful error messages based on error type
      let errorMessage = "⚠️ Error connecting to AI server.";

      if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
        errorMessage = "⚠️ Cannot connect to AI server. Please ensure the backend server is running at http://127.0.0.1:8000";
      } else if (error.message.includes("CORS")) {
        errorMessage = "⚠️ CORS error. The backend server needs to allow requests from this origin.";
      } else if (error.message) {
        errorMessage = `⚠️ Server error: ${error.message}`;
      }

      setChat([
        ...newChat,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {isLoggedIn && (
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          onNewChat={handleNewChat}
          chatHistory={chatHistory}
          onSelectChat={handleSelectChat}
          activeChatId={activeChatId}
        />
      )}

      {isSidebarOpen && isLoggedIn && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {isLoggedIn && (
          <div className="bg-white shadow-sm z-20 flex items-center h-14 px-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="ml-3 text-lg font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              MyApp
            </h1>
          </div>
        )}

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-100 to-blue-200 p-6 pt-8">
          <h1 className="text-4xl text-center text-blue-700 font-semibold mb-8">
            🤖 RoboAI Assistant
          </h1>

          <div className="max-w-4xl mx-auto space-y-6 pb-28">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-xl px-4 py-3 rounded-2xl text-sm shadow-md ${msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800"
                    }`}
                >
                  <ReactMarkdown>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-gray-500 animate-pulse">
                🤖 AI is thinking...
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white border-t p-4 flex justify-center">
          <div className="w-full max-w-3xl flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 px-4 py-3 rounded-full border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onKeyDown={(e) =>
                e.key === "Enter" && askAI()
              }
            />

            <button
              onClick={askAI}
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700"
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
