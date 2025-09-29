import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Usuario creado correctamente, ya puedes iniciar sesión");
        setName(""); setEmail(""); setPassword("");
      } else {
        setMessage("❌ " + (data.error || "Error al registrarse"));
      }
    } catch {
      setMessage("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear cuenta</h2>
        {message && <p className="mb-4 text-center">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full border rounded p-2" placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} required />
          <input className="w-full border rounded p-2" placeholder="Correo" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="w-full border rounded p-2" placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Registrarse</button>
        </form>
      </div>
    </div>
  );
}
