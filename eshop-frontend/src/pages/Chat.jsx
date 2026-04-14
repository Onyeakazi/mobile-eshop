import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

export default function Chat() {
  const socketRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [activeRoom, setActiveRoom] = useState("user_123");

  // always keep latest room in ref (fix stale state bug)
  const activeRoomRef = useRef(activeRoom);

  useEffect(() => {
    activeRoomRef.current = activeRoom;
  }, [activeRoom]);

  // CONNECT SOCKET
  useEffect(() => {
    socketRef.current = io("http://172.30.7.250:5000"); 

    socketRef.current.on("connect", () => {
      console.log("ADMIN CONNECTED:", socketRef.current.id);

      socketRef.current.emit("join_room", activeRoomRef.current);
      console.log("JOINED ROOM:", activeRoomRef.current);
    });

    socketRef.current.on("connect_error", (err) => {
      console.log("CONNECTION ERROR:", err.message);
    });

    socketRef.current.on("receive_message", (data) => {
      console.log("ADMIN RECEIVED:", data);

      if (data.userId !== activeRoomRef.current) return;

      setMessages((prev) => {
        const exists = prev.some((msg) => msg.id === data.id);
        if (exists) return prev;

        return [...prev, data];
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // 🔁 HANDLE ROOM SWITCH
  useEffect(() => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("join_room", activeRoom);
      console.log("SWITCHED ROOM:", activeRoom);
    }

    setMessages([]);
  }, [activeRoom]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const messageData = {
      id: Date.now(), 
      userId: activeRoom,
      message: input.trim(),
      sender: "admin",
    };

    console.log("ADMIN SENDING:", messageData);

    socketRef.current.emit("send_message", messageData);

    setInput("");
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-1/4 bg-white border-r p-4">
        <h2 className="text-lg font-bold mb-4">Chats</h2>

        {["user_123", "user_456"].map((user) => (
          <button
            key={user}
            onClick={() => setActiveRoom(user)}
            className={`block w-full text-left p-2 rounded ${
              activeRoom === user
                ? "bg-black text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {user}
          </button>
        ))}
      </div>

      {/* CHAT AREA */}
      <div className="flex flex-col flex-1">

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.length === 0 && (
            <p className="text-gray-400 text-center">No messages yet</p>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-xs p-2 rounded ${
                msg.sender === "admin"
                  ? "bg-black text-white ml-auto"
                  : "bg-gray-300"
              }`}
            >
              <p>{msg.text}</p>

              {msg.time && (
                <span className="text-xs opacity-70 block mt-1">
                  {msg.time}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="p-4 border-t flex gap-2">
          <input
            className="flex-1 border rounded p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />

          <button
            onClick={sendMessage}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}