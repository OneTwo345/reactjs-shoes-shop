import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

// export default function Card(props) {

//   const [cartItems, setCartItems] = useState([]);
//   const handleAddToCart = (product) => {
//     setCartItems((prevItems) => [...prevItems, product]);
//     console.log(cartItems);
//     toast.success('Add to cart',{autoClose: 1000})
//   };
//     const product = props.data;
//     return (
//         <div className="col-md-3 mb-4 ">
//     <div className="card d-flex align-items-center pt-2">
//       <img src={product.img} className="card-image-top" alt="" style={{width: "70%"}}/>
//       <div className="card-body">
//         <p className="fw-bolder">{product.title}</p>
//         <div className="d-flex align-items-center mb-">{props.star}
//           <div className="me-1">
//             <div className="fs-10">
//               <h6>({product.reviews} reviewer ) </h6>
//             </div>
//           </div>  
//         </div>
//         <div className="d-flex align-items-center justify-content-between">
//           <div>
//             <del className="line-through me-2">{product.prevPrice}</del>
//             <span>{product.newPrice}</span>
//           </div>
//           <button className="icon-button" onClick={() => handleAddToCart(product)}>
//             <i className="fa-solid fa-cart-arrow-down fa-lg"></i>
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
//     );
// }


export default function Card(props) {
  const handleAddToCart = (product) => {
    // const checkId = product.find(e => e.id==cart)
   const cart = {
    category: product.category,
    color: product.color,
    company: product.company,
    img: product.img,
    newPrice: product.newPrice,
    prevPrice: product.prevPrice,
    title: product.title,
    quantity: 1
   }
  // checkId? (cart.quantity +1) : cart.quantity = 1
    axios.post(
    "https://json-server-vercel-shoes-shop-view.vercel.app/carts",
    cart
  );
   

    toast.success("Create Product Successfully",{autoClose: 1000});
  };

 

  const product = props.data;

  return (
    <div className="col-md-3 mb-4 ">
      <div className="card d-flex align-items-center pt-2">
        <img src={product.img} className="card-image-top" alt="" style={{ width: "70%" }} />
        <div className="card-body">
          <p className="fw-bolder">{product.title}</p>
          <div className="d-flex align-items-center mb-">{props.star}
            <div className="me-1">
              <div className="fs-10">
                <h6>({product.reviews} reviewer ) </h6>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <del className="line-through me-2">{product.prevPrice}</del>
              <span>{product.newPrice}</span>
            </div>
            <button className="icon-button" onClick={() => handleAddToCart(product)}>
              <i className="fa-solid fa-cart-arrow-down fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

