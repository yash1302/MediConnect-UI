// src/components/ChatWindow.jsx
import React, { useRef, useEffect } from "react";

const ChatWindow = ({
  selectedDoctor,
  messages,
  input,
  setInput,
  handleSend,
  userId,
}) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Format timestamp - show actual time
  const formatTime = (date) => {
    if (!date)
      return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    const d = new Date(date);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    const time = d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (isToday) {
      return time;
    }
    // If not today, show date and time
    return `${d.toLocaleDateString([], { month: "short", day: "numeric" })} ${time}`;
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Doctor Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={selectedDoctor.docData.image}
              alt={selectedDoctor.docData.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <span className="font-medium text-gray-900 text-sm">
              {selectedDoctor.docData.name}
            </span>
            <div className="text-xs text-gray-500">
              {selectedDoctor.docData.speciality ||
                selectedDoctor.docData.specialty}
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 px-5 py-4 overflow-y-auto bg-gray-50/50">
        {/* Empty State */}
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <svg
                className="w-7 h-7 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-500">
              Start a conversation with{" "}
              {selectedDoctor.docData.name.split(" ")[0]}
            </p>
          </div>
        )}

        {/* Messages List */}
        {messages.length > 0 && (
          <div className="space-y-3">
            {messages.map((msg, idx) => {
              const isSent = msg?.senderId === userId;

              return (
                <div
                  key={idx}
                  className={`flex ${isSent ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed
                      ${
                        isSent
                          ? "bg-primary text-white rounded-2xl rounded-br-sm"
                          : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-200"
                      }`}
                  >
                    <p>{msg?.message}</p>
                    <p
                      className={`text-[10px] mt-1 text-right ${
                        isSent ? "text-white/70" : "text-gray-400"
                      }`}
                    >
                      {formatTime(msg?.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="px-4 py-3 border-t border-gray-100 bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-primary focus:bg-white transition-all placeholder:text-gray-400"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              input.trim()
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-gray-200 text-gray-400"
            }`}
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
