import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error("No existe un contexto de productos");
  return context;
};

const inititialState = JSON.parse(localStorage.getItem("products")) || [];

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(inititialState);

  useEffect(() => {
    if (products.length === 0) {
      const getData = async () => {
        const { data } = await axios.get("https://dummyjson.com/products");
        setProducts(data.products);
        localStorage.setItem("products", JSON.stringify(data.products));
      };
      getData();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const getProduct = (id) => {
    const product = products.find((p) => p.id === parseInt(id));

    if (product) {
      return product;
    }
  };

  const buyProducts = (productsToBuy) => {
    productsToBuy.map((p) => {
      setProducts(
        products.map((product) =>
          p.id === product.id
            ? { ...product, stock: product.stock - p.cantidad }
            : product
        )
      );
    });
  };
  return (
    <ProductsContext.Provider value={{ products, getProduct, buyProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
