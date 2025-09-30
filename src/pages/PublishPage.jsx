import { useState } from "react";
import api, { apiPostForm } from "../services/api";

export default function PublishPage() {
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const token = localStorage.getItem("token");
      if (!token) { setMsg("Debes iniciar sesión para publicar."); return; }
      if (file) {
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => fd.append(k, v));
        fd.append("file", file);
        await apiPostForm("/api/products", fd, { headers: { Authorization: "Bearer " + token } });
      } else {
        await api.post("/api/products", form, { headers: { Authorization: "Bearer " + token } });
      }
      setMsg("Producto publicado ✅");
      setForm({ name: "", price: "", description: "", image: "" }); setFile(null);
    } catch (err) {
      console.error(err);
      setMsg("No se pudo publicar. Revisa conexión o vuelve a intentar.");
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-lg mx-auto card p-6">
        <h2 className="text-2xl font-bold mb-4">Publicar producto</h2>
        {msg && <p className="mb-2">{msg}</p>}
        <form onSubmit={onSubmit} className="grid gap-3">
          <input className="input" name="name" placeholder="Nombre" value={form.name} onChange={onChange} required />
          <input className="input" type="number" min="0" name="price" placeholder="Precio" value={form.price} onChange={onChange} required />
          <textarea className="input" rows="3" name="description" placeholder="Descripción" value={form.description} onChange={onChange} />
          <input className="input" name="image" placeholder="URL de imagen (opcional)" value={form.image} onChange={onChange} />
          <input className="input" type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0] || null)} />
          <button className="btn-primary" type="submit">Publicar</button>
        </form>
      </div>
    </div>
  );
}
