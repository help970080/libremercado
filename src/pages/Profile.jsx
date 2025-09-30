import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Profile() {
  const { user, token } = useAuth();
  const [mine, setMine] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        await api.get("/api/auth/me");
        const resMine = await api.get("/api/products/mine/list");
        setMine(resMine.data || []);
      } catch (e) {
        console.error(e);
        setError("No se pudo cargar tu perfil.");
      }
    })();
  }, [token]);

  if (!user)
    return (
      <div className="container py-8">
        <p>Debes iniciar sesión.</p>
      </div>
    );

  return (
    <div className="container py-8">
      <h2 className="text-3xl font-bold mb-4">Mi perfil</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card p-4">
          <p>
            <strong>Nombre:</strong> {user.name}
          </p>
          <p>
            <strong>Correo:</strong> {user.email}
          </p>
        </div>
        <div className="md:col-span-2 card p-4">
          <h3 className="text-xl font-semibold mb-3">Mis productos</h3>
          {error && <p className="text-red-600">{error}</p>}
          {!mine.length ? (
            <p className="text-gray-600">Aún no tienes productos publicados.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mine.map((p) => (
                <div key={p._id} className="border rounded p-3">
                  <img
                    src={
                      p.image ||
                      "https://via.placeholder.com/400x280?text=Producto"
                    }
                    alt={p.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <div className="mt-2">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-green-700 font-bold">${p.price}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
