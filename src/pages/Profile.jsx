import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Debes iniciar sesión para ver tu perfil");
          setLoading(false);
          return;
        }

        // 🔹 Obtener datos del usuario
        const resUser = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/auth/me`, {
          headers: { Authorization: "Bearer " + token },
        });
        const dataUser = await resUser.json();
        if (resUser.ok) setUser(dataUser);
        else setError("Error cargando perfil");

        // 🔹 Obtener productos del usuario
        const resProducts = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/products/mine`, {
          headers: { Authorization: "Bearer " + token },
        });
        const dataProducts = await resProducts.json();
        if (resProducts.ok) setProducts(dataProducts);
        else setError("Error cargando productos");

      } catch {
        setError("❌ Error de conexión con el servidor");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-6">⏳ Cargando perfil...</p>;
  if (error) return <p className="text-center text-red-600 mt-6">{error}</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center">Mi perfil</h2>
      <div className="bg-white shadow rounded-lg p-6 mb-8 max-w-md mx-auto">
        <p><strong>👤 Nombre:</strong> {user.name}</p>
        <p><strong>📧 Correo:</strong> {user.email}</p>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Mis productos</h3>
      {products.length === 0 ? (
        <p className="text-gray-600">Todavía no has publicado productos.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {products.map((p) => (
            <div key={p._id} className="bg-white rounded-lg shadow p-4">
              <img
                src={p.image || "https://via.placeholder.com/400x300?text=Producto"}
                alt={p.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{p.name}</h3>
              <p className="text-gray-600">{p.description}</p>
              <p className="text-blue-600 font-bold mt-2">${p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
