import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/scss/style.scss";
import { Provider } from "react-redux";
import { store } from "./components/Redux/Store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.querySelector(".wrapper")
);
