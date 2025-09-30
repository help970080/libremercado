import { useState } from "react";
import api from "../services/api";

export default function Sell() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ Debes iniciar sesión para publicar");
        return;
      }

      const { data } = await api.post("/api/products", form, {
        headers: { Authorization: "Bearer " + token },
      });

      if (data?._id) {
        setMessage("✅ Producto publicado");
        setForm({ name: "", price: "", description: "", image: "" });
      } else {
        setMessage("❌ Error al publicar producto");
      }
    } catch {
      setMessage("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Publicar un producto
        </h2>
        {message && <p className="mb-4 text-center">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border rounded p-2"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border rounded p-2"
            name="price"
            type="number"
            placeholder="Precio"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border rounded p-2"
            name="image"
            placeholder="URL de imagen"
            value={form.image}
            onChange={handleChange}
          />
          <textarea
            className="w-full border rounded p-2"
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Crear producto
          </button>
        </form>
      </div>
    </div>
  );
}
