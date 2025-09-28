import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CartPage() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    api.get("/cart").then((res) => setCart(res.data));
  }, []);

  if (!cart) return <p className="p-6">Carrito vacío o no logueado.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Tu carrito</h1>
      <ul>
        {cart.items.map((i) => (
          <li key={i.product._id} className="border-b py-2">
            {i.product.name} - {i.quantity} x ${i.product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
