 import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from "react-bootstrap";
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

function ApproveRequest() {
  const [formData, setFormData] = useState([]); // Ensure formData is initialized as an array
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [token, setToken] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleClose = () => setShowSuccessModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your form submission logic
  };

  const handleChange = (e) => {
    // Your change handler logic
  };

  const handleReset = () => {
    // Your reset handler logic
  };

  const handleSearch = async (values) => {
    try {
      let url = 'https://localhost:44345/api/loanRequest';
      if (values.FarmerRegNo) {
        url += `?FarmerRegNo=${values.FarmerRegNo}`;
      }
      const response = await axios.get(url);
      const data = response.data;
      if (Array.isArray(data)) { // Ensure the data is an array
        setFormData(data);
      } else {
        setFormData([]); // Fallback to an empty array if data is not an array
      }
    } catch (error) {
      setFormData([]); // Set formData to an empty array on error
      if (error.response && error.response.data && error.response.data.title === "Not Found") {
        setModalMessage('No data found for this code! Please try again.');
        setShowModal(true);
      } else {
        setModalMessage('Invalid! Please try again.');
        setShowModal(true);
      }
    }
  };

  const handleApprove = async (dataItem) => {
    try {
      const response = await axios.put(`https://localhost:44345/api/loanRequest/${dataItem.RequestID}`, { ...dataItem, approved: true, AccountStatus: "1" });
      setSuccessMessage('Request approved successfully!');
      setShowSuccessModal(true);
      handleSearch({ FarmerRegNo: formData.FarmerRegNo }); // Refresh the data
    } catch (error) {
      setErrorMessage('Error approving request!');
      setShowErrorModal(true);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.put(`https://localhost:44345/api/loanRequest/${id}`, { rejected: true, AccountStatus: "2" });
      setSuccessMessage('Request rejected successfully!');
      setShowSuccessModal(true);
      handleSearch({ FarmerRegNo: formData.FarmerRegNo }); // Refresh the data
    } catch (error) {
      setErrorMessage('Error in Request reject !');
      setShowErrorModal(true);
    }
  };

  return (
    <main id="main" className="main">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-xl-12">
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body">
              <br />
              <h5 style={{ color: "#88BDAE" }}> Approve Loan Request</h5>
              <hr className="mx-n3" style={{ color: "#8BDAE", height: "3px" }}></hr>
              <form onSubmit={handleSubmit}>
                {/* Search form */}
                <div className="mb-3">
                  <label htmlFor="FarmerRegNo" className="form-label">Search by Farmer Registration Number</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="FarmerRegNo"
                      name="FarmerRegNo"
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="btn btn-info text-uppercase"
                      onClick={() => handleSearch({ FarmerRegNo: formData.FarmerRegNo })}
                    >
                      <FaSearch />
                    </button>
                  </div>
                </div>

                {/* Table to display data */}
                <div style={{ overflowX: 'auto' }}>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Request ID</th>
                        <th>Farmer Reg No</th>
                        <th>NIC</th>
                        <th>Nearest Agrarian Service Center</th>
                        <th>Micro Finance Company</th>
                        <th>Branch</th>
                        <th>Desired Loan Amount</th>
                        <th>Annual Income</th>
                        <th>Gross Month Income</th>
                        <th>Project Location</th>
                        <th>Crop Type</th>
                        <th>Expected Commencement Date</th>
                        <th>Account Status</th>
                        <th>Actions</th>
                        <th>Copy of NIC</th>
                        <th>Society Registration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(formData) && formData.map((dataItem, index) => (
                        <tr key={index}>
                          <td>{dataItem.RequestID}</td>
                          <td>{dataItem.FarmerRegNo}</td>
                          <td>{dataItem.NIC}</td>
                          <td>{dataItem.NeaestAgrarianServiceCenter}</td>
                          <td>{dataItem.MicroFinanceCompany}</td>
                          <td>{dataItem.Branch}</td>
                          <td>{dataItem.DisiredLoanAmount}</td>
                          <td>{dataItem.AnnualIncome}</td>
                          <td>{dataItem.GrossMonthIncome}</td>
                          <td>{dataItem.ProjectLocation}</td>
                          <td>{dataItem.CropType}</td>
                          <td>{new Date(dataItem.ExpectedComencementDate).toLocaleDateString()}</td>
                          <td>{dataItem.AccountStatus}</td>
                          <td>
                            <Button variant="success" onClick={() => handleApprove(dataItem)}>A </Button>
                            <Button variant="danger" onClick={() => handleReject(dataItem.RequestID)}>R </Button>
                          </td>
                          <td>{dataItem.CopyofNIC ? dataItem.CopyofNIC : null}</td>
                          <td>{dataItem.SocietyRegistration ? dataItem.SocietyRegistration : null}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
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

      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">{errorMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowErrorModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default ApproveRequest;
