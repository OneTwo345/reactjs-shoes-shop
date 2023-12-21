import React from 'react'

export default function CartProduct({carts,handleDeleteCart,handleAddMoreCart}) {
  return (
    <>
                {carts && carts
            .map((cart) => (
            <tr key={cart.id}>
                <td style={{maxWidth: "200px"}}>
                    <div className='d-flex align-items-center'>
                        <img className='product-image' src={cart.img} alt="" />
                        <div className='d-inline'>
                            <div className='d-block fw-bolder mb-2'>{cart.title}</div>
                            <div className='badge py-2' style={{backgroundColor: "black"}}>{cart.color}</div>
                        </div>
                    </div>
                </td>
                <td className='text-end'>${cart.newPrice}</td>
                <td className='cart-quantity-wrap'>
                    <div className='cart-quantity'>
                        <span>-</span>
                        <span>{cart.quantity}</span>
                        {/* <span onClick={() => {handleAddMoreCart()}}>+</span> */}
                    </div>
                </td>
                <td className='text-end'>
                    ${cart.newPrice}
                </td>
                <div className='action-wrap'>
                    <span className='btn-remove' onClick={() => handleDeleteCart(cart)}>X</span>
                </div>
            </tr>
                ))}
    </>
  )
}
