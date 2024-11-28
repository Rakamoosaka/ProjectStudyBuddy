import React, { useState } from "react";
import Footer from "../components/Footer";

// Utility function to generate random data
const generateRandomChats = () => {
  const names = [
    "Amirkul",
    "Aidar",
    "Dana",
    "Zarina",
    "Bekzat",
    "Alina",
    "Kuat",
    "Madina",
    "Dias",
    "Aigerim",
  ];
  const messages = [
    "Hey, how are you?",
    "Yep bro, today I gonna study",
    "Let’s meet at the library",
    "I’m stuck with this task, help?",
    "What time is our meeting?",
    "Can we reschedule?",
    "Great job on the project!",
    "When is the deadline?",
    "Got any updates?",
    "Let’s grab some coffee later.",
  ];
  const times = [
    "2 hours ago",
    "5 minutes ago",
    "1 hour ago",
    "Yesterday",
    "30 minutes ago",
    "Just now",
    "3 hours ago",
    "1 week ago",
    "A day ago",
    "10 minutes ago",
  ];

  return Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: names[index],
    lastMessage: messages[Math.floor(Math.random() * messages.length)],
    lastSeen: times[Math.floor(Math.random() * times.length)],
  }));
};

const ChatPage = () => {
  const [chats] = useState(generateRandomChats()); // Generate random chat data
  const [selectedChat, setSelectedChat] = useState(chats[0]); // Default to the first chat
  const [messages, setMessages] = useState([
    {
      sender: selectedChat.name,
      text: "Yep bro, today I gonna study",
      sentByMe: false,
    },
    { sender: "Me", text: "Same here, let’s focus today!", sentByMe: true },
    {
      sender: selectedChat.name,
      text: "Alright, let’s do this!",
      sentByMe: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { sender: "Me", text: newMessage, sentByMe: true },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex h-screen bg-[#F6F7FF] font-josefinSans">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-[#274B6D] text-white flex flex-col">
          {/* Search Section */}
          <div className="p-4 border-b border-[#162850]">
            <h2 className="text-lg font-semibold">Chats</h2>
            <input
              type="text"
              placeholder="Search"
              className="w-full mt-2 px-3 py-2 text-sm bg-[#162850] rounded-md placeholder-gray-400 focus:outline-none"
            />
            <div className="flex mt-3 justify-between">
              <button className="bg-[#89CFF3] px-4 py-1 rounded-full text-xs">
                All
              </button>
              <button className="bg-[#162850] px-4 py-1 rounded-full text-xs">
                Unread
              </button>
              <button className="bg-[#162850] px-4 py-1 rounded-full text-xs">
                Groups
              </button>
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)} // Update selected chat
                className={`p-4 flex items-center cursor-pointer hover:bg-[#162850] ${
                  selectedChat.id === chat.id ? "bg-[#162850]" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#89CFF3]"></div>
                <div className="ml-3">
                  <h3 className="font-medium">{chat.name}</h3>
                  <p className="text-xs text-gray-300">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-[#274B6D]">
          {/* Chat Header */}
          <div className="p-4 border-b border-[#162850] flex items-center justify-between">
            <div>
              <h2 className="text-lg text-white">{selectedChat.name}</h2>
              <p className="text-sm text-gray-300">
                Last online: {selectedChat.lastSeen}
              </p>
            </div>
            <div className="text-white cursor-pointer">☰</div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-[#162850]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sentByMe ? "justify-end" : "justify-start"
                } mb-3`}
              >
                <div
                  className={`${
                    msg.sentByMe ? "bg-[#89CFF3]" : "bg-[#162850]"
                  } text-white px-4 py-2 rounded-lg max-w-xs`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-[#162850] flex items-center">
            <input
              type="text"
              placeholder="Message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-4 py-2 text-sm rounded-md bg-[#162850] text-white focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="ml-3 bg-[#89CFF3] text-white px-4 py-2 rounded-lg"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatPage;
