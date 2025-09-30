import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/api/auth/login", form);
      login({ token: data.token, name: data.name, email: data.email });
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("Credenciales inválidas o servidor no disponible");
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-md mx-auto card p-6">
        <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <form onSubmit={onSubmit} className="grid gap-3">
          <input className="input" type="email" name="email" placeholder="Correo" value={form.email} onChange={onChange} required />
          <input className="input" type="password" name="password" placeholder="Contraseña" value={form.password} onChange={onChange} required />
          <button className="btn-primary" type="submit">Entrar</button>
        </form>
        <p className="text-sm text-gray-600 mt-3">
          ¿No tienes cuenta? <Link to="/register" className="text-blue-700 font-medium">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
