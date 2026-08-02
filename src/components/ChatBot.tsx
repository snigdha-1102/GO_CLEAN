import { useState, useRef, useEffect } from "react";
import { X, Trash2, MessageCircle } from "lucide-react";
import { sendMessage } from "../services/chatService";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
  const saved = localStorage.getItem("ecobot-chat");

  if (saved) {
    return JSON.parse(saved);
  }

  return [
    {
      sender: "bot",
      text: "👋 Hello! I'm EcoBot.\nHow can I help you today?",
    },
  ];
});

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
  localStorage.setItem(
    "ecobot-chat",
    JSON.stringify(messages)
  );
}, [messages]);

  const handleSend = async (customMessage?: string) => {
  const userMessage = customMessage || message;

  if (!userMessage.trim()) return;

  setMessages((prev) => [
    ...prev,
    {
      sender: "user",
      text: userMessage,
    },
  ]);

  if (!customMessage) {
    setMessage("");
  }

  setLoading(true);

  try {
    const aiReply = await sendMessage(userMessage);

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: aiReply,
      },
    ]);
  } catch (err) {
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "❌ Something went wrong.",
      },
    ]);
  }

  setLoading(false);
};
  
const clearChat = () => {
  const initialChat: ChatMessage[] = [
  {
    sender: "bot",
    text: "👋 Hello! I'm EcoBot.\nHow can I help you today?",
  },
];
  setMessages(initialChat);

  localStorage.setItem(
    "ecobot-chat",
    JSON.stringify(initialChat)
  );
};
  return (
    <>
      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-28 right-6 w-16 h-16 rounded-full bg-green-600 text-white shadow-xl hover:scale-110 transition-all duration-300 z-[9999] flex items-center justify-center"
        >
          <MessageCircle size={30} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-96 h-[520px] bg-white rounded-2xl shadow-2xl border flex flex-col z-[9999]">

          {/* Header */}
          <div className="bg-green-600 text-white p-4 rounded-t-2xl">

            <div className="flex justify-between items-center">

              <div>
                <h2 className="font-bold text-lg">🌿 EcoBot</h2>
                <p className="text-xs opacity-90">
                  Ask anything about waste management
                </p>
              </div>

              <div className="flex gap-2">

                <button
                  onClick={clearChat}
                  className="hover:bg-green-700 p-2 rounded-full transition"
                  title="Clear Chat"
                >
                  <Trash2 size={18} />
                </button>

                <button
                  onClick={() => setOpen(false)}
                  className="hover:bg-green-700 p-2 rounded-full transition"
                  title="Close"
                >
                  <X size={20} />
                </button>

              </div>

            </div>

          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Quick Questions */}
{messages.length === 1 && (
  <div className="mb-4">

    <p className="text-sm text-gray-500 mb-2 font-semibold">
      💡 Quick Questions
    </p>

    <div className="flex flex-wrap gap-2">

      <button
        onClick={() => handleSend("How do I report illegal dumping?")}
        className="bg-green-100 hover:bg-green-200 text-green-700 text-xs px-3 py-2 rounded-full transition"
      >
        🗑️ Report Waste
      </button>

      <button
       onClick={() => handleSend("How do I scan a QR code?")}
        className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs px-3 py-2 rounded-full transition"
      >
        📷 Scan QR
      </button>

      <button
        onClick={() => handleSend("How do I earn reward points?")}
        className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 text-xs px-3 py-2 rounded-full transition"
      >
        🎁 Rewards
      </button>

      <button
        onClick={() => handleSend("How do I recycle plastic bottles?")}
        className="bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs px-3 py-2 rounded-full transition"
      >
        ♻️ Recycling
      </button>

    </div>

  </div>
)}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-xl whitespace-pre-wrap shadow ${
                    msg.sender === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 px-4 py-2 rounded-xl animate-pulse">
                  🤖 EcoBot is typing...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />

          </div>

          {/* Input */}
          <div className="border-t p-4 flex gap-2">

            <input
              type="text"
              placeholder="Ask EcoBot..."
              className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />

            <button
              onClick={() => handleSend()}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-5 rounded-lg disabled:opacity-50"
            >
              {loading ? "..." : "Send"}
            </button>

          </div>

        </div>
      )}
    </>
  );
};

export default ChatBot;