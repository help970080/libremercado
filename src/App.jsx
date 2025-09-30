// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import PublishPage from "./pages/PublishPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import MembershipPage from "./pages/MembershipPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import { AuthProvider } from "./AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Página de inicio */}
          <Route path="/" element={<HomePage />} />

          {/* Autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Perfil y Membresía */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/membership" element={<MembershipPage />} />

          {/* Publicar producto - requiere membresía */}
          <Route
            path="/publish"
            element={
              <PrivateRoute restricted>
                <PublishPage />
              </PrivateRoute>
            }
          />

          {/* Carrito */}
          <Route path="/cart" element={<CartPage />} />

          {/* Detalle del producto */}
          <Route path="/products/:id" element={<ProductDetailPage />} />

          {/* Chat - requiere membresía */}
          <Route
            path="/chat/:id"
            element={
              <PrivateRoute restricted>
                <ChatPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
