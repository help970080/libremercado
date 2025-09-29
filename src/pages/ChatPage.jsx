import { useState, useEffect } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), text: input };
    setMessages([...messages, newMsg]);
    setInput("");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Chat Simulado</h2>
      <div className="border p-4 h-64 overflow-y-auto bg-gray-100">
        {messages.map((m) => (
          <div key={m.id} className="mb-2">
            <span className="bg-blue-200 px-2 py-1 rounded">{m.text}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Escribe un mensaje..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded">
          Enviar
        </button>
      </div>
    </div>
  );
}
