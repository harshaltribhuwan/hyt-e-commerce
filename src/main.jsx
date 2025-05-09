// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store"; // import our store
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./assets/scss/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter basename="/hyt-e-commerce">
      <App />
    </BrowserRouter>
  </Provider>
);
