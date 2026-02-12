import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";


const Home = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);


  const askAI = async () => {
    if (!message.trim()) return;

    const newChat = [...chat, { role: "user", content: message }];
    setChat(newChat);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/ai/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message,
          system_prompt: "You are a helpful assistant",
          history: []
        })
      });



      const data = await res.json();

      setChat([
        ...newChat,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  // Converts raw URLs into clickable links
  const formatMessage = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-700"
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-6 pt-24"
      style={{ fontFamily: "Orbitron, sans-serif" }}
    >

      <h1 className="text-4xl text-center text-blue-700 font-semibold mb-8">
        🤖 RoboAI Assistant
      </h1>

      {/* Chat Area */}
      <div className="max-w-4xl mx-auto space-y-6 pb-40">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`max-w-xl px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${msg.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-transparent text-gray-800"
                }`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
              <div ref={bottomRef} />
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-500 animate-pulse">
            🤖 AI is thinking...
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-center">
        <div className="w-full max-w-3xl flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 px-4 py-3 rounded-full border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyDown={(e) => e.key === "Enter" && askAI()}
          />

          <button
            onClick={askAI}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
