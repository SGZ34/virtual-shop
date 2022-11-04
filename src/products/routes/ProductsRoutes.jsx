import { Routes, Route } from "react-router-dom";
import { List, Product } from "../pages";

export const ProductsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/:id" element={<Product />} />
      <Route path="/search" element={<List />} />
    </Routes>
  );
};
