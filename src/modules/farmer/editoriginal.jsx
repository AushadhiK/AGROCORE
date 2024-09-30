import React, { useState, useEffect } from 'react';
import { Button, Modal } from "react-bootstrap";
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

function LoanRequest() {
  const [formData, setFormData] = useState({
    RequestID:'',
    FullName: '',
    Email: '',
    MobileNumber: '',
    District: '',
    PostalCode: '',
    Address1: '',
    Address2: '',
    FarmerRegNo: storedUserId,
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
      RequestID:'',
      FullName: '',
      Email: '',
      MobileNumber: '',
      District: '',
      PostalCode: '',
      Address1: '',
      Address2: '', 
      FarmerRegNo: '',
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
  //FarmerRegNo
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
                      <input type="text" className={`form-control ${errors.NIC ? 'is-invalid' : ''}`} id="NIC" name="NIC" value={formData.NIC} onChange={handleChange}    />
                      <div className="invalid-feedback">{errors.NIC}</div>
                    </div>
                  </div> 
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="Email" className="form-label">Email</label>
                      <input type="email" className={`form-control ${errors.Email ? 'is-invalid' : ''}`} id="Email" name="Email" value={formData.Email} onChange={handleChange} disabled />
                      <div className="invalid-feedback">{errors.Email}</div>
                    </div>
                  </div>   
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="Address1" className="form-label">Address Line 1</label>
                      <input type="text" className={`form-control ${errors.Address1 ? 'is-invalid' : ''}`} id="Address1" name="Address1" value={formData.Address1} onChange={handleChange} disabled />
                      <div className="invalid-feedback">{errors.Address1}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="Address2" className="form-label">Address Line 2</label>
                      <input type="text" className={`form-control ${errors.Address2 ? 'is-invalid' : ''}`} id="Address2" name="Address2" value={formData.Address2} onChange={handleChange} disabled />
                      <div className="invalid-feedback">{errors.Address2}</div>
                    </div>
                  </div>                          
                </div>
                <div className="row">    
                  <div className="mb-3">
                    <label htmlFor="FullName" className="form-label">Full Name</label>
                    <input type="text" className={`form-control ${errors.FullName ? 'is-invalid' : ''}`} id="FullName" name="FullName" value={formData.FullName} onChange={handleChange} disabled />
                    <div className="invalid-feedback">{errors.FullName}</div>
                  </div>      
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="MobileNumber" className="form-label">Mobile Number</label>
                      <input type="text" className={`form-control ${errors.MobileNumber ? 'is-invalid' : ''}`} id="MobileNumber" name="MobileNumber" value={formData.MobileNumber} onChange={handleChange} disabled />
                      <div className="invalid-feedback">{errors.MobileNumber}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="District" className="form-label">District</label>
                      <input type="text" className={`form-control ${errors.District ? 'is-invalid' : ''}`} id="District" name="District" value={formData.District} onChange={handleChange} disabled />
                      <div className="invalid-feedback">{errors.District}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="PostalCode" className="form-label">Postal Code</label>
                      <input type="text" className={`form-control ${errors.PostalCode ? 'is-invalid' : ''}`} id="PostalCode" name="PostalCode" value={formData.PostalCode} onChange={handleChange} disabled />
                      <div className="invalid-feedback">{errors.PostalCode}</div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="NeaestAgrarianServiceCenter" className="form-label">Nearest Agrarian Service Center</label>
                      <input type="text" className={`form-control ${errors.NeaestAgrarianServiceCenter ? 'is-invalid' : ''}`} id="NeaestAgrarianServiceCenter" name="NeaestAgrarianServiceCenter" value={formData.NeaestAgrarianServiceCenter} onChange={handleChange} />
                      <div className="invalid-feedback">{errors.NeaestAgrarianServiceCenter}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="MicroFinanceCompany" className="form-label">Micro Finance Company</label>
                      <input type="text" className={`form-control ${errors.MicroFinanceCompany ? 'is-invalid' : ''}`} id="MicroFinanceCompany" name="MicroFinanceCompany" value={formData.MicroFinanceCompany} onChange={handleChange} />
                      <div className="invalid-feedback">{errors.MicroFinanceCompany}</div>
                    </div>
                  </div> 
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="Branch" className="form-label">Branch</label>
                      <input type="text" className={`form-control ${errors.Branch ? 'is-invalid' : ''}`} id="Branch" name="Branch" value={formData.Branch} onChange={handleChange} />
                      <div className="invalid-feedback">{errors.Branch}</div>
                    </div>
                  </div>    
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="DisiredLoanAmount" className="form-label">Desired Loan Amount</label>
                      <input type="number" className={`form-control ${errors.DisiredLoanAmount ? 'is-invalid' : ''}`} id="DisiredLoanAmount" name="DisiredLoanAmount" value={formData.DisiredLoanAmount} onChange={handleChange} />
                      <div className="invalid-feedback">{errors.DisiredLoanAmount}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="AnnualIncome" className="form-label">Annual Income</label>
                      <input type="number" className={`form-control ${errors.AnnualIncome ? 'is-invalid' : ''}`} id="AnnualIncome" name="AnnualIncome" value={formData.AnnualIncome} onChange={handleChange} />
                      <div className="invalid-feedback">{errors.AnnualIncome}</div>
                    </div>
                  </div> 
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="GrossMonthIncome" className="form-label">Gross Monthly Income</label>
                      <input type="number" className={`form-control ${errors.GrossMonthIncome ? 'is-invalid' : ''}`} id="GrossMonthIncome" name="GrossMonthIncome" value={formData.GrossMonthIncome} onChange={handleChange} />
                      <div className="invalid-feedback">{errors.GrossMonthIncome}</div>
                    </div>
                  </div>    
                </div>
                
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="ProjectLocation" className="form-label">Project Location</label>
                      <input type="text" className={`form-control ${errors.ProjectLocation ? 'is-invalid' : ''}`} id="ProjectLocation" name="ProjectLocation" value={formData.ProjectLocation} onChange={handleChange} />
                      <div className="invalid-feedback">{errors.ProjectLocation}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="CropType" className="form-label">Crop Type</label>
                      <input type="text" className={`form-control ${errors.CropType ? 'is-invalid' : ''}`} id="CropType" name="CropType" value={formData.CropType} onChange={handleChange} />
                      <div className="invalid-feedback">{errors.CropType}</div>
                    </div>
                  </div> 
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="ExpectedComencementDate" className="form-label">Expected Commencement Date</label>
                      <input type="date" className={`form-control ${errors.ExpectedComencementDate ? 'is-invalid' : ''}`} id="ExpectedComencementDate" name="ExpectedComencementDate" value={formData.ExpectedComencementDate} onChange={handleChange} />
                      <div className="invalid-feedback">{errors.ExpectedComencementDate}</div>
                    </div>
                  </div>    
                </div>             
                <div className="col text-right actionButtons">
                  <button type="submit" className="btn btn-success">Submit</button>
                  <Button variant="primary" onClick={handleReset}>Reset</Button>
                </div>                 
              </form>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showSuccessModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-success">Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">{successMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default LoanRequest;