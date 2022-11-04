import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { store } from "./store";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  /* </React.StrictMode> */
);
