import { useEffect, useState } from "react";

// ==========================
// API client embebido (fetch)
// ==========================
// Usa VITE_APP_API_BASE_URL si existe; si no, cae a localhost.
const API_BASE = (import.meta?.env?.VITE_APP_API_BASE_URL)
  || (typeof window !== "undefined" && window.__API_BASE__)
  || "http://localhost:10000";

function getContentType(res) {
  return (res.headers?.get?.("content-type") || "").toLowerCase();
}

async function parseResponse(res) {
  const ct = getContentType(res);
  let body;
  try {
    if (ct.includes("application/json")) {
      body = await res.json();
    } else if (ct.includes("text/")) {
      body = await res.text();
    } else {
      body = await res.arrayBuffer();
    }
  } catch (e) {
    body = "<unparseable body>";
  }

  if (!res.ok) {
    const preview = typeof body === "string" ? body.slice(0, 280) : (typeof body === "object" ? JSON.stringify(body).slice(0, 280) : `[${ct}] ${String(body).slice(0, 100)}`);
    throw new Error(`${res.status} ${res.statusText} — ${preview}`);
  }
  return body;
}

async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, { credentials: "omit" });
  return parseResponse(res);
}

async function apiPostForm(path, formData) {
  const res = await fetch(`${API_BASE}${path}`, { method: "POST", body: formData, credentials: "omit" });
  return parseResponse(res);
}

// ==========================
// Componente principal
// ==========================
export default function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "", description: "", file: null });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");

  // Productos demo para mostrar si el backend está vacío
  const demoProducts = [
    { id: "demo1", name: "Camisa de algodón", price: 250, description: "Comodidad y estilo", image: "https://via.placeholder.com/320x200?text=Camisa" },
    { id: "demo2", name: "Zapatos deportivos", price: 600, description: "Ideales para correr", image: "https://via.placeholder.com/320x200?text=Zapatos" },
    { id: "demo3", name: "Smartwatch", price: 1200, description: "Tecnología en tu muñeca", image: "https://via.placeholder.com/320x200?text=Reloj" }
  ];

  async function load() {
    try {
      const data = await apiGet("/api/products");
      if (!Array.isArray(data)) {
        console.warn("/api/products no devolvió un array. Respuesta:", data);
        setProducts([]);
        setNotice(typeof data === "string" ? data.slice(0, 160) : "Respuesta inesperada del servidor.");
      } else {
        setProducts(data);
        setNotice("");
      }
      setError("");
    } catch (e) {
      console.error("[LOAD]", e);
      setError("Error al conectar con backend ❌");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

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

      const result = await apiPostForm("/api/products", fd);
      const msg = typeof result === "string" ? result : (result?.name ? `Creado: ${result.name}` : "Creado correctamente");
      setNotice(msg);
      setForm({ name: "", price: "", image: "", description: "", file: null });
      await load();
    } catch (e) {
      console.error("[CREATE]", e);
      alert(`No se pudo crear el producto: ${e.message}`);
    }
  }

  return (
    <div style={{ fontFamily: "Arial", margin: 20 }}>
      <h1 style={{ textAlign: "center" }}>LibreMercado</h1>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {notice && !error && <p style={{ color: "green", textAlign: "center" }}>{notice}</p>}

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, maxWidth: 480, margin: "20px auto" }}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={onChange} required />
        <input name="price" type="number" min="0" placeholder="Precio" value={form.price} onChange={onChange} required />
        <input name="image" placeholder="URL de imagen (opcional)" value={form.image} onChange={onChange} />
        <input type="file" accept="image/*" onChange={onChange} />
        <textarea name="description" placeholder="Descripción" value={form.description} onChange={onChange} />
        <button type="submit">Crear producto</button>
      </form>

      {loading ? <p style={{ textAlign: "center" }}>Cargando…</p> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
          {(products.length > 0 ? products : demoProducts).map(p => (
            <div key={p._id || p.id} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10 }}>
              <img src={p.image || "https://via.placeholder.com/320x200?text=Producto"} alt={p.name} style={{ width: "100%", borderRadius: 6 }} />
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <strong>${p.price}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}