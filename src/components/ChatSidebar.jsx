// src/components/ChatSidebar.jsx
import React from "react";

const ChatSidebar = ({ doctors, selectedDoctor, setSelectedDoctor }) => {
  return (
    <div className="w-80 bg-gray-50/50 border-r border-gray-100 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">Conversations</h2>
          <span className="text-xs text-gray-400">
            {doctors.length} doctors
          </span>
        </div>
        {/* Search - optional enhancement */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search doctors..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {doctors.slice(0, 10).map((doc) => {
            const isSelected = selectedDoctor?.docData?._id === doc.docData._id;
            return (
              <li
                key={doc.docData._id}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-150 group
                  ${
                    isSelected
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-white hover:shadow-sm border border-transparent"
                  }`}
                onClick={() => setSelectedDoctor(doc)}
              >
                {/* Avatar with online indicator */}
                <div className="relative flex-shrink-0">
                  <img
                    src={doc.docData.image}
                    alt={doc.docData.name}
                    className={`w-11 h-11 rounded-full object-cover ring-2 transition-all
                      ${isSelected ? "ring-primary/30" : "ring-gray-100 group-hover:ring-gray-200"}`}
                  />
                  {/* Online status dot */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span
                      className={`font-medium text-sm truncate ${isSelected ? "text-primary" : "text-gray-900"}`}
                    >
                      {doc.docData.name}
                    </span>
                    {/* Timestamp placeholder */}
                    <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2">
                      2h ago
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 truncate">
                      {doc.docData.speciality || doc.docData.specialty}
                    </span>
                  </div>
                  {/* Last message preview */}
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    Tap to start conversation
                  </p>
                </div>

                {/* Unread indicator (optional) */}
                {/* <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span> */}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-gray-100 bg-white/50">
        <p className="text-[10px] text-gray-400 text-center">
          Messages are private and secure
        </p>
      </div>
    </div>
  );
};

export default ChatSidebar;
