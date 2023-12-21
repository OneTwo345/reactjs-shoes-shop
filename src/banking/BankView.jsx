import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function BankView() {

    const [customers, setCustomers] = useState([]);
	const [customer, setCustomer] = useState({});
	const [checkCustomer,setCheckCustomer] = useState(true)

  useEffect(() => {
		loadCustomers();
	}, [checkCustomer]);

	let navigate = useNavigate()

  


	const loadCustomers = async () => {
		const customers = await axios.get(
			"http://localhost:3000/customers",
		);
        console.log(
            customers.data
        );
			setCustomers(customers.data);

    }

    const handleDelete = async (id) => {
        console.log(id);
		try {
            await axios.delete(`http://localhost:3000/customers/${id}`);
			loadCustomers();
			navigate("/");
			toast.success("Xoá khách hàng thành công",{autoClose: 1000});
		} catch (error) {
			
		}
	};
  

  return (
    <div>
       <div className="container">
        <header>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand">List of customers</a>
                    <div className="d-flex" style={{gap: "10px"}}>
                        <button className="btn btn-outline-light" type="button">

                            <i className="fas fa-history"></i>
                            Transfer histories
                        </button>
                        <button type="button" className="btn btn-outline-light" >
                            
                            <Link
                                style={{textDecoration: "none", color:"white"}}
                                to={`/add-customer`}
                                >
                                    
                                    <i className="far fa-plus-square"></i>
                            Add new customer
							</Link>
                        </button>
                    </div>
                </div>
            </nav>
        </header>

        <div className="content">
            <table id="tbCustomer" className="table table-hover">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>FullName</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Balance</th>
                        <th colSpan="5" style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customers && customers
                     .map((customer) => (
                        <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.fullName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.address}</td>
                    <td>{customer.balance}</td>
                    <td>
                        <button title = "Edit" className="btn btn-outline-secondary edit" >
                        <Link
                                to={`/edit-customer/${customer.id}`}
                               
                                >
                                    <i className="fas fa-user-edit"></i>
							</Link>
                            
                        </button>
                    </td>
                    <td>
                        <button title = "Deposit" className="btn btn-outline-success deposit">
                        <Link
                              to={`/deposit/${customer.id}`}
                            >
                            <i className="fas fa-plus"></i>
                            </Link>
                           
                        </button>
                    </td>
                    <td>
                        <button title = "Withdraw" className="btn btn-outline-warning withdraw">
                            {/* <i className="fas fa-minus"></i> */}
                            <Link
                              to={`/withdraw/${customer.id}`}
                            >
                         <i className="fas fa-minus"></i>
                            </Link>
                        </button>
                    </td>
                    <td>
                        <button className="btn btn-outline-primary transfer">
                            {/* <i className="fas fa-exchange-alt"></i> */}
                            <Link
                              to={`/transfer/${customer.id}`}
                            >
                            <i className="fas fa-exchange-alt"></i>
                            </Link>
                        </button>
                        </td>
                    <td>
                        <button title = "Delete" className="btn btn-outline-danger delete">
                            {/* <i className="fas fa-user-slash"></i> */}
                            <Link
                                 to={`/delete-customer/${customer.id}`}
                                className="btn btn-danger"
                              
                                > 
                                    <i className="fa-solid fa-ban"></i>
							</Link>
                        </button>
                    </td>
                </tr>
                     ))}
                
                </tbody>
            </table>

        </div>
    </div>

    </div>
  )
}
