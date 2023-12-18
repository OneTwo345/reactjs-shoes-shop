import React from 'react'
import { Link } from 'react-router-dom'

export default function UserCart() {
  return (
    <div>
       <div className="d-flex pt-10 pl-50">
            <div className="btn-group">
          <div className="dropdown">
              
            <Link className='dropdown-usercart' to="/cart">
              <i className="fa-solid fa-cart-shopping fa-lg pr-10">
                </i></Link>  
                  <Link
                      role="button"
                      className="dropdown-toggle"
                      href="#"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                  >
                      <i className="fas fa-user fa-lg"></i>

                  </Link>
                  <div
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="dropdownMenuButton"
                  >
                      <Link className='dropdown-usercart' to="/cart">Cart</Link>
                      <div className="dropdown-divider"></div>
                      <Link className='dropdown-usercart' to="/products">Admin Page</Link>
                      <div className="dropdown-divider"></div>
                      <Link className='dropdown-usercart' to="/">Shopping</Link>
                  </div>
              </div>
            </div>
          </div>
    </div>
  )
}
