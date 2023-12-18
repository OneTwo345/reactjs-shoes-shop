import React from 'react'
import { Link } from 'react-router-dom'

export default function LeftBar() {
  return (
	<div className="container justify-content-between mt-3 col-2" style={{maxWidth: "180px"}}>	
				<div><h5>Menu</h5>
				<div className="mt-5">
				<i className="fa-solid fa-cart-shopping fa-lg pr-10"></i>
				Order List
				</div>
				<div className="mt-5">
					<Link to="/products" className='dropdown-usercart'>
					<i className="fa-solid fa-shoe-prints pe-3"></i>
						Product
					</Link>
			
				</div>
				</div>
			</div>
  )
}
