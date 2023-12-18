import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


const ModalUpdateProduct = ({
    show, handleCloseModalUpdate,product,setCheckProduct
}) => {
	const [newProduct, setNewProduct] = useState(product)
	const [check,setCheck] =useState(true)
	// const [title, setTitle] = useState()
	// const [color, setColor] = useState()
	// const [company, setCompany] = useState()
	// const [category, setCategory] = useState()
	// const [newPrice, setNewPrice] = useState()
	// const [prevPrice, setPrev] = useState()

	setCheckProduct(check)
	const handleUpdateProduct = async (newProduct) => {
		try {
		  await axios.put(
			`https://json-server-vercel-shoes-shop-view.vercel.app/${newProduct.id}`,
			newProduct
			
		  );
		  toast.success('Edit product sucessfully',{autoClose: 1000})
		  setCheck((prev) => !prev)

		} catch (error) {
		  console.error(error);
		}

	  };

	const handleInputChange = (e) => {
		setNewProduct({
		...newProduct,
		[e.target.name]: e.target.value,
	
	  });
	  console.log(newProduct);
	};

	const [colors, setColors] = useState([]);
	const [companies, setCompanies] = useState([]);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		axios.get("https://json-server-vercel-shoes-shop-view.vercel.app/colors")
		  .then(response => {
			setColors(response.data);
		  })
		  .catch(error => {
			console.log(error);
		  });
	
		axios.get("https://json-server-vercel-shoes-shop-view.vercel.app/categories")
		  .then(response => {
			setCategories(response.data);
		  })
		  .catch(error => {
			console.log(error);
		  });
	
		axios.get("https://json-server-vercel-shoes-shop-view.vercel.app/companies")
		  .then(response => {
			setCompanies(response.data);
		  })
		  .catch(error => {
			console.log(error);
		  });
	  }, []);



    return(
        <Modal
			
        show={show}
		size="lg"
        onHide={handleCloseModalUpdate}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
		<form>

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
						defaultValue={
							 Object.keys(newProduct).length==0 ? product.title: newProduct.title
						}
						onChange={(e) => handleInputChange(e)}
					/>
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
				  defaultValue={
					Object.keys(newProduct).length==0 ? product.category: newProduct.category
			   }                  onChange={(e) => handleInputChange(e)}
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
				  defaultValue={
					Object.keys(newProduct).length==0 ? product.color: newProduct.color
			   }                  onChange={(e) => handleInputChange(e)}
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
				  defaultValue={
					Object.keys(newProduct).length==0 ? product.company: newProduct.company
			   }                  onChange={(e) => handleInputChange(e)}
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
						defaultValue={
							Object.keys(newProduct).length==0 ? product.newPrice: newProduct.newPrice
					   }						onChange={(e) => handleInputChange(e)}
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
						defaultValue={
							Object.keys(newProduct).length==0 ? product.prevPrice: newProduct.prevPrice
					   }						onChange={(e) => handleInputChange(e)}
					/>
				</div>
			</div>
				

			</form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalUpdate}>
            Close
          </Button>
		  <Button
                        variant="primary"
                        onClick={() => {
                            handleUpdateProduct(newProduct);
                            handleCloseModalUpdate();
                        }}
                    >
                        Save Changes
                    </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ModalUpdateProduct;