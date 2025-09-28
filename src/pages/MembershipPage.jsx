import api from "../api/axios";

export default function MembershipPage() {
  const subscribe = async (priceId) => {
    try {
      const res = await api.post("/membership/create-checkout-session", {
        priceId,
      });
      window.location.href = res.data.url;
    } catch (err) {
      alert("Error al crear sesión de Stripe");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Membresías</h1>
      <div className="space-y-4">
        <div className="p-4 border rounded bg-white">
          <h2 className="font-semibold">Pro - $9.99/mes</h2>
          <button
            onClick={() => subscribe("price_123")} // tu priceId real
            className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
          >
            Suscribirse
          </button>
        </div>
      </div>
    </div>
  );
}
