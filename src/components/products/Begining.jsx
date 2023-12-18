import React from 'react'
import UserCart from '../common/UserCart'

export default function Begining() {
  return (
    <div className="container d-flex border-bottom py-2 mt2">
    <div className="d-flex align-items-center m-w180">
      <button className="icon-button">
      <i className="fa-solid fa-cart-plus fa-xl"></i>
        Shoe-Ecommerce
      </button>
    </div>
    <div className="d-flex flex-grow-1 justify-content-between">
      <form className="d-flex align-items-center" id="searchForm">
        
      </form>
      <UserCart />
    </div>
  </div>
  )
}
