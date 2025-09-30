// src/pages/ProductDetailPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axios.js";
import { AuthContext } from "../AuthContext.jsx";

function ProductDetailPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error cargando producto", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleContact = async () => {
    if (!user) {
      return navigate("/login");
    }
    if (!user.membershipActive) {
      return navigate("/membership");
    }
    try {
      const res = await api.post("/conversations", { sellerId: product.user });
      navigate(`/chat/${res.data._id}`);
    } catch (err) {
      console.error("Error iniciando chat", err);
    }
  };

  if (!product) return <div className="p-6">Cargando...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-h-96 object-cover mb-4 rounded-lg"
      />
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-green-600 font-bold text-xl mb-6">${product.price}</p>
      <button
        onClick={handleContact}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
      >
        Contactar al vendedor
      </button>
    </div>
  );
}

export default ProductDetailPage;
