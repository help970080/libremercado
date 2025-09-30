import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axios.js";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error cargando productos", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Productos</h2>
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
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
