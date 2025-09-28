import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL.replace("/api", ""); // apunta al backend
let socket;

export default function ChatPage() {
  const { id } = useParams(); // id del usuario con el que chatear
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Inicia sesión");

    // Decodificar JWT para obtener userId
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.id;

    socket = io(API_URL, { auth: { userId } });

    socket.emit("conversation:join", { peerId: id });

    socket.on("conversation:ready", ({ id: convoId }) => {
      socket.on("message:new", (m) => {
        setMessages((prev) => [...prev, m]);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  const send = () => {
    if (!msg) return;
    socket.emit("message:send", { conversationId: id, body: msg });
    setMsg("");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Chat</h1>
      <div className="border p-4 h-64 overflow-y-scroll bg-white mb-4">
        {messages.map((m, i) => (
          <div key={i} className="mb-2">
            <span className="font-semibold">{m.from}</span>: {m.body}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="border p-2 flex-1"
        />
        <button
          onClick={send}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
