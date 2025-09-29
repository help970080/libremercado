import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Usuario registrado, ahora puedes iniciar sesión");
      } else {
        alert(data.error);
      }
    } catch {
      alert("Error en registro");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 bg-white shadow rounded grid gap-3">
      <input className="border p-2 rounded" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className="border p-2 rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className="border p-2 rounded" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700" type="submit">Crear cuenta</button>
    </form>
  );
}
