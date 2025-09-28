import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios"; // ✅ usamos el interceptor

export default function HomePage() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    api.get("/listings").then((res) => setListings(res.data.items));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Publicaciones</h1>
      <div className="grid grid-cols-2 gap-4">
        {listings.map((l) => (
          <Link
            key={l._id}
            to={`/product/${l._id}`}
            className="border p-4 rounded bg-white shadow"
          >
            {l.images?.length > 0 && (
              <img
                src={l.images[0].url}
                alt={l.title}
                className="h-32 w-full object-cover rounded"
              />
            )}
            <h2 className="font-semibold mt-2">{l.title}</h2>
            <p>${l.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
