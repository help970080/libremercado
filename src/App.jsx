import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

// Páginas
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sell from "./pages/Sell";
import Profile from "./pages/Profile";
import ChatPage from "./pages/ChatPage";
import CartPage from "./pages/CartPage";
import MembershipPage from "./pages/MembershipPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import PublishPage from "./pages/PublishPage";

import "./index.css";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />

            {/* Rutas privadas */}
            <Route
              path="/sell"
              element={
                <PrivateRoute>
                  <Sell />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <CartPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/publish"
              element={
                <PrivateRoute>
                  <PublishPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
