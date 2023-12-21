import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function CreateCustomer() {

    const [customer, setCustomer] = useState({
		fullName: "",
		email: "",
		phone: "",
		address: "",
        balance: 0
	});
	const {
		fullName,
		email,
		phone,
		address,
	} = customer;
   

	let navigate = useNavigate();

    const handleInputChange = (e) => {
		setCustomer({
			...customer,
			[e.target.name]: e.target.value,
		});
	};
	const saveCustomer = async (e) => {
		e.preventDefault();
		await axios.post(
			"http://localhost:3000/customers",
			customer
		);
        toast.success("Thêm mới khách hàng thành công")
		navigate("/");
	};
  return (
    <div>
         <header>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand">Create Customer</a>
                    <div className="d-flex" style={{gap: "10px"}}>
                        <button type="button" className="btn btn-outline-light" >
                            
                            <Link
                                to={`/`}
                                style={{textDecoration: "none", color:"white"}}
                                >
                                    
                                    <i className="far fa-plus-square"></i>
                           List of customer
							</Link>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
        <form onSubmit={(e) => saveCustomer(e)}>
                <div className="row mb-3 mt-3">
                    <div className="col-lg-6">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input type="text" name="fullName" className="form-control" id="fullName"
                        	required
                        	value={fullName}
                            onChange={(e) => handleInputChange(e)}
                        />
                        
          
                    </div>
    
                    <div className="col-lg-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" id="email"
                        	required
                        	value={email}
                            onChange={(e) => handleInputChange(e)}
                        />
     
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="tel" name="phone" className="form-control" id="phone"
                        	required
                        	value={phone}
                            onChange={(e) => handleInputChange(e)}
                        />

                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" name="address" className="form-control" id="address"
                        	required
                        	value={address}
                            onChange={(e) => handleInputChange(e)}
                        />

                    </div>
                </div>
                     <button type="submit" className="btn btn-outline-success" id="btnCreate">
                        <i className="fas fa-plus"></i>
                        Create
                    </button>
            </form>
    </div>
  )
}
