import { useState } from "react";
import axios from "axios";
import { X, Bot } from "lucide-react";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi 👋 I’m HireConnect Assistant. How can I help you?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");

    try {
      const res = await axios.post("/api/chat", { message: input });

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: res.data.reply }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Something went wrong. Please try again." }
      ]);
    }
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full 
        bg-gradient-to-r from-indigo-500 via-purple-600 to-fuchsia-600
        text-white shadow-2xl hover:scale-110 transition-transform
        animate-pulse cursor-pointer"
        aria-label="Open chatbot"
      >
        <Bot size={26} />
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-20 right-6 z-50 w-80 h-96 
          bg-gray-900 rounded-2xl shadow-2xl flex flex-col 
          border border-gray-700"
        >
          {/* Header */}
          <div className="p-3 flex justify-between items-center 
          bg-gray-800 rounded-t-2xl">
            <span className="font-semibold text-white flex items-center gap-2">
              <Bot size={18} />
              HireConnect AI
            </span>
            <X
              className="cursor-pointer text-gray-300 hover:text-white"
              onClick={() => setOpen(false)}
            />
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 scrollbar-hide">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg text-sm max-w-[85%]
                ${
                  msg.role === "user"
                    ? "ml-auto bg-indigo-600 text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 flex gap-2 border-t border-gray-700">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 p-2 text-sm rounded-lg 
              bg-gray-800 text-white outline-none
              focus:ring-2 focus:ring-indigo-500"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="px-4 rounded-lg bg-indigo-600 
              hover:bg-indigo-700 text-white text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;