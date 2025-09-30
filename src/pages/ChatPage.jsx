// src/pages/ChatPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../axios.js";
import { useAuth } from "../context/AuthContext.jsx";

function ChatPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/conversations/${id}/messages`);
        setMessages(res.data);
      } catch (err) {
        console.error("Error cargando mensajes", err);
      }
    };
    fetchMessages();
  }, [id]);

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/conversations/${id}/messages`, { text });
      setMessages((prev) => [...prev, res.data]);
      setText("");
    } catch (err) {
      console.error("Error enviando mensaje", err);
    }
  };

  if (!user) {
    return <div className="p-6">Debes iniciar sesión para ver este chat.</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      <div className="border rounded-lg p-4 mb-4 h-80 overflow-y-auto bg-gray-50">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`mb-2 ${
              m.fromUser === user._id ? "text-right" : "text-left"
            }`}
          >
            <span className="inline-block bg-white px-3 py-1 rounded-lg shadow">
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-lg"
          placeholder="Escribe un mensaje..."
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default ChatPage;
