import React from 'react'

export default function CartProduct() {
  return (
    <div>
                <tr >
                <td style={{maxWidth: "200px"}}>
                    <div className='d-flex align-items-center'>
                        <img className='product-image' src="" alt="" />
                        <div className='d-inline'>
                            <div className='d-block fw-bolder mb-2'>Wedding Prom Bridal</div>
                            <div className='badge py-2' style={{backgroundColor: "black"}}>Black</div>
                        </div>
                    </div>
                </td>
                <td className='text-end'>$150</td>
                <td className='cart-quantity-wrap'>
                    <div className='cart-quantity'>
                        <span>-</span>
                        <span>1</span>
                        <span>+</span>
                    </div>
                </td>
                <td className='text-end'>
                    $150
                </td>
                <div className='action-wrap'>
                    <span className='btn-remove'>X</span>
                </div>

            </tr>
    </div>
  )
}
