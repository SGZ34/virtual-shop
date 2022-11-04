import alertify from "alertifyjs";
import React from "react";
import { useCart } from "../contexts";
import { calculateDiscount } from "../helpers";

export const Row = ({ product }) => {
  const { addToCart, substract, clearProduct } = useCart();

  const productWithDiscount = calculateDiscount(product);

  const handleClear = ({ id, title }) => {
    alertify.confirm(
      "Eliminar producto",
      `¿Deseas eliminar este producto: ${title}?`,
      function () {
        clearProduct(id);
      },
      function () {
        return;
      }
    );
  };
  return (
    <tr>
      <td className="text-center">{product.title}</td>
      <td className="container-img-cart">
        <img
          className="img-cart-row"
          src={product.thumbnail}
          alt={product.description}
        />
      </td>
      <td className="text-center">{product.cantidad}</td>
      <td>{product.description.slice(0, 40)}...</td>
      <td> {product.category}</td>
      <td className="text-center">{productWithDiscount}</td>
      <td className="text-center"> {productWithDiscount * product.cantidad}</td>
      <td className="text-center">
        <button
          className="actions-cart-btn delete"
          onClick={() => {
            substract({ product, cantidad: 1 });
          }}
        >
          <i className="fa-solid fa-minus"></i>
        </button>
        <button
          className="actions-cart-btn add"
          onClick={() => addToCart({ product, cantidad: 1 })}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
        <button
          className="actions-cart-btn delete"
          onClick={() => handleClear(product)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};
