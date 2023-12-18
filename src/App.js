import "./App.css";
import { useState, useEffect } from "react";
import ProductView from "./components/products/ProductView";
import { Route, Routes } from "react-router-dom";
import newData from "../src/data/data.json";
import ProductMain from "./components/products/ProductMain";
import Layout from "./components/products/Layout";
import AddProduct from "./components/products/AddProduct";
import Cart from "./components/products/Cart";

function App() {
  const [data, setData] = useState(newData);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductMain />} />
        <Route path="/products" element={<Layout />}>
          <Route path="" element={<ProductView />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route path="/add-product" element={<AddProduct />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
