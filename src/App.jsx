import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sell from "./pages/Sell";

// 🔒 Ruta protegida
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  const [user, setUser] = useState(localStorage.getItem("username") || null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(localStorage.getItem("username"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="font-sans min-h-screen bg-gray-50 text-gray-800">
      {/* NAVBAR */}
      <nav className="bg-blue-600 text-white shadow sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6 py-3">
          <h1 className="text-xl font-bold">LibreMercado</h1>
          <div className="flex gap-6 items-center">
            <NavLink className="hover:underline" to="/">Inicio</NavLink>
            <NavLink className="hover:underline" to="/vender">Vender</NavLink>

            {!user ? (
              <>
                <NavLink className="hover:underline" to="/login">Login</NavLink>
                <NavLink className="hover:underline" to="/register">Registrarse</NavLink>
              </>
            ) : (
              <>
                <span className="font-semibold">👋 Hola, {user}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* CONTENIDO */}
      <main className="container mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/vender"
            element={
              <PrivateRoute>
                <Sell />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-100 text-center text-sm py-4 border-t mt-10 text-gray-500">
        © {new Date().getFullYear()} LibreMercado. Todos los derechos reservados.
      </footer>
    </div>
  );
}
