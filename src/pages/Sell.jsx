import { useState } from "react";

export default function Sell() {
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "", file: null });

  // Verificar si el usuario está logueado
  const token = localStorage.getItem("token");
  if (!token) {
    return <p className="text-center text-red-600 mt-10">Debes iniciar sesión para vender productos</p>;
  }

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setForm({ ...form, file: files[0] });
    else setForm({ ...form, [name]: value });
  };

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("price", form.price);
      fd.append("description", form.description);
      if (form.image) fd.append("image", form.image);
      if (form.file) fd.append("file", form.file);

      const res = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/products`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }, // Token en header
        body: fd,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Producto publicado ✅");
        setForm({ name: "", price: "", description: "", image: "", file: null });
      } else {
        alert(data.error || "Error al publicar producto");
      }
    } catch {
      alert("Error de red al publicar producto");
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Publicar producto</h2>
      <form onSubmit={onSubmit} className="grid gap-3">
        <input className="border p-2 rounded" name="name" placeholder="Nombre" value={form.name} onChange={onChange} required />
        <input className="border p-2 rounded" type="number" name="price" placeholder="Precio" value={form.price} onChange={onChange} required />
        <textarea className="border p-2 rounded" name="description" placeholder="Descripción" value={form.description} onChange={onChange} />
        <input className="border p-2 rounded" name="image" placeholder="URL de imagen (opcional)" value={form.image} onChange={onChange} />
        <input className="border p-2 rounded" type="file" accept="image/*" onChange={onChange} />
        <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700" type="submit">Publicar</button>
      </form>
    </div>
  );
}
