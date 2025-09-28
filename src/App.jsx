import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import PublishPage from "./pages/PublishPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MembershipPage from "./pages/MembershipPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx"; // 🔒 nuevo

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protegidas */}
        <Route
          path="/publish"
          element={
            <PrivateRoute>
              <PublishPage />
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
          path="/membership"
          element={
            <PrivateRoute>
              <MembershipPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
