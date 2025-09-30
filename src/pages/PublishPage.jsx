// src/pages/PublishPage.jsx
import React, { useState } from "react";
import api from "../axios.js";

function PublishPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("file", file);
      formData.append("location[state]", state);
      formData.append("location[city]", city);

      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Producto publicado con éxito 🚀");
      setName("");
      setDescription("");
      setPrice("");
      setFile(null);
      setState("");
      setCity("");
    } catch (err) {
      console.error("Error publicando producto", err);
      alert("Error al publicar producto");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Publicar producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />

        {/* Select de Estado */}
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Selecciona un estado</option>
          <option value="Veracruz">Veracruz</option>
          <option value="CDMX">Ciudad de México</option>
          <option value="Puebla">Puebla</option>
        </select>

        {/* Select de Ciudad (dinámico según estado) */}
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Selecciona una ciudad</option>
          {state === "Veracruz" && (
            <>
              <option value="Xalapa">Xalapa</option>
              <option value="Veracruz">Veracruz</option>
              <option value="Coatzacoalcos">Coatzacoalcos</option>
            </>
          )}
          {state === "CDMX" && (
            <>
              <option value="Benito Juárez">Benito Juárez</option>
              <option value="Coyoacán">Coyoacán</option>
              <option value="Iztapalapa">Iztapalapa</option>
            </>
          )}
          {state === "Puebla" && (
            <>
              <option value="Puebla">Puebla</option>
              <option value="Tehuacán">Tehuacán</option>
              <option value="Atlixco">Atlixco</option>
            </>
          )}
        </select>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Publicar
        </button>
      </form>
    </div>
  );
}

export default PublishPage;
