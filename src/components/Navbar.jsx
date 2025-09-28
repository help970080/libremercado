import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({ id: payload.id, name: payload.name || "Usuario" });
      } catch (e) {
        console.error("Token inválido");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">Mercadito</Link>
      <div className="space-x-4 flex items-center">
        <Link to="/">Inicio</Link>
        <Link to="/publish">Publicar</Link>
        <Link to="/cart">Carrito</Link>
        <Link to="/membership">Membresía</Link>

        {user ? (
          <>
            <span className="font-semibold">👤 {user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded text-white"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
}
