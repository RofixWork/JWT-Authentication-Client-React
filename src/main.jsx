import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
