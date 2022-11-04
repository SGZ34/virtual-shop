import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { CartRoutes } from "../cart";
import { Navbar } from "../components";
import { CartProvider, ProductsProvider } from "../contexts";
import { ProductsRoutes } from "../products";
import { setTypeMessage } from "../helpers";
import { useDispatch } from "react-redux";
import { clearMessage } from "../store/slices";
import alertify from "alertifyjs";

export const Router = () => {
  const { text, type } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!!text && !!type) {
      alertify.set("notifier", "position", "top-right");
      const showMessage = setTypeMessage(type, text);
      showMessage();
      dispatch(clearMessage());
    }
  }, [text]);

  return (
    <>
      <ProductsProvider>
        <CartProvider>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<h1>Home page</h1>} />
              <Route path="/products/*" element={<ProductsRoutes />} />
              <Route path="/cart/*" element={<CartRoutes />} />
            </Routes>
          </div>
        </CartProvider>
      </ProductsProvider>
    </>
  );
};
