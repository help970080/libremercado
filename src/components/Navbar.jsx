import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-yellow-400 shadow-md sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-black text-blue-900">LibreMercado</Link>
        <div className="flex-1 mx-6">
          <input placeholder="Buscar productos..." className="w-full rounded-md px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex items-center gap-4">
          <NavLink to="/" className="text-blue-900 font-medium">Inicio</NavLink>
          <NavLink to="/publish" className="bg-blue-900 text-white px-3 py-1 rounded-md">Publicar</NavLink>
          {!user ? (
            <>
              <NavLink to="/login" className="text-blue-900 font-medium">Login</NavLink>
              <NavLink to="/register" className="text-blue-900 font-medium">Registrarse</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile" className="text-blue-900 font-semibold">👤 {user.name || "Perfil"}</NavLink>
              <button onClick={logout} className="bg-red-600 text-white px-3 py-1 rounded-md">Salir</button>
            </>
          )}
          <NavLink to="/cart" className="bg-blue-900 text-white px-3 py-1 rounded-md">Carrito</NavLink>
        </div>
      </div>
    </nav>
  );
}
