import { Link } from "react-router-dom";
import { calculateDiscount, generateStars } from "../helpers";
export const CardProduct = ({ product }) => {
  if (product.stock === 0) return <></>;

  return (
    <Link to={`/products/${product?.id}`} className="card-product">
      <img src={`${product?.thumbnail}`} alt={`${product?.title}`} />
      <div className="content-card-product">
        <div className="section-card">
          <p>{product?.brand}</p>
        </div>

        <div className="section-card ">
          <p>{product.title}</p>
        </div>

        <div className="section-card">
          <p className="product-description">
            {product?.description.slice(0, 50)}
          </p>
        </div>

        <div className="section-card">
          <div>
            <span className="descuento">-{product?.discountPercentage}%</span>
            <span className="original-price">${product?.price}</span>
          </div>
        </div>

        <div className="section-card">
          <p>${calculateDiscount(product)}</p>
        </div>
        <div className="section-card">
          <h4>Calificación</h4>
          <p>
            <span>{generateStars(product?.rating)}</span>
          </p>
        </div>
      </div>
      <div className="btn-container">
        <button className="btn-buy-product">Ver más</button>
      </div>
    </Link>
  );
};
