import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartProduct from '../cart/CartProduct';


export default function Cart() {

    const [carts,setCarts] = useState([])
    const [check,setCheck] = useState(false)

    const handleAddMoreCart = () => {

    }
   
    

    const loadingCarts = async () => {
		const carts = await axios.get(
			"https://json-server-vercel-shoes-shop-view.vercel.app/carts",
		);
			setCarts(carts.data);
	};

    const handleDeleteCart = async (cart) => {
       await axios.delete(
			`https://json-server-vercel-shoes-shop-view.vercel.app/carts/${cart.id}`
		);
        toast.warning("Xóa thành công",{autoClose: 1000})
        setCheck((prev) => !prev)
    }

    useEffect(() => {
        loadingCarts()
    },[ check])
    console.log(check);
  return (
    <div>
    <div className='row'>
        <div className='col-md-12'>
            <h3 className='py-2'>Cart Detail</h3>
        </div>
    </div>
    <div className='row'>
    <div className='col-sm-12 col-md-12 col-lg-8'>
        <table className='table cart-table'>
            <thead>
                <tr>
                    <th>Product</th>
                    <th className='text-end'>Price</th>
                    <th className='text-center'>Quantity</th>
                    <th className='text-end'>Total</th>
                    <th className='text-center'>Action</th>
                </tr>
            </thead>
        <tbody>
            <CartProduct carts={carts} handleDeleteCart={handleDeleteCart} handleAddMoreCart = {handleAddMoreCart}/>
        </tbody>
        </table>
        <div>
        <Link to="/" >Continue Shopping</Link>
        </div>  
    </div>
    <div className='col-sm-12 col-md-12 col-lg-4' style={{minWidth: "300px"}}>
        <form>
            <div className='order-summary p-3'>
                <h3 className='border-bottom py-2'>Order Summary</h3>
                <div className='d-flex flex-column'>
                    <div className='d-flex align-items-center justify-content-between py-2'>
                        <span>Subtotal</span>
                        <span className='fw-bolder'>$150</span>
                    </div>
                    <div className='d-flex align-items-center justify-content-between py-2'>
                        <span>Shipping</span>
                        <span className='fw-bolder'>Free</span>
                    </div>
                </div>
                <div className='d-flex align-items-center justify-content-between border-top mt-2 py-2'>
                    <span className='fs-6'>Total</span>
                    <span className='fw-bolder fs-6'>$150</span>
                </div>
            </div>
            <div className='customer-info p-3'>
                <h3 className='border-bottom py-2'>Customer Info</h3>
                <div className='form-group mb-3'>
                    <label className='form-label'>Fullname</label>
                    <input type="text" className='form-control' placeholder='Fullname' name='fullname' />
                    <span className='invalid-feedback'></span>
                </div>
                <div className='form-group mb-3'>
                    <label className='form-label'>Address</label>
                    <input type="text" className='form-control ' placeholder='Address' name='address'/>
                    <span className='invalid-feedback'></span>
                </div>
                <div className='form-group mb-3'>
                    <label className='form-label'>Email</label>
                    <input type="text" className='form-control ' placeholder='Email' name='email'/>
                    <span className='invalid-feedback'></span>
                </div>
                <div className='form-group mb-3'>
                    <label className='form-label'>Mobile</label>
                    <input type="text" className='form-control ' placeholder='Mobile' name='mobile'/>
                    <span className='invalid-feedback'></span>
                </div>
            </div>
            <div className='py-3 bg-success mt-2 d-flex align-items-center justify-content-center text-white btn-checkout'>
                <button className='btn btn-block' type='submit'> CHECKOUT</button>
            </div>
        </form>
    </div>
    </div>
    </div>
  )
}
