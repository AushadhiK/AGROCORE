
import React, { useState,  useEffect } from 'react';
 
import "./Registration.css";
import { Button ,Modal } from "react-bootstrap";
import { registrationSchema } from "./RegistrationSchema";
import profileImg from '../images/logo.PNG';
import axios from 'axios';
 

function Registration() {
  const [formData, setFormData] = useState({
    userId: '',
    accountType: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });



  const [token, setToken] = useState('');

  useEffect(() => {
    // Retrieve token from local storage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleCloseSuccessModal = () => setShowSuccessModal(false);
  const handleCloseErrorModal = () => setShowErrorModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };


        const response = await axios.post('https://localhost:44345/api/userAccount', formData, config);
        //console.log(response.data);
        if (response.status === 201) {

          setSuccessMessage('Account created successfully! User ID: ' +response.data.UserId);
          setShowSuccessModal(true);
          clearFormData();
        } else {
          setSuccessMessage('Please check data and status!');
          setShowSuccessModal(true);
          clearFormData();
        }
        // Only set the success message if the request was successful
       
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
        setShowErrorModal(true);
      }
    }
  };

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: '' });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    clearFormData();
    setErrors({});
  };

  // clear form data 
  const clearFormData = () => {
    setFormData({
      userId: '',
      accountType: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

     if (!formData.userId) {
       errors.userId = 'User ID is required.';
       isValid = false;
     }

    if (!formData.firstName) {
      errors.firstName = 'First Name is required.';
      isValid = false;
    }

    // if (!formData.lastName) {
    //   errors.lastName = 'Last Name is required.';
    //   isValid = false;
    // }

    if (!formData.password) {
      errors.password = 'Password is required.';
      isValid = false;
    }

    if ( formData.password.length <8) {
      errors.password = 'Length should be less than or equal to 8.';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    if (!formData.accountType) { // Check if accountType is empty
      errors.accountType = 'Account Type is required.';
      isValid = false;
    }

    // if (!formData.email) {
    //   errors.email = 'Email is required.';
    //   isValid = false;
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   errors.email = 'Email is invalid.';
    //   isValid = false;
    // }

    if (formData.email) {
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is invalid.';
        isValid = false;
      }
    }  

    setErrors(errors);
    return isValid;
  };

  return (
    <div className="container">   
      <div class="row">
        <div class="col-1"> </div>
          <div class="col-10">
            <div class="card text-black" style={{ borderRadius: "25px" }}>
              <div class="card-body p-md-5">                
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p class="text-center h1 fw-bold mb-5 mt-4">Create Account</p>
                    {/* Added form fields */}
                      <form onSubmit={handleSubmit}>

                          {/* Add dropdown for accountType */}
                          <div className="mb-3">
                        <label htmlFor="accountType" className="form-label">Account Type</label>
                        <select className={`form-control ${errors.accountType ? 'is-invalid' : ''}`} id="accountType" name="accountType" value={formData.accountType} onChange={handleChange}>
                          <option value="">Select Account Type</option>
                          <option value="AgrarianCenter">AgrarianCenter</option>
                          <option value="Farmer">Farmer</option>
                          <option value="Bank">Bank</option>
                          <option value="Guest">Guest</option>
                        </select>
                        <div className="invalid-feedback">{errors.accountType}</div>
                      </div>

                        <div className="mb-3" >
                          <label htmlFor="userId" className="form-label">User ID</label>
                          <input type="text" className={`form-control text-uppercase ${errors.userId ? 'is-invalid' : ''}`} id="userId" name="userId" value={formData.userId} onChange={handleChange} />
                          <div className="invalid-feedback">{errors.userId}</div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="firstName" className="form-label">First Name</label>
                          <input type="text" className={`form-control text-uppercase ${errors.firstName ? 'is-invalid' : ''}`} id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                          <div className="invalid-feedback">{errors.firstName}</div>
                        </div>

                        {/* <div className="mb-3">
                          <label htmlFor="lastName" className="form-label">Last Name</label>
                          <input type="text" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                          <div className="invalid-feedback">{errors.lastName}</div>
                        </div> */}

                        <div className="mb-3">
                          <label htmlFor="lastName" className="form-label">Last Name</label>
                          <input type="text" className={`form-control text-uppercase`}  id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                          {/* Remove the invalid feedback */}
                        </div>

                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email</label>
                          <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" name="email" value={formData.email} onChange={handleChange} />
                          <div className="invalid-feedback">{errors.email}</div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">Password</label>
                          <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" name="password" value={formData.password} onChange={handleChange} />
                          <div className="invalid-feedback">{errors.password}</div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                          <input type="password" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                          <div className="invalid-feedback">{errors.confirmPassword}</div>
                        </div>
                        
                        {/* Add other form fields */}
                        <div className="col text-right actionButtons">
                          <button type="submit" className="btn btn-success">Submit</button>
                          <Button variant="primary" onClick={handleReset}>Reset</Button>
                        </div>
                       
                        <p className="text-center mt-3">Already have an account? <a href="/login">Login</a></p>

                        
                      </form>
                    {/* end of form */}
                  </div>                
                  <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img    
                     src={profileImg} 
                      class="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-1"> </div>
        </div>
        {/* add modal */}         

        <Modal show={showSuccessModal} onHide={handleCloseSuccessModal } centered>
          <Modal.Header closeButton>
          <Modal.Title className="text-success">Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p className="text-center">{successMessage}</p>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="danger" onClick={handleCloseSuccessModal }>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showErrorModal} onHide={handleCloseErrorModal } centered>
          <Modal.Header closeButton>
          <Modal.Title className="text-dang">Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p className="text-center">{errorMessage}</p>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="danger" onClick={handleCloseErrorModal }>Close</Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
}


export default Registration;
