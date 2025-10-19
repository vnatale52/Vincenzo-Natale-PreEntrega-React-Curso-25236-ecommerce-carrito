// src/pages/Home.jsx
import React from "react";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div className="p-6 text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Productos Destacados</h1>
      <ProductList />
    </div>
  );
};

export default Home;
