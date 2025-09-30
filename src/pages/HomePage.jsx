import { useEffect, useState } from "react";
import api from "../services/api";

const mockProducts = [
  { id: "m1", name: "Camisa de algodón", price: 250, image: "https://via.placeholder.com/400x280?text=Camisa", description: "Comodidad y estilo" },
  { id: "m2", name: "Zapatos deportivos", price: 600, image: "https://via.placeholder.com/400x280?text=Zapatos", description: "Ideales para correr" },
  { id: "m3", name: "Smartwatch", price: 1200, image: "https://via.placeholder.com/400x280?text=Reloj", description: "Tecnología en tu muñeca" },
];

export default function HomePage() {
  const [products, setProducts] = useState(mockProducts);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await api.get("/api/products");
        if (mounted && Array.isArray(data)) {
          const withId = data.map(p => ({ ...p, id: p._id }));
          setProducts(withId.length ? withId : mockProducts);
        }
      } catch (e) {
        console.warn("No se pudo cargar productos reales, usando mock", e);
        setError("Mostrando productos de ejemplo por ahora");
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      {error && <p className="text-yellow-700 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="card overflow-hidden hover:shadow-lg transition">
            <img src={p.image || "https://via.placeholder.com/400x280?text=Producto"} alt={p.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-gray-600 line-clamp-2">{p.description}</p>
              <p className="text-xl font-bold text-green-600 mt-2">${p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
