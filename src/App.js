import "./App.css";
import { useState, useEffect } from "react";
import ProductView from "./components/products/ProductView";
import { Route, Routes } from "react-router-dom";
import newData from "../src/data/data.json";
import ProductMain from "./components/products/ProductMain";
import Layout from "./components/products/Layout";
import AddProduct from "./components/products/AddProduct";
import Cart from "./components/products/Cart";
import BankView from "./banking/BankView";
import CreateCustomer from "./banking/CreateCustomer";
import EditCustomer from "./banking/EditCustomer";
import Deposit from "./banking/Deposit";
import Withdraw from "./banking/Withdraw";
import DeleteCustomer from "./banking/DeleteCustomer";
import TransferMoney from "./banking/TransferMoney";

function App() {
  const [data, setData] = useState(newData);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BankView />} />
        <Route path="/add-customer" element={<CreateCustomer />} />
        <Route path="/edit-customer/:id" element={<EditCustomer />} />
        <Route path="/delete-customer/:id" element={<DeleteCustomer />} />
        <Route path="/deposit/:id" element={<Deposit />} />
        <Route path="/withdraw/:id" element={<Withdraw />} />
        <Route path="/transfer/:id" element={<TransferMoney />} />
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
