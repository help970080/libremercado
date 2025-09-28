import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Usuario registrado, ahora inicia sesión");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Error al registrar");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Registrarse</h1>
      <input
        placeholder="Nombre"
        className="border p-2 w-full mt-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mt-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="border p-2 w-full mt-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleRegister}
        className="bg-green-600 text-white px-4 py-2 mt-4 rounded w-full"
      >
        Crear cuenta
      </button>
    </div>
  );
}
