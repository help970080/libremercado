import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const login = ({ token, name, email }) => {
    const u = { name, email };
    localStorage.setItem("user", JSON.stringify(u));
    localStorage.setItem("token", token);
    setUser(u); setToken(token);
  };
  const logout = () => { localStorage.removeItem("user"); localStorage.removeItem("token"); setUser(null); setToken(null); };
  useEffect(() => {
    const onStorage = () => {
      const raw = localStorage.getItem("user"); setUser(raw ? JSON.parse(raw) : null);
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth(){ return useContext(AuthContext); }
