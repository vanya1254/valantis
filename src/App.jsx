import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { Product } from "./pages/Product";
import { NotFound } from "./pages/NotFound";

import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="valantis/" element={<Home />}></Route>
        {/* <Route path="valantis/products" element={<Products />}></Route> */}
        <Route
          path="valantis/products/page/:pageNumber"
          element={<Products />}
        ></Route>
        <Route path="valantis/products/:id" element={<Product />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};

export default App;
