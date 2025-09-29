import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

// ==========================
// API Client (igual que antes)
// ==========================
const API_BASE = import.meta?.env?.VITE_APP_API_BASE_URL || "http://localhost:10000";

async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`);
  return res.json().catch(() => []);
}

async function apiPostForm(path, formData) {
  const res = await fetch(`${API_BASE}${path}`, { method: "POST", body: formData });
  return res.json().catch(() => ({}));
}

// ==========================
// Componentes de páginas
// ==========================
function Home() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "", description: "", file: null });
  const [loading, setLoading] = useState(true);

  const demoProducts = [
    { id: "demo1", name: "Camisa de algodón", price: 250, description: "Comodidad y estilo", image: "https://via.placeholder.com/320x200?text=Camisa" },
    { id: "demo2", name: "Zapatos deportivos", price: 600, description: "Ideales para correr", image: "https://via.placeholder.com/320x200?text=Zapatos" },
    { id: "demo3", name: "Smartwatch", price: 1200, description: "Tecnología en tu muñeca", image: "https://via.placeholder.com/320x200?text=Reloj" }
  ];

  async function load() {
    try {
      const data = await apiGet("/api/products");
      setProducts(Array.isArray(data) ? data : []);
    } catch {
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
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("description", form.description);
    if (form.image) fd.append("image", form.image);
    if (form.file) fd.append("file", form.file);

    await apiPostForm("/api/products", fd);
    setForm({ name: "", price: "", image: "", description: "", file: null });
    load();
  }

  return (
    <div>
      <h2>Inicio</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, maxWidth: 480, margin: "20px auto" }}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={onChange} required />
        <input name="price" type="number" placeholder="Precio" value={form.price} onChange={onChange} required />
        <input name="image" placeholder="URL de imagen" value={form.image} onChange={onChange} />
        <input type="file" accept="image/*" onChange={onChange} />
        <textarea name="description" placeholder="Descripción" value={form.description} onChange={onChange} />
        <button type="submit">Crear producto</button>
      </form>

      {loading ? <p>Cargando…</p> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
          {(products.length > 0 ? products : demoProducts).map(p => (
            <div key={p._id || p.id} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10 }}>
              <img src={p.image} alt={p.name} style={{ width: "100%", borderRadius: 6 }} />
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

function Sell() {
  return <h2>Pantalla de Vender (formulario pronto aquí)</h2>;
}

function Login() {
  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form style={{ display: "grid", gap: 8, maxWidth: 300, margin: "20px auto" }}>
        <input placeholder="Email" type="email" required />
        <input placeholder="Contraseña" type="password" required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

function Register() {
  return (
    <div>
      <h2>Registrarse</h2>
      <form style={{ display: "grid", gap: 8, maxWidth: 300, margin: "20px auto" }}>
        <input placeholder="Nombre" required />
        <input placeholder="Email" type="email" required />
        <input placeholder="Contraseña" type="password" required />
        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  );
}

// ==========================
// App principal con Router
// ==========================
export default function App() {
  return (
    <Router>
      <div style={{ fontFamily: "Arial", margin: 20 }}>
        <nav style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 20 }}>
          <Link to="/">Inicio</Link>
          <Link to="/vender">Vender</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Registrarse</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vender" element={<Sell />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}
