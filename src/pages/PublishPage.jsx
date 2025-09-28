import { useState } from "react";
import api from "../api/axios";

export default function PublishPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  const publish = async () => {
    try {
      await api.post("/listings", {
        title,
        price,
        description: desc,
        images: [image],
      });
      alert("Publicado!");
      setTitle("");
      setPrice("");
      setDesc("");
      setImage("");
    } catch (err) {
      alert(err.response?.data?.message || "Error al publicar");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Nueva publicación</h1>
      <input
        placeholder="Título"
        className="border p-2 w-full mt-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Precio"
        className="border p-2 w-full mt-2"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <textarea
        placeholder="Descripción"
        className="border p-2 w-full mt-2"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        placeholder="Imagen (base64 o URL)"
        className="border p-2 w-full mt-2"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button
        onClick={publish}
        className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
      >
        Publicar
      </button>
    </div>
  );
}
