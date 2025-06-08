import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { fetchChatList } from "../../services/authService";

const socket = io("http://localhost:8000");

const Dashboard = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username"); // Replace with real userId from auth
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Fetch chat list on mount
  useEffect(() => {
    if (!userId || userId === "undefined" || userId.length !== 24) {
      alert("You are not logged in or userId is invalid!");
      // Optionally redirect to login
      return;
    }
    fetchChatList(userId).then(setChatList);
  }, [userId]);

  // Join chat room and listen for messages when selectedChat changes
  useEffect(() => {
    if (!selectedChat) return;
    socket.emit("join-chat", selectedChat._id);

    // Optionally: fetch messages for selectedChat from backend here

    socket.on("receive-message", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          sender: data.senderName || "Other",
          content: data.content,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          self: data.senderId === userId,
        },
      ]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [selectedChat, userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedChat) return;
    socket.emit("send-message", {
      chatId: selectedChat._id,
      senderId: userId,
      senderName: username, // Replace with real user name
      content: input,
    });
   
    setInput("");
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background: "#343a40",
        color: "#f8f9fa",
        padding: 0,
      }}
    >
      <div className="row" style={{ height: "100vh" }}>
        {/* Sidebar */}
        <div
          className="col-12 col-md-4 col-lg-3 p-0"
          style={{
            background: "#23272f",
            borderRight: "1px solid #444",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <div
            className="p-3 border-bottom d-flex justify-content-between align-items-center"
            style={{ borderColor: "#444" }}
          >
            <h4 style={{ color: "#0d6efd", margin: 0 }}>ChatApp</h4>
            {/* // Add this above your chat list in the sidebar */}
            <button
              className="btn btn-primary btn-sm mb-2"
              onClick={async () => {
                console.log("userId before creating chat:", userId);
                const username = prompt("Enter the username to chat with:");
                if (!username) return;
                if (username === "YourUsername") {
                  alert("You cannot chat with yourself.");
                  return;
                }
                // 1. Find user by username
                const res = await fetch(
                  `http://localhost:8000/api/auth/find?username=${encodeURIComponent(
                    username
                  )}`
                );
                const data = await res.json();
                if (!data.success) {
                  alert(data.message || "User not found");
                  return;
                }
                const otherUserId = data.user._id;
                if (otherUserId === userId) {
                  alert("You cannot chat with yourself.");
                  return;
                }
                // 2. Create chat
                fetch("http://localhost:8000/api/chat/create", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    users: [userId, otherUserId],
                    isGroup: false,
                  }),
                })
                  .then((res) => res.json())
                  .then((chatData) => {
                    if (chatData.success) {
                      setChatList((prev) => [...prev, chatData.chat]);
                      setSelectedChat(chatData.chat);
                      setMessages([]);
                    } else {
                      alert(chatData.message || "Failed to create chat");
                    }
                  });
              }}
            >
              + New Chat
            </button>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
              style={{ border: "1px solid #0d6efd", color: "#0d6efd" }}
            >
              Logout
            </button>
          </div>
          <div>
            <ul className="list-group list-group-flush">
              {chatList.map((chat) => (
                <li
                  key={chat._id}
                  className="list-group-item"
                  style={{
                    background:
                      selectedChat?._id === chat._id ? "#181a20" : "#23272f",
                    color: "#f8f9fa",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedChat(chat);
                    setMessages([]); // Optionally clear messages or fetch from backend
                  }}
                >
                  <strong>
                    {chat.isGroup
                      ? chat.name
                      : chat.users.filter((u) => u._id !== userId)[0]?.name ||
                        "Chat"}
                  </strong>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chat Window */}
        <div
          className="col-12 col-md-8 col-lg-9 d-flex flex-column p-0"
          style={{ height: "100%" }}
        >
          {/* Chat header */}
          <div
            className="p-3 border-bottom"
            style={{
              background: "#23272f",
              borderColor: "#444",
              minHeight: "60px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <strong>
              {selectedChat
                ? selectedChat.isGroup
                  ? selectedChat.name
                  : selectedChat.users.filter((u) => u._id !== userId)[0]
                      ?.name || "Chat"
                : "Select a chat"}
            </strong>
            
          </div>
          {/* Chat messages */}
          <div
            className="flex-grow-1 p-3"
            style={{
              overflowY: "auto",
              background: "#343a40",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.self ? "flex-end" : "flex-start",
                  maxWidth: "70%",
                }}
              >
                <div
                  style={{
                    background: msg.self ? "#0d6efd" : "#23272f",
                    color: msg.self ? "#fff" : "#f8f9fa",
                    borderRadius: "15px",
                    padding: "10px 16px",
                    marginBottom: "4px",
                  }}
                >
                  {msg.content}
                </div>
                <small style={{ color: "#b0b3b8" }}>
                  {msg.sender} • {msg.time}
                </small>
              </div>
            ))}
          </div>
          {/* Message input */}
          <form
            className="p-3 border-top"
            style={{ background: "#23272f", borderColor: "#444" }}
            onSubmit={handleSend}
          >
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type your message..."
                style={{
                  background: "#181a20",
                  color: "#f8f9fa",
                  border: "1px solid #444",
                }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="btn btn-primary"
                type="submit"
                style={{ border: "none" }}
                disabled={!selectedChat}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
