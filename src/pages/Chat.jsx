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
      console.log(roomId, "roomId in message");
      console.log(msg.roomId, "msg.roomId");
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
    <div className=" flex h-[80vh] bg-white rounded-lg shadow-lg overflow-hidden">
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
    </div>
  );
}
