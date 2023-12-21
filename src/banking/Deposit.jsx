
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Deposit() {
    const [transactionError, setTransactionError] = useState("");
    const [formError, setFormError] = useState(false);

    const [transaction, setTransaction] = useState("");
    let navigate = useNavigate();

  const { id } = useParams();

  const [customer, setCustomer] = useState({
         fullName: "",
		balance: ""
  });
  const { fullName, balance } = customer;

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    console.log(id);
    const result =await axios.get(`http://localhost:3000/customers/${id}`);
 
    setCustomer(result.data);
  };

//   const handleInputChange = (e) => {
//     if (e.target.name === "transaction") {
//       setTransaction(e.target.value);
//     } else {
//       setCustomer({
//         ...customer,
//         [e.target.name]: e.target.value,
//       });
//     }
//   };

const handleInputChange = (e) => {
    if (e.target.name === "transaction") {
      const value = e.target.value;
      setTransaction(value);
  
      if (parseFloat(value) < 0) {
        setTransactionError("Transaction amount cannot be negative.");
        setFormError(true); 
      } else {
        setTransactionError("");
        setFormError(false); 
      }
    } else {
      setCustomer({
        ...customer,
        [e.target.name]: e.target.value,
      });
    }
  };

  const depositCustomer = async (e) => {
    e.preventDefault();
  
    const newBalance = parseFloat(balance) + parseFloat(transaction);
    const updatedCustomer = {
      ...customer,
      balance: newBalance.toString(),
    };
  
    await axios.put(`http://localhost:3000/customers/${id}`, updatedCustomer);
    toast.success("Thêm tiền khách hàng thành công");
    navigate("/");
  };

  return (
    <div>
         <header>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand">Deposit Money</a>
                    <div className="d-flex" style={{gap: "10px"}}>
                        <button type="button" className="btn btn-outline-light" >
                            
                            <Link
                             style={{textDecoration: "none", color:"white"}}
                                to={`/`}
                                >
                                    <i className="far fa-plus-square"></i>
                           Customer List
							</Link>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
        <form onSubmit={(e) => depositCustomer(e)} >
                <div className="row mb-3 mt-3">
                    <div className="col-lg-6">
                        <label htmlFor="id" className="form-label">Customer ID</label>
                        <input type="text" name="email" className="form-control" id="email"
                        	required
                            readOnly
                        	value={id}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>

                    <div className="col-lg-6">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input type="text" name="fullName" className="form-control" id="fullName"
                        	required
                        	value={fullName}
                            onChange={(e) => handleInputChange(e)}
                            readOnly
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label htmlFor="balance" className="form-label">Current Balance</label>
                        <input type="tel" name="balance" className="form-control" id="balance"
                        	required
                        	value={balance}
                            onChange={(e) => handleInputChange(e)}
                        />

                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="transaction" className="form-label">Transaction Amount</label>
                        <input type="text" name="transaction" className="form-control" id="transaction"

                            
                        	required
                            value={transaction}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    {transactionError && <p className="text-danger">{transactionError}</p>}
                </div>
                     <button type="submit" className="btn btn-outline-success" id="btnCreate"  disabled={formError}>
                        <i className="fas fa-plus"></i>
                      Save Changes
                    </button>
            </form>
    </div>
  )
}
