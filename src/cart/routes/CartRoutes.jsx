import { Routes, Route } from "react-router-dom";
import { Cart, Checkout } from "../pages";

export const CartRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
    </Routes>
  );
};
