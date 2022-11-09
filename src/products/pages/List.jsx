import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { parse } from "query-string";
import { CardProduct } from "../../components";
import { useProducts } from "../../contexts";
import { filterArray } from "../../helpers";

export const List = () => {
  const [valueToSearch, setValueToSearch] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();

  const { q = "" } = parse(search);

  const { products } = useProducts();

  const handleChange = (e) => {
    setValueToSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/products/search?q=${valueToSearch}`);
  };

  const productsFiltered = () => {
    const filtered = filterArray(products, q);
    return filtered.length > 0 ? (
      filtered.map((p) => <CardProduct product={p} key={p.id} />)
    ) : (
      <h1 className="titulo-products">No hay productos con esta información</h1>
    );
  };

  const renderMain = () => {
    if (q !== "") {
      return productsFiltered();
    } else {
      return products.map((product) => (
        <CardProduct product={product} key={product.id} />
      ));
    }
  };

  return (
    <div className="container-products">
      {q !== "" && (
        <h1 className="text-search">Busquedas encontradas con {`"${q}"`}</h1>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar un producto"
          onChange={handleChange}
        />
        <button type="submit">Buscar</button>
      </form>
      {renderMain()}
    </div>
  );
};
