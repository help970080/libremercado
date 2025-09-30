import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newQ, setNewQ] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const resP = await api.get(`/api/products/${id}`);
        setProduct(resP.data);
        const resQ = await api.get(`/api/questions/product/${id}`);
        setQuestions(resQ.data);
      } catch (e) {
        console.error("Error cargando detalle:", e);
        setMsg("No se pudo cargar el producto.");
      }
    })();
  }, [id]);

  const ask = async () => {
    if (!newQ.trim()) return;
    try {
      const res = await api.post(`/api/questions/product/${id}`, { text: newQ });
      setQuestions([res.data, ...questions]);
      setNewQ("");
    } catch {
      setMsg("❌ Debes iniciar sesión para preguntar.");
    }
  };

  const addToCart = async () => {
    try {
      await api.post("/api/cart", { productId: id, quantity: 1 });
      setMsg("✅ Producto agregado al carrito");
    } catch {
      setMsg("❌ Error al agregar al carrito");
    }
  };

  if (!product) return <p className="p-6">Cargando...</p>;

  return (
    <div className="p-6">
      {msg && <p className="mb-3 text-blue-700">{msg}</p>}
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-h-80 object-cover rounded"
        />
      )}
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-lg">${product.price}</p>
      <p className="mt-2">{product.description}</p>

      <button
        onClick={addToCart}
        className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
      >
        Agregar al carrito
      </button>

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
