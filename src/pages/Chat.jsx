// src/components/Chat.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { getSocket } from "../sockets/socket";
import { doctors } from "../assets/assets";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import { AppContext } from "../context/AppContext";
import {
  getDoctorsForChat,
  getRoomId,
  getRoomMessages,
} from "../utils/Api.utils";
import { toast } from "react-toastify";

export default function Chat() {
  // State management
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [roomId, setRoomId] = useState("");

  const socketRef = useRef(null);
  const { token, userData } = useContext(AppContext);

  const handleGetDoctorsToChat = async () => {
    try {
      const { data } = await getDoctorsForChat();
      if (data) {
        setDoctors(data);
        setSelectedDoctor(data[0]);
      }
    } catch (error) {
      toast.error("failed to fetch doctors");
    }
  };
  // Socket connection only if token is present
  useEffect(() => {
    const init = async () => {
      if (token) {
        socketRef.current = getSocket(token);
      }
      await handleGetDoctorsToChat();
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.off("private_message");
        socketRef.current.disconnect();
      }
    };
  }, [token]);

  // Send message handler
  console.log(selectedDoctor, "-----------------");

  const handleSend = () => {
    if (input.trim() && socketRef.current && selectedDoctor) {
      const message = {
        senderId: userData?._id,
        message: input,
        receiverId: selectedDoctor.docData._id,
        roomId: roomId,
      };

      // setMessages([...messages, message]);
      socketRef.current.emit("private_message", message);
      setInput("");
    }
  };

  const joinRoom = () => {
    console.log(roomId, "roomId user");
    if (socketRef.current) {
      socketRef.current.emit("join_room", roomId);
    }
  };

  const handleFetchRoomId = async () => {
    try {
      const { data } = await getRoomId(selectedDoctor.docData._id);

      if (data?._id) {
        setRoomId(data._id);
      } else {
        // fallback if backend didn't return roomId
        setRoomId(selectedDoctor.docData._id + userData._id);
      }
    } catch (error) {
      toast.error("failed to fetch room id");
    }
  };

  const handleFetchRoomMessages = async () => {
    try {
      const { data } = await getRoomMessages(selectedDoctor.docData._id);
      if (data) {
        setMessages(data);
      }
    } catch (error) {
      toast.error("failed to fetch room messages");
    }
  };

  useEffect(() => {
    const fetchAndJoinRoom = async () => {
      if (selectedDoctor) {
        await handleFetchRoomId();
        await handleFetchRoomMessages();
      }
    };
    fetchAndJoinRoom();
  }, [selectedDoctor]);

  useEffect(() => {
    if (roomId) {
      joinRoom(roomId);
    }
  }, [roomId]);

  useEffect(() => {
    if (!socketRef.current || !roomId) return;
    const handleMessage = (msg) => {
      if (msg.roomId === roomId) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    socketRef.current.on("private_message", handleMessage);
    return () => {
      socketRef.current.off("private_message", handleMessage);
    };
  }, [roomId]);

  return (
    <div className="h-[calc(100vh-72px)] bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Chat Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-4 overflow-hidden">
        <div className="flex h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {doctors && selectedDoctor && (
            <>
              <ChatSidebar
                doctors={doctors}
                selectedDoctor={selectedDoctor}
                setSelectedDoctor={setSelectedDoctor}
              />
              <ChatWindow
                selectedDoctor={selectedDoctor}
                messages={messages}
                input={input}
                setInput={setInput}
                handleSend={handleSend}
                userId={userData?._id}
              />
            </>
          )}

          {/* Empty State - No doctors */}
          {(!doctors || doctors.length === 0) && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
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
              <h3 className="text-gray-900 font-medium mb-1">
                No conversations yet
              </h3>
              <p className="text-sm text-gray-500 max-w-xs">
                Book an appointment to start messaging with your healthcare
                provider.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
