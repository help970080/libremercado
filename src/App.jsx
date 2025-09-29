import React, { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [message, setMessage] = useState("Cargando...");

  useEffect(() => {
    api.get("/api/products")
      .then(res => setMessage("Conexión exitosa con backend 🚀"))
      .catch(() => setMessage("Error al conectar con backend ❌"));
  }, []);

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", marginTop: "50px" }}>
      <h1>LibreMercado</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
