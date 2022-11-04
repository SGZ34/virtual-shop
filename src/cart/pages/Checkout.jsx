import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import spanish from "yup-es";

import { useCart } from "../../contexts";
import { calculateDiscount } from "../../helpers";

yup.setLocale(spanish);
export const Checkout = () => {
  const { cart, total, buy } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container-checkout">
      <div className="info-checkout">
        <h1 className="title-info">Pagar compra</h1>

        <div className="content-info">
          <table className="table-checkout">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((p) => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td className="text-center">{p.cantidad}</td>
                  <td className="text-center">
                    {calculateDiscount(p) * p.cantidad}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>
                  <strong>Total: </strong>${total}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="payment">
        <h1 className="title-info">Realizar pago</h1>

        <div className="content-info">
          <Formik
            initialValues={{
              name: "",
              pay: "",
            }}
            validationSchema={yup.object({
              name: yup.string().min(4).max(80).required().label("El nombre"),
              pay: yup
                .number()
                .positive()
                .min(total)
                .required()
                .label("El pago"),
            })}
            onSubmit={(values) => {
              buy(values);
              navigate("/products");
            }}
          >
            {({ errors, handleSubmit, touched }) => (
              <Form onSubmit={handleSubmit}>
                <div className="form-group">
                  <Field
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Digite su nombre"
                    className={`form-control ${
                      touched.name && errors.name ? "error-input" : ""
                    }`}
                  />

                  {touched.name && errors.name ? (
                    <ErrorMessage
                      component="span"
                      className="error-message"
                      name="name"
                    />
                  ) : null}
                </div>
                <div>
                  <Field
                    id="pay"
                    type="number"
                    name="pay"
                    placeholder="Digite su dinero"
                    className={`form-control ${
                      touched.pay && errors.pay ? "error-input" : ""
                    }`}
                  />

                  {touched.pay && errors.pay ? (
                    <ErrorMessage
                      component="span"
                      className="error-message"
                      name="pay"
                    />
                  ) : null}
                </div>

                <button type="submit" className="btn-send">
                  Pagar
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
