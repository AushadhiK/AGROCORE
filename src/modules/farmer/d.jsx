import React, { useState, useEffect } from 'react';
import { Button, Modal } from "react-bootstrap";
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

function LoanRequest() {
  const [formData, setFormData] = useState({
    RequestID: '',
    FullName: '',
    Email: '',
    MobileNumber: '',
    District: '',
    PostalCode: '',
    Address1: '',
    Address2: '',
    FarmerRegNo: '', // Initially empty
    NIC: '',
    NeaestAgrarianServiceCenter: '',
    MicroFinanceCompany: '',
    Branch: '',
    DisiredLoanAmount: '',
    AnnualIncome: '',
    GrossMonthIncome: '',
    ProjectLocation: '',
    CropType: '',
    ExpectedComencementDate: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [token, setToken] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      setFormData(prevData => ({
        ...prevData,
        FarmerRegNo: storedUserId // Set the FarmerRegNo field
      }));
      console.log('User ID:', storedUserId);
    } else {
      console.error('No user ID found in local storage');
    }
  }, []);

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // }, []);

  const handleClose = () => setShowSuccessModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.post('https://localhost:44345/api/loanRequest', formData, config);
        if (response.status === 201) {
          setSuccessMessage('Loan request created successfully! Request ID: ' + response.data.RequestID);
          setShowSuccessModal(true);
          clearFormData();
        } else {
          setSuccessMessage('Please check data and status!');
          setShowSuccessModal(true);
          clearFormData();
        }
      } catch (error) {
        console.error(error);
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

  const clearFormData = () => {
    setFormData({
      RequestID: '',
      FullName: '',
      Email: '',
      MobileNumber: '',
      District: '',
      PostalCode: '',
      Address1: '',
      Address2: '',
      FarmerRegNo: userId, // Reset to stored user ID
      NIC: '',
      NeaestAgrarianServiceCenter: '',
      MicroFinanceCompany: '',
      Branch: '',
      DisiredLoanAmount: '',
      AnnualIncome: '',
      GrossMonthIncome: '',
      ProjectLocation: '',
      CropType: '',
      ExpectedComencementDate: '',
    });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.FarmerRegNo) {
      errors.FarmerRegNo = 'Farmer Registration Number is required.';
      isValid = false;
    }

    if (!formData.NIC) {
      errors.NIC = 'NIC is required.';
      isValid = false;
    }

    if (!formData.NeaestAgrarianServiceCenter) {
      errors.NeaestAgrarianServiceCenter = 'Nearest Agrarian Service Center is required.';
      isValid = false;
    }

    if (!formData.MicroFinanceCompany) {
      errors.MicroFinanceCompany = 'Micro Finance Company is required.';
      isValid = false;
    }

    if (!formData.Branch) {
      errors.Branch = 'Branch is required.';
      isValid = false;
    }

    if (!formData.DisiredLoanAmount) {
      errors.DisiredLoanAmount = 'Desired Loan Amount is required.';
      isValid = false;
    }

    if (!formData.AnnualIncome) {
      errors.AnnualIncome = 'Annual Income is required.';
      isValid = false;
    }

    if (!formData.GrossMonthIncome) {
      errors.GrossMonthIncome = 'Gross Monthly Income is required.';
      isValid = false;
    }

    if (!formData.ProjectLocation) {
      errors.ProjectLocation = 'Project Location is required.';
      isValid = false;
    }

    if (!formData.CropType) {
      errors.CropType = 'Crop Type is required.';
      isValid = false;
    }

    if (!formData.ExpectedComencementDate) {
      errors.ExpectedComencementDate = 'Expected Commencement Date is required.';
      isValid = false;
    }

    if (!formData.FullName) {
      errors.FullName = ' Name is required.';
      isValid = false;
    }

    if (!formData.District) {
      errors.District = ' District is required.';
      isValid = false;
    }

    if (!formData.MobileNumber) {
      errors.MobileNumber = ' MobileNumber is required.';
      isValid = false;
    }
    // Add validations for other fields similarly

    setErrors(errors);
    return isValid;
  };

  const handleSearch = async (values) => {
    try {
      if (!values.FarmerRegNo) {
        setModalMessage('Please enter your registration number!');
        setShowModal(true);
        return;
      }
      // FarmerRegNo
      //const response = await axios.get(`https://localhost:44345/api/loanRequest/2`);
      const response = await axios.get(`https://localhost:44345/api/farmer/${values.FarmerRegNo}`);

      const data = response.data;

      // Set the form data fields with the retrieved data
      setFormData({
        ...formData,
        FullName: data.FullName,
        Email: data.Email,
        MobileNumber: data.MobileNumber,
        District: data.District,
        PostalCode: data.PostalCode,
        Address1: data.Address1,
        Address2: data.Address2
        // Add other fields as needed
      });

    } catch (error) {
      if (error.response && error.response.data && error.response.data.title === "Not Found") {
        setModalMessage('No data found for this code! Please try again.');
        setShowModal(true);
      } else {
        //console.error('Error fetching agrarian center data:', error);
        setModalMessage('Invalid! Please try again.', error);
        setShowModal(true);
      }
    }
  };

  return (
    <main id="main" className="main">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-xl-12">
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body">
              <br />
              <h5 style={{ color: "#88BDAE" }}> Loan Request</h5>
              <hr className="mx-n3" style={{ color: "#8BDAE", height: "3px" }}></hr>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="FarmerRegNo" className="form-label">Farmer Registration Number</label>
                      <div className="input-group">
                        <input 
                          type="text" className={`form-control ${errors.FarmerRegNo ? 'is-invalid' : ''}`}  id="FarmerRegNo"  name="FarmerRegNo" value={formData.FarmerRegNo} onChange={handleChange} />
                        <button type="button" className="btn btn-info text-uppercase" onClick={() => handleSearch(formData)}>
                          <FaSearch />
                        </button>
                      </div>
                      <div className="invalid-feedback">{errors.FarmerRegNo}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="NIC" className="form-label">NIC</label>
                      <input type="text" className={`form-control ${errors.NIC ? 'is-invalid' : ''}`} id="NIC" name="NIC" value={formData.NIC} onChange={handleChange} />
                      <div className="invalid-feedback">{errors.NIC}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="NeaestAgrarianServiceCenter" className="form-label">Nearest Agrarian Service Center</label>
                      <input type="text" className={`form-control ${errors.NeaestAgrarianServiceCenter ? 'is-invalid' : ''}`} id="NeaestAgrarianServiceCenter" name="NeaestAgrarianServiceCenter" value={formData.NeaestAgrarianServiceCenter} onChange={handleChange} />
                      <div className="invalid-feedback">{errors.NeaestAgrarianServiceCenter}</div>
                    </div>
                  </div>
                </div>

                {/* Add other form fields similarly */}
                
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="FullName" className="form-label">Full Name</label>
                      <input type="text" className={`form-control ${errors.FullName ? 'is-invalid' : ''}`} id="FullName" name="FullName" value={formData.FullName} onChange={handleChange} />
                      <div className="invalid-feedback">{errors.FullName}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="District" className="form-label">District</label>
                      <input type="text" className={`form-control ${errors.District ? 'is-invalid' : ''}`} id="District" name="District" value={formData.District} onChange={handleChange} />
                      <div className="invalid-feedback">{errors.District}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="MobileNumber" className="form-label">Mobile Number</label>
                      <input type="text" className={`form-control ${errors.MobileNumber ? 'is-invalid' : ''}`} id="MobileNumber" name="MobileNumber" value={formData.MobileNumber} onChange={handleChange} />
                      <div className="invalid-feedback">{errors.MobileNumber}</div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button variant="primary" type="submit">Submit</Button>
                  <Button variant="secondary" type="button" onClick={handleReset}>Reset</Button>
                </div>
              </form>

              <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>{successMessage}</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
              </Modal>

              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoanRequest;
