// frontend/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axios.js";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products", { params: { state, city } });
      setProducts(res.data);
    } catch (err) {
      console.error("Error cargando productos", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Productos</h2>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <select value={state} onChange={(e) => setState(e.target.value)} className="border p-2 rounded">
          <option value="">Todos los estados</option>
          <option value="Veracruz">Veracruz</option>
          <option value="CDMX">Ciudad de México</option>
          <option value="Puebla">Puebla</option>
        </select>

        <select value={city} onChange={(e) => setCity(e.target.value)} className="border p-2 rounded">
          <option value="">Todas las ciudades</option>
          {state === "Veracruz" && (
            <>
              <option value="Xalapa">Xalapa</option>
              <option value="Veracruz">Veracruz</option>
              <option value="Coatzacoalcos">Coatzacoalcos</option>
            </>
          )}
          {state === "CDMX" && (
            <>
              <option value="Benito Juárez">Benito Juárez</option>
              <option value="Coyoacán">Coyoacán</option>
              <option value="Iztapalapa">Iztapalapa</option>
            </>
          )}
        </select>

        <button
          onClick={fetchProducts}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Filtrar
        </button>
      </div>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <Link
            to={`/products/${p._id}`}
            key={p._id}
            className="border rounded-lg shadow p-4 hover:shadow-lg transition"
          >
            <img src={p.image} alt={p.name} className="w-full h-48 object-cover mb-2 rounded" />
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-gray-600">{p.description}</p>
            <p className="text-green-600 font-bold mt-2">${p.price}</p>
            <p className="text-sm text-gray-500">
              {p.location?.city}, {p.location?.state}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
