import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { calculateDiscount } from "../helpers";
import { setSuccess } from "../store/slices";
import { useProducts } from "./ProductsContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("No existe un contexto del carrito");
  return context;
};

const inititialState = JSON.parse(localStorage.getItem("cart")) ?? [];
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(inititialState);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();

  const { buyProducts, products } = useProducts();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    let totalOfAll = 0;
    cart.forEach((p) => {
      totalOfAll += calculateDiscount(p) * p.cantidad;
    });
    setTotal(totalOfAll);
  }, [cart]);

  const substract = ({ product, cantidad }) => {
    const validateProduct = cart.find((p) => p.id === product.id);

    if (validateProduct) {
      if (
        validateProduct.cantidad - cantidad === 0 ||
        validateProduct.cantidad - cantidad < 0
      ) {
        console.log("se cumplio la condicion");
        return setCart(cart.filter((p) => p.id !== product.id));
      }
      setCart(
        cart.map((p) =>
          p.id === product.id ? { ...p, cantidad: p.cantidad - cantidad } : p
        )
      );
    }
  };

  const addToCart = ({ product, cantidad }) => {
    const validateProduct = cart.find((p) => p.id === product.id);
    const { stock } = products.find((p) => p.id === product.id);

    if (!validateProduct) {
      return cantidad <= stock && setCart([...cart, { ...product, cantidad }]);
    }

    validateProduct.cantidad + cantidad <= stock &&
      setCart(
        cart.map((p) =>
          p.id === product.id ? { ...p, cantidad: p.cantidad + cantidad } : p
        )
      );
  };

  const clearProduct = (id) => {
    const validateProduct = cart.find((p) => p.id === id);
    if (validateProduct) {
      setCart(cart.filter((p) => p.id !== id));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const buy = ({ name, pay }) => {
    buyProducts(cart);
    clearCart();
    dispatch(
      setSuccess(
        `${name} gracias por tu compra ${
          pay > total ? `su devuelta es de $${pay - total}` : ``
        }`
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        elementsInCart: cart.length,
        clearCart,
        substract,
        clearProduct,
        total,
        buy,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
