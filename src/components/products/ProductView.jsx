import React, {
	useEffect,
	useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../common/Search";
import LeftBar from "../common/LeftBar";
import Button from 'react-bootstrap/Button';
import ModalUpdateProduct from "./ModalUpdateProduct"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";


const ProductView = () => {
	const [showModalUpdate,setShowModalUpdate] = useState(false)
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState({});
	const [search, setSearch] = useState("");
	const [checkProduct,setCheckProduct] = useState(true)



	useEffect(() => {
		loadProducts();
	}, [checkProduct]);

	let navigate = useNavigate()

	const findById = (id) =>{
		return products.find((item) => item.id === id)
	}

	const loadProducts = async () => {
		const products = await axios.get(
			"https://json-server-vercel-shoes-shop-view.vercel.app/products",
		);
			setProducts(products.data);
	};

	const handleShowModelUpdate = (id) => {
		const product = findById(id)
		if (Object.keys(product).length){
			setProduct(product)
			setShowModalUpdate(true)
		}else{
			alert('Sorry, no product with ID = '+id)
		}
		
	}

	const handleCloseModalUpdate = () => {
		setShowModalUpdate(false)
	}
	
	const handleDelete = async (id) => {
		try {
			await axios.delete(`https://json-server-vercel-shoes-shop-view.vercel.app/products/${id}`);
			loadProducts();
			navigate("/products");
			toast.success("Product deleted successfully!",{autoClose: 1000});
		} catch (error) {
			
		}
	};
	return (
		<div className="container d-flex justify-content-between">	
			<LeftBar/>
			<section className="mt-3 col-10">
				<div className="container d-flex justify-content-between">
					<div>	
						<Search
							search={search}
							setSearch={setSearch}
					/>
					</div>
						<div>
						<button style={{ backgroundColor: '#ffc107' }}>
							<Link to="/add-product" className="dropdown-usercart" >Add New Product</Link>
						</button>
						</div>
					</div>
		
			<table className="table table-bordered table-hover shadow">
				<thead className="bg-blue">
					<tr className="text-center">
						<th>#</th>
						<th>Title</th>
						<th>Color</th>
						<th>Category</th>
						<th>Company</th>
						<th>New Price</th>
						<th>Old Price</th>
						<th colSpan="3">Actions</th>
					</tr>
				</thead>

				<tbody className="text-center">
					{products && products
						.filter((product) =>
						product.title
								.toLowerCase()
								.includes(search)
						)
						.map((product, index) => (
							<tr key={product.id}>
								<th scope="row" key={index}>
									{index + 1}
								</th>
								<td><img src={product.img} style={{maxWidth: "100px", maxHeight: "80px",minHeight:"60px"}}/> {product.title}</td>
								<td>{product.color}</td>
								<td>{product.category}</td>
								<td>{product.company}</td>
								<td>{product.newPrice}</td>
								<td>{product.prevPrice}</td>
								<td className="mx-2">
									<Button variant="primary" onClick={() => handleShowModelUpdate(product.id)}>
										<i className="fa-solid fa-pen"></i>
									</Button>
								</td>
								<td className="mx-2">
									<Link
										to={`/`}s
										className="btn btn-danger"
										onClick={() => handleDelete(product.id)}
										>
											
											<i className="fa-solid fa-trash-can"></i>
									</Link>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			<ToastContainer />
	  <ModalUpdateProduct
	  	show = {showModalUpdate}
		handleCloseModalUpdate = {handleCloseModalUpdate}
		product = {product}
		setCheckProduct ={setCheckProduct}
	  />
		</section>
		</div>
	);
};

export default ProductView;
