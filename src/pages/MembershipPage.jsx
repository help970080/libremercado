// src/pages/MembershipPage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../axios.js";

function MembershipPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/membership/checkout");
      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        setError("No se pudo iniciar el proceso de pago.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Membresía</h2>
        <p>Debes iniciar sesión para adquirir una membresía.</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Membresía Premium</h2>
      <p className="mb-6">Accede a beneficios exclusivos como vendedor.</p>
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Procesando..." : "Suscribirme"}
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}

export default MembershipPage;
