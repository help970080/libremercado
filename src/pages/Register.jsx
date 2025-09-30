import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); setOk("");
    try {
      await api.post("/api/auth/register", form);
      setOk("Usuario creado. Ahora inicia sesión.");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      console.error(err);
      setError("No se pudo registrar. Revisa el correo o intenta más tarde.");
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-md mx-auto card p-6">
        <h2 className="text-2xl font-bold mb-4">Registro</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        {ok && <p className="text-green-700 mb-2">{ok}</p>}
        <form onSubmit={onSubmit} className="grid gap-3">
          <input className="input" name="name" placeholder="Nombre" value={form.name} onChange={onChange} required />
          <input className="input" type="email" name="email" placeholder="Correo" value={form.email} onChange={onChange} required />
          <input className="input" type="password" name="password" placeholder="Contraseña" value={form.password} onChange={onChange} required />
          <button className="btn-primary" type="submit">Crear cuenta</button>
        </form>
        <p className="text-sm text-gray-600 mt-3">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-700 font-medium">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}
