import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';


export default function TransferMoney() {
    let navigate = useNavigate();
    const [customers, setCustomers] = useState([])
    const [totalAmount, setTotalAmount] = useState("");
    const [sender, setSender] = useState(null);

  const { id } = useParams();

  const [customer, setCustomer] = useState({
        
         fullName: "",
		email: "",
		phone: "",
		address: "",
        balance: ""
       
  });
  const { fullName, email, phone, address,balance } = customer;

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    console.log(id);
    const result =await axios.get(`http://localhost:3000/customers/${id}`);
 
    setCustomer(result.data);
  };

  const handleInputChange = (e) => {
    if (e.target.name === "transaction") {
      setCustomer({
        ...customer,
        [e.target.name]: e.target.value,
      });
  
      const transactionAmount = +(e.target.value);
      const total = parseFloat(transactionAmount + (+(transactionAmount * 0.1)));
      setTotalAmount(total);
    } else {
      setCustomer({
        ...customer,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleTransfer = async (e) => {
    e.preventDefault();
    
    await axios.put(`http://localhost:3000/customers/${id}`, customer);
    toast.success("Chuyển tiền thành công")
    navigate("/");
  };

  const URL = "http://localhost:3000/customers";
  useEffect(() => {
    axios.get(`${URL}`)
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.log(error);
      })
    }, []);
  

  return (
    <div>
         <header>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand">Transfer Money</a>
                    <div className="d-flex" style={{gap: "10px"}}>
                        <button type="button" className="btn btn-outline-light" >
                            
                            <Link
                             style={{textDecoration: "none", color:"white"}}
                                to={`/`}
                                >
                                    
                                    <i className="far fa-plus-square"></i>
                           List of customer
							</Link>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
        <form onSubmit={(e) => handleTransfer(e)} >
                <div className="row mb-3 mt-3">
                <div className="col-lg-3">
                        <label htmlFor="id" className="form-label">Sender ID</label>
                        <input type="text" name="id" className="form-control" id="id"
                        	required
                        	defaultValue={id}
                            onChange={(e) => handleInputChange(e)}
                        />
                        
          
                    </div>
                    <div className="col-lg-3">
                        <label htmlFor="fullName" className="form-label">Sender Name</label>
                        <input type="text" name="fullName" className="form-control" id="fullName"
                        	required
                        	defaultValue={fullName}
                            onChange={(e) => handleInputChange(e)}
                        />
                        
          
                    </div>
    
                    <div className="col-lg-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" id="email"
                        	required
                        	defaultValue={email}
                            onChange={(e) => handleInputChange(e)}
                        />
     
                    </div>
                    <div className="col-lg-3">
                        <label htmlFor="balance" className="form-label">Balance</label>
                        <input type="balance" name="balance" className="form-control" id="balance"
                        	required
                        	defaultValue={balance}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                <div className="col-lg-3">
                        <label htmlFor="id" className="form-label">Reciptent Name</label>
                        <select
                  className="form-control col-sm-6"
                  name="customer"
                  id="customer"
                  required
                  defaultValue={customers}
				
                //   onChange={(e) => handleInputChange(e)}
                >
                  <option defaultValue="">Select a Reciptent</option>
                  {customers.map((customer) => (
                    <option key={customer.id} defaultValue={customer.fullName}>
                      {customer.fullName}
                    </option>
                  ))}
                </select>
                        
                        
          
                    </div>
                    <div className="col-lg-3">
                        <label htmlFor="transaction" className="form-label">Transaction Amount</label>
                        <input type="text" name="transaction" className="form-control" id="transaction"
                        	required
                            onChange={(e) => handleInputChange(e)}
                            value={customer.transaction}
                            
                        />
                        
          
                    </div>  
    
                    <div className="col-lg-3">
                        <label htmlFor="fee" className="form-label">Fees</label>
                        <input type="fee" name="fee" className="form-control" id="fee"
                        	required
                            onChange={(e) => handleInputChange(e)}
                            defaultValue={10}
                        />
     
                    </div>
                    <div className="col-lg-3">
                        <label htmlFor="balance" className="form-label">Total Amount</label>
                        <input type="balance" name="balance" className="form-control" id="balance"
                            value={totalAmount}
                            readOnly
                        />
                    </div>
                </div>
                     <button type="submit" className="btn btn-outline-success" id="btnCreate">
                        <i className="fas fa-plus"></i>
                     Transfer
                    </button>
            </form>
    </div>
  )
}

