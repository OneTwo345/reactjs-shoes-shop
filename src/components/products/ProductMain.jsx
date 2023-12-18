import React from 'react'
import UserCart from '../common/UserCart';
import Card from '../common/Card';
import { useState, useEffect } from "react";
import axios from 'axios';



export default function ProductMain() {
    const [categories, setCategories] = useState([]);
    const [prices, setPrices] = useState([]);
    const [colors, setColors] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [products, setProducts] = useState([]);
  
    const [productFilter, setProductFilter] = useState([]);
    const [companyFilter, setCompanyFilter] = useState("All");
    const [priceFilter, setPriceFilter] = useState("0,0");
    const [colorFilter, setColorFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [searchFilter, setSearchFilter] = useState("");
  
    const [companyStatus, setCompanyStatus] = useState(false);
    const [priceStatus, setPriceStatus] = useState(false);
    const [colorStatus, setColorStatus] = useState(false);
    const [categoryStatus, setCategoryStatus] = useState(false);
    const [searchStatus, setSearchStatus] = useState(false);
  
    const HandleFilterProduct = () => {
      const productListFilter = products.filter(
        (item) =>
          (companyFilter === "All" ||
            item.company.toLowerCase() === companyFilter.toLowerCase()) &&
          (item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
            item.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
            item.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
            item.color.toLowerCase().includes(searchFilter.toLowerCase())) &&
          (priceFilter === "0,0" ||
            (priceFilter === "150,150" && item.newPrice > 150) ||
            (item.newPrice > parseInt(priceFilter.split(",")[0]) &&
              item.newPrice <= parseInt(priceFilter.split(",")[1]))) &&
          (colorFilter === "All" ||
            item.color.toLowerCase() === colorFilter.toLowerCase()) &&
          (categoryFilter === "All" ||
            item.category.toLowerCase() === categoryFilter.toLowerCase())
      );
      setProductFilter(productListFilter);
    };
    
  
    useEffect(() => {
      async function fetchData() {
        const categories = await axios.get(
          `https://json-server-vercel-shoes-shop-view.vercel.app/categories`)
        const prices = await axios.get(
          "https://json-server-vercel-shoes-shop-view.vercel.app/prices",
        );
        const companies =  await axios.get(
          "https://json-server-vercel-shoes-shop-view.vercel.app/companies",
        );
        const colors =  await axios.get(
          "https://json-server-vercel-shoes-shop-view.vercel.app/colors",
        );
        const products =  await axios.get(
          "https://json-server-vercel-shoes-shop-view.vercel.app/products",
        );
        setCategories(categories.data);
        setPrices(prices.data);
        setColors(colors.data);
        setCompanies(companies.data);
        setProducts(products.data);
      }
      fetchData();
    }, []);
  
    useEffect(() => {
      HandleFilterProduct();
    }, [companyFilter, priceFilter, searchFilter, categoryFilter, colorFilter]);
  return (
    <div>
        <div className="container d-flex border-bottom py-2 mt2">
        <div className="d-flex align-items-center m-w180">
          <button className="icon-button">
            <i className="fa-solid fa-cart-plus fa-xl"></i>
            Shoe-Ecommerce
          </button>
        </div>
        <div className="d-flex flex-grow-1 justify-content-between">
          <form className="d-flex align-items-center" id="searchForm">
            <div className="search-container">
              <input
                type="search"
                id="inputSearch"
                placeholder="Enter your search shoes"
                onInput={(e) => {
                  setSearchFilter(e.target.value.trim());
                  setSearchStatus(e.target.value.trim() !== "");
                }}
              />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </form>
          <UserCart />  
        </div>
      </div>
      <div className="container d-flex">
        <div className="m-w180">
          <div className="d-flex flex-column border-end me-1 h-100">
            <div className="py-1 d-flex flex-column ">
              <h5>Category</h5>
              <div className="form-group" id="categoryContent">
                <div className="form-check py-1">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="category"
                    id="cat_0"
                    value="All"
                    defaultChecked={true}
                    onChange={() => {
                      setCategoryStatus(false);
                      setCategoryFilter("All");
                    }}
                  />
                  <label
                    htmlFor="cat_0"
                    role="button"
                    className="form-check-label text-decoration-underline fw-bolder"
                    value="All"
                  >
                    All Category
                  </label>
                </div>
                {categories.map((item) => (
                  <div key={item.id} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`cat_${item.id}`}
                      name="category"
                      value={item.name}
                      onChange={() => {
                        setCategoryStatus(true);
                        setCategoryFilter(item.name);
                      }}
                    />
                    <label htmlFor={`cat_${item.id}`} role="button">
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="py-2 d-flex flex-column justify-content-center">
              <h5>Price</h5>
              <div className="form-group" id="priceContent">
                <div className="form-check py-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="price"
                    id="price_0"
                    value="0,0"
                    defaultChecked={true}
                    onChange={() => {
                      setPriceStatus(false);
                      setPriceFilter("0,0");
                    }}
                  />
                  <label
                    role="button"
                    htmlFor="price_0"
                    className="form-check-label text-decoration-underline fw-bolder"
                  >
                    All Price
                  </label>
                </div>
                {prices.map((item, index) => {
                  return (
                    <div className="form-check " key={index + 1}>
                      <input
                        type="radio"
                        className="form-check-input"
                        id={`price_${index + 1}`}
                        name="price"
                        value={item.value}
                        onChange={() => {
                          setPriceStatus(true);
                          setPriceFilter(item.value);
                        }}
                      />
                      <label htmlFor={`price_${index + 1}`} role="button">
                        {item.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="py-2 d-flex flex-column justify-content-center">
              <h5>Colors</h5>
              <div className="form-group" id="colorContent">
                <div className="form-check py-1">
                  <input
                    className="form-check-input bi-lg-rrr"
                    type="radio"
                    name="color"
                    id="color_0"
                    value="allColor"
                    defaultChecked={true}
                    onChange={() => {
                      setColorStatus(false);
                      setColorFilter("All");
                    }}
                  />
                  <label
                    role="button"
                    htmlFor="color_0"
                    className="form-check-label text-decoration-underline fw-bolder"
                  >
                    All Color
                  </label>
                </div>
                {colors.map((item) => {
                  return (
                    <div className="form-check " key={item.id}>
                      <input
                        type="radio"
                        className="form-check-input"
                        id={`color_${item.id}`}
                        name="color"
                        style={{
                          backgroundColor: `${item.name}`,
                        }}
                        onChange={() => {
                          setColorStatus(true);
                          setColorFilter(item.name);
                        }}
                        value={item.name}
                      />
                      <label htmlFor={`color_${item.id}`} role="button">
                        {item.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow-1">
          <div className="py-2 d-flex flex-column">
            <h5>Recommended</h5>
            <div className="form-group" id="companyContent">
              <button
                className={`btn ${
                  !companyStatus ? "btn-secondary" : "btn-outline-secondary"
                } btn-recommend btn-sm ps-1 w-30`}
                type="button"
                onClick={() => {
                  setCompanyStatus(false);
                  setCompanyFilter("All");
                }}
                id="cpn_0"
                value="All"
                defaultChecked={true}
              >
                All Products
              </button>
              {companies.map((item, index) => {
                return (
                  <button
                    key={index + 1}
                    className={`btn ${
                      companyStatus && companyFilter == item.name
                        ? "btn-secondary"
                        : "btn-outline-secondary"
                    } btn-recommend btn-sm ps-1 w-30`}
                    type="button"
                    onClick={() => {
                      setCompanyStatus(true);
                      setCompanyFilter(item.name);
                    }}
                    style={{ margin: "5px" }}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
            <div
              id="product"
              className="py-2 d-flex flex-column justify-content-center"
            >
              <h5>Products</h5>
              {/* <div className="row" id="productContent"></div> */}
              <div className="product row">
                {!companyStatus &&
                !colorStatus &&
                !priceStatus &&
                !categoryStatus &&
                !searchStatus
                  ? products.map((item) => {
                      return <Card key={item.id} data={item} />;
                    })
                  : productFilter.map((item) => {
                      return <Card key={item.id} data={item} />;
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
