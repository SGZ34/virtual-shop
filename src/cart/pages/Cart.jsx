import alertify from "alertifyjs";
import { Link } from "react-router-dom";
import { Row } from "../../components";
import { useCart } from "../../contexts";

export const Cart = () => {
  const { cart, clearCart, total } = useCart();

  const handleClear = () => {
    alertify.confirm(
      "Limpiar carrito",
      "¿Deseas limpiar el carrito?",
      function () {
        clearCart();
      },
      function () {
        return;
      }
    );
  };

  return (
    <div className="container-cart">
      <h1>Carrito</h1>
      {cart.length > 0 ? (
        <>
          <div className="container-clear-cart">
            <button className="clear-cart" onClick={handleClear}>
              Limpiar carrito
            </button>
          </div>
          <div className="container-table">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Imagen</th>
                  <th>Cantidad</th>
                  <th>Descripción</th>
                  <th>Categoría</th>
                  <th>Precio Unidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((p) => (
                  <Row product={p} key={p.id} />
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={8}>
                    <strong>Total: </strong> ${total}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <Link to="/cart/checkout" className="btn-checkout">
            Pagar
          </Link>
        </>
      ) : (
        <>
          <h1>No tienes productos agregados al carrito</h1>
          <Link to="/products" className="btn-go-to-buy">
            Ir a comprar
          </Link>
        </>
      )}
    </div>
  );
};
