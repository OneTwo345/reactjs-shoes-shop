import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import LeftBar from '../common/LeftBar'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { studentSchema } from '../validation/productValidation';

export default function AddProduct() {

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	  } = useForm({
		resolver: yupResolver(studentSchema),
	  });


	let navigate = useNavigate();
//   const [product, setProduct] = useState({
// 		title: "",
// 		color: "",
// 		category: "",
// 		company: "",
// 		newPrice: "",
// 		prevPrice: ""
// 	});
// 	const {
// 		title,
// 		color,
// 		category,
// 		company,
// 		newPrice,
// 		prevPrice,
// 	} = product;

	const URL = "https://json-server-vercel-shoes-shop-view.vercel.app";



	const [colors, setColors] = useState([]);
	const [companies, setCompanies] = useState([]);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		axios.get(`${URL}/colors`)
		  .then(response => {
			setColors(response.data);
		  })
		  .catch(error => {
			console.log(error);
		  });
	
		axios.get(`${URL}/categories`)
		  .then(response => {
			setCategories(response.data);
		  })
		  .catch(error => {
			console.log(error);
		  });
	
		  axios.get(`${URL}/companies`)
		  .then(response => {
			setCompanies(response.data);
		  })
		  .catch(error => {
			console.log(error);
		  });
	  }, []);
	

	// const handleInputChange = (e) => {
	// 	setProduct({
	// 		...product,
	// 		[e.target.name]: e.target.value,
	// 	});
	// };

	// const saveProduct = async (e) => {
	// 	e.preventDefault();
	// 	await axios.post(
	// 		"https://json-server-vercel-shoes-shop-view.vercel.app/products",
	// 		product
	// 	);
	// 	toast.success("Create Product Successfully",{autoClose: 1000});
	// 	navigate("/products");
	// };

	const handleCreateProduct = async (data) => {
		alert("hi")
		console.log(data);
		await axios.post(
					"http://localhost:3000/students",
					data
				);
			    toast.success("Add new Product successfully")
				navigate("/");
	  };
  return (
    <div>
      <Outlet/>
     <div className="container d-flex justify-content-between">
      <LeftBar/>
      <div className='flex-grow-1 px-2'>
          <h3>Add Product</h3>
          <div>
          <form onSubmit={handleSubmit(handleCreateProduct)}>
			<div className='row'>
			<div className=" col-lg-6">
					<label
						className="input-group-text"
						htmlFor="title">
						Title
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="title"
						id="title"
						required
						// value={title}
						{...register("title")}
						// onChange={(e) => handleInputChange(e)}
					/>
					  <span className='text-danger'>{errors?.title?.message}</span>
				</div>

				<div className=" col-lg-6">
					<label
						className="input-group-text"
						htmlFor="category">
						Category
					</label>
					<select
                  className="form-control col-sm-6"
                  name="category"
                  id="category"
                  required
                //   value={category}
				  {...register("category")}
                //   onChange={(e) => handleInputChange(e)}
                >
                  <option value="">Select a Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
			</div>
				
			<div className="row py-3">
			<div className="col-lg-6 ">
                <label
                  className="input-group-text"
                  htmlFor="color">
                  Color
                </label>
                <select
                  className="form-control col-sm-6"
                  name="color"
                  id="color"
                  required
                //   value={color}
				  {...register("color")}
                //   onChange={(e) => handleInputChange(e)}
                >
                  <option value="">Select a color</option>
                  {colors.map((color) => (
                    <option key={color.id} value={color.name}>
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>

				<div className="col-lg-6  ">
					<label
						className="input-group-text"
						htmlFor="company">
						Company
					</label>
					<select
                  className="form-control col-sm-6"
                  name="company"
                  id="company"
                  required
                //   value={company}
				  {...register("company")}
                //   onChange={(e) => handleInputChange(e)}
                >
                  <option value="">Select a company</option>
                  {companies.map((company) => (
                    <option key={company.value} value={company.name}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
			</div>

			<div className="row py-3">
			<div className="col-lg-6">
					<label
						className="input-group-text"
						htmlFor="newPrice">
						New Price
					</label>
					<input
						className="form-control col-sm-6"
						type="number"
						name="newPrice"
						id="newPrice"
						required
						// value={newPrice}
						{...register("newPrice")}
						// onChange={(e) => handleInputChange(e)}
					/>
				</div>
				<div className="col-lg-6">
					<label
						className="input-group-text"
						htmlFor="prevPrice">
						Old Price
					</label>
					<input
						className="form-control col-sm-6"
						type="number"
						name="prevPrice"
						id="prevPrice"
						required
						// value={prevPrice}
						{...register("prevPrice")}
						// onChange={(e) => handleInputChange(e)}
					/>
				</div>
				</div>
			<div className="row mb-5">
				<div className="col-sm-2">
					<button
						type="submit"
						className="btn btn-outline-success btn-lg">
						Save
					</button>
				</div>
			</div>
		</form>
		</div>
		</div>
		</div>
	</div>
  )
}
