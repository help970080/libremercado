import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newQ, setNewQ] = useState("");

  useEffect(() => {
    api.get(`/listings/${id}`).then((res) => setListing(res.data));
    api.get(`/questions/listing/${id}`).then((res) => setQuestions(res.data));
  }, [id]);

  const ask = async () => {
    if (!newQ.trim()) return;
    const res = await api.post(`/questions/listing/${id}`, { text: newQ });
    setQuestions([res.data, ...questions]);
    setNewQ("");
  };

  if (!listing) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      {listing.images?.[0] && (
        <img
          src={listing.images[0].url}
          alt={listing.title}
          className="w-full max-h-80 object-cover rounded"
        />
      )}
      <h1 className="text-2xl font-bold mt-4">{listing.title}</h1>
      <p className="text-lg">${listing.price}</p>
      <p className="mt-2">{listing.description}</p>

      <div className="mt-6">
        <h2 className="font-semibold">Preguntas y respuestas</h2>
        <input
          value={newQ}
          onChange={(e) => setNewQ(e.target.value)}
          placeholder="Haz una pregunta..."
          className="border p-2 w-full mt-2"
        />
        <button
          onClick={ask}
          className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
        >
          Preguntar
        </button>
        <ul className="mt-4">
          {questions.map((q) => (
            <li key={q._id} className="border-b py-2">
              <p>
                <strong>{q.fromUser?.name}:</strong> {q.text}
              </p>
              {q.answer && (
                <p className="text-green-700">Respuesta: {q.answer}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
