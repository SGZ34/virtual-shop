import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useCart, useProducts } from "../../contexts";
import { calculateDiscount } from "../../helpers";
import { setSuccess } from "../../store/slices";

export const Product = () => {
  const [product, setProduct] = useState({});
  const [urlImg, setUrlImg] = useState("");

  const dispatch = useDispatch();

  const { id } = useParams();
  const { getProduct } = useProducts();
  const { addToCart } = useCart();

  const handleClick = (img) => {
    if (urlImg !== img) setUrlImg(img);
  };

  const add = (product) => {
    addToCart({ product, cantidad: 1 });
    dispatch(setSuccess("Producto añadido correctamente al carrito"));
  };

  useEffect(() => {
    const productGet = getProduct(id);
    setProduct(productGet);
    setUrlImg(productGet?.thumbnail);
  }, [id, getProduct]);

  return (
    <div className="container-product">
      <div className="container-imgs-product">
        <img
          src={`${urlImg}`}
          alt={product.description}
          className="product-img"
        />
        <div className="imgs-product">
          {product.images?.map((img) => (
            <img src={img} key={img} onClick={() => handleClick(img)} />
          ))}
        </div>
      </div>
      <div className="container-text-product">
        <div className="section-text-product">
          <h4>Producto</h4>
          <p>{product?.title}</p>
          <p style={{ marginTop: 10 }}>{product?.brand}</p>
        </div>

        <div className="section-text-product section-price">
          <h4>Precio</h4>
          <div className="container-descuento">
            <div>
              <span className="descuento">-{product?.discountPercentage}%</span>
              <span className="original-price">${product?.price}</span>
              <p style={{ marginTop: 10 }} className="price-product">
                ${calculateDiscount(product)}
              </p>
            </div>
          </div>
        </div>
        <div className="section-text-product">
          <h4>Descripción del producto</h4>
          <p>{product?.description}</p>
        </div>
        <div className="section-text-product">
          <h4></h4>
          <p></p>
        </div>
        <div className="section-text-product">
          <h4>Calificación</h4>
          <p>{Math.round(product?.rating)}/5</p>
        </div>
        <button className="add-to-cart" onClick={() => add(product)}>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};
