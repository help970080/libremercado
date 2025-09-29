import { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/products`);
        const data = await res.json();
        if (res.ok) {
          setProducts(data);
        } else {
          setError("❌ No se pudieron cargar los productos");
        }
      } catch {
        setError("❌ Error de conexión con el servidor");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-6">⏳ Cargando productos...</p>;

  if (error) return <p className="text-center text-red-600 mt-6">{error}</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8">Productos disponibles</h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-600">No hay productos publicados aún.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
            >
              <img
                src={p.image || "https://via.placeholder.com/400x300?text=Producto"}
                alt={p.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-3">{p.name}</h3>
              <p className="text-gray-600">{p.description}</p>
              <p className="text-xl font-bold text-blue-600 mt-2">${p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
