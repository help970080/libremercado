import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <Link to="/" className="font-bold">LibreMercado</Link>
      <div className="flex gap-4">
        <Link to="/">Inicio</Link>
        {user ? (
          <>
            <Link to="/sell">Vender</Link>
            <Link to="/profile">Mi perfil</Link>
            <Link to="/chat">Chat</Link>
            <button onClick={logout} className="bg-red-500 px-2 rounded">Salir</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Regístrate</Link>
          </>
        )}
      </div>
    </nav>
  );
}
