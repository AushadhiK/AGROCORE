import profileImg from '../images/logo.PNG';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';//use for Navigation

function Auth() {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [userData, setUserData] = useState(null);

  const handleClose = () => setShowSuccessModal(false);

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: '' });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFind = async () => {
    try {
      const response = await axios.get(`https://localhost:44345/api/Login?UserId=${formData.username}&password=${formData.password}`);
      if (response.status === 200) {
        const userData = response.data;
        setUserData(userData);
        setShowSuccessModal(true);
  
        // Store user ID in local storage
        localStorage.setItem('userId', userData.UserId);
        localStorage.setItem('userFirstName', userData.FirstName);
        localStorage.setItem('userEmail', userData.Email);
  
         
        switch (userData.AccountType) {
          case "Farmer":
            navigation("/farmer/FarmerDash");
            break;
          case "AgrarianCenter":
            navigation("/farmer/ViewProfile");
            break;
          case "Bank":
            navigation("/main");
            break;
          default:
            navigation("/main");
            break;
        }
      } else {
        setSuccessMessage('User not found. Please try again.');
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error(error);
      setSuccessMessage('Failed to fetch user data. Please try again later.');
      setShowSuccessModal(true);
    }
    // try {
    //   const response = await axios.get(`https://localhost:44345/api/Login?UserId=${formData.username}&password=${formData.password}`);
    //   if (response.status === 200) {
        
    //     if(response.data.AccountType == "Farmer")
    //     {
    //       setUserData(response.data);
    //     setShowSuccessModal(true);
    //     navigation("/farmer/FarmerDash");// "/farmer/ViewProfile"
    //     }
    //     else if(response.data.AccountType == "AgrarianCenter")
    //     {
    //       setUserData(response.data);
    //     setShowSuccessModal(true);
    //     navigation("/farmer/ViewProfile");// "/farmer/ViewProfile"
    //     }
    //     else if(response.data.AccountType == "Bank")
    //     {
    //       setUserData(response.data);
    //     setShowSuccessModal(true);
    //     navigation("/main");// "/farmer/ViewProfile"
    //     }
    //     else{ 
          
    //       setUserData(response.data);
    //     setShowSuccessModal(true);
    //     navigation("/main");
    //   }
    //   //  const token = response.data.accessToken;
    //     // Store the token in local storage
    //    // localStorage.setItem('token', token);        
        
      
       

    //   } else {
    //     setSuccessMessage('User not found. Please try again.');
    //     setShowSuccessModal(true);
    //   }
    // } catch (error) {
    //   console.error(error);
    //   setSuccessMessage('Failed to fetch user data. Please try again later.');
    //   setShowSuccessModal(true);
    // }
  };

  const handleReset = () => {
    setFormData({
      username: '',
      password: ''
    });
    setUserData(null);
    setErrors({});
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-xl-12">
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body">
              <br />
              <h5 style={{ color: "#88BDAE" }}>Find User</h5>
              <hr className="mx-n3" style={{ color: "#8BDAE", height: "3px" }}></hr>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.username}</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.password}</div>
                  </div>
                  <div className="text-center">
                    <button type="button" className="btn btn-primary me-3" onClick={handleFind}>Login</button>
                    <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-7 order-2 order-lg-1">
                  <img
                    src={profileImg}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showSuccessModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userData ? (
            <div>
              <p>Username: {userData.username}</p>
              <p>Email: {userData.email}</p>
              {/* Add more user data fields here */}
            </div>
          ) : (
            <p>{successMessage}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Auth;
