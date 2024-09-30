import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as yup from 'yup';
import { Button, Modal, Table } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // Import the search icon
import districts  from '../../data/districData'; // Import the districts array

let isPostMethod = false; // Global Variable 

function ViewProfile() {
  const initialValues = {
    FarmerRegistrationNo: '',
    FullName: '',
    Email: '',
    MobileNumber: '',
    District: '', // Updated to use dropdown
    PostalCode: '',
    Address1: '',
    Address2: '',    
    crops: [{ CropName: '', LandArea: '', PlantingDate: '', HarvestingDate: '', EstimatedYeild: '', Production: '', AvailableYeild: '',FarmerRegistrationNo: '' }]
  };

  
  const validationSchema = yup.object().shape({   
    FullName: yup.string().required('Full name is required').max(200),
    FarmerRegistartionNo: yup.string().required('Full name is required').max(200),
    Email: yup.string().email('Invalid email').required('Email is required').max(50),
    MobileNumber: yup.string().required('Mobile number is required').matches(/^[0-9]+$/, 'Must be a valid mobile number').max(10),
    District: yup.string().required('District is required').max(50),
    PostalCode: yup.string().required('Postal code is required').max(10),
    Address1: yup.string().required('Address Line 1 is required').max(200),
    Address2: yup.string().max(200),
    
    crops: yup.array().of(yup.object().shape({
      CropName: yup.string().required('Crop name is required'),
      LandArea: yup.number().required('Land area is required'),
      PlantingDate: yup.date().required('Planting date is required'),
      HarvestingDate: yup.date().required('Harvesting date is required'),
      EstimatedYeild: yup.number().required('Estimated yield is required'),
      Production: yup.number().required('Production is required'),
      AvailableYeild: yup.number().required('Available yield is required'),
      FarmerRegistrationNo: yup.string().max(200)          
    }))
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [modalMessage, setModalMessage] = useState(''); // State to control modal message content
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

   

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('https://localhost:44345/api/farmer', values);
      if (response.status === 201) {
        setSuccessMessage('Registration successful!');
        setShowSuccessModal(true);
        resetForm(); // Reset form after successful submission
      } else {
        setErrorMessage('Failed to register. Please try again.');
        setShowErrorModal(true);
      }
    } catch (error) {
      setErrorMessage('Failed to register. Please try again.');
      setShowErrorModal(true);
     // console.error('Error:', error);
    }
    setSubmitting(false);
   // resetForm();
  };

  // Find Button
  const handleFind = async (values, { setFieldValue }) => {
    try {
        if (!values.FarmerRegistartionNo) {
         setModalMessage('Please enter your registration number!');
          setShowModal(true);
         return;
        }

      const response = await axios.get(`https://localhost:44345/api/farmer/${values.FarmerRegistartionNo}`);
      const data = response.data;
      
      if (data.length > 0) {
        if (data.FarmerModel == null) {
          isPostMethod = true;
          setFieldValue('FullName', data[0].FirstName + " " + data[0].LastName);
          setFieldValue('Email', data[0].Email);        
           
          setFieldValue('FarmerRegistrationNo', data[0].UserId);
         // setFieldValue('Address1', data[0].Address1); // new
        } else {
          setModalMessage('Invalid Process. Please contact Agrarian department.');
          setShowModal(true);
        }
      } else {
        isPostMethod = false;
        setFieldValue('FullName', data.FullName);
        setFieldValue('Email', data.Email);
        setFieldValue('MobileNumber', data.MobileNumber);
        setFieldValue('District', data.District);
        setFieldValue('PostalCode', data.PostalCode);
        setFieldValue('Address1', data.Address1);
        setFieldValue('Address2', data.Address2);        
        setFieldValue('FarmerRegistrationNo', data.FarmerRegistartionNo);
      }
    } catch (error) {
      if (error.response.data.title === "Not Found") {
        setModalMessage('No data found for this code! Please try again.');
        setShowModal(true);
      } else {
        console.error('Error fetching agrarian center data:', error);
      }
    }
  };

  const handleCloseSuccessModal = () => setShowSuccessModal(false);
  const handleCloseErrorModal = () => setShowErrorModal(false);

  const handleMobileNumberChange = (e, setFieldValue) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setFieldValue('MobileNumber', e.target.value);
    }
  };

  return (
    <main id="main" className="main">
      <div>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-12">
            <div className="card" style={{ marginTop: "30px" }}>
              <div className="card-body">
                <br />
                <h5 style={{ color: "#88BDAE" }}> FARMER PROFILE</h5>
                <hr className="mx-n3" style={{ color: "#8BDAE", height: "3px" }}></hr>
                {/* card start */}
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, values, setFieldValue }) => (
                    <Form>
                      <div className="row">
                        <div className="col-md-6 ">
                          <div className="mb-3">
                            <label htmlFor="FarmerRegistartionNo" className="form-label">Registration Number</label>
                            <div className="input-group"> {/* Added input-group */}
                              <Field type="text" id="FarmerRegistartionNo" name="FarmerRegistartionNo" className="form-control" />
                              <button type="button" className="btn btn-info text-uppercase" onClick={() => handleFind(values, { setFieldValue })}>
                                <FaSearch /> {/* Search icon */}
                              </button>
                              <Button variant="danger" type="button" onClick={() => {
                      setFieldValue('FarmerRegistrationNo', '');
                      setFieldValue('FullName', '');
                      setFieldValue('Email', '');
                      setFieldValue('MobileNumber', '');
                      setFieldValue('District', '');
                      setFieldValue('PostalCode', '');
                      setFieldValue('Address1', '');
                      setFieldValue('Address2', '');
                      setFieldValue('crops', [{ CropName: '', LandArea: '', PlantingDate: '', HarvestingDate: '', EstimatedYeild: '', Production: '', AvailableYeild: '' }]);
                      }}>Clear Data</Button>

                            </div>
                            <ErrorMessage name="FarmerRegistartionNo" component="div" className="text-danger" />
                          </div>
                        </div> 
                      </div>

                        

                      <div className="mb-3">
                        <label htmlFor="FullName" className="form-label">Full Name</label>
                        <Field type="text" id="FullName" name="FullName" className="form-control" />
                        <ErrorMessage name="FullName" component="div" className="text-danger" />
                      </div>

                       
                      <div className="mb-3">
                        <label htmlFor="Email" className="form-label">Email</label>
                        <Field type="email" id="Email" name="Email" className="form-control" />
                        <ErrorMessage name="Email" component="div" className="text-danger" />
                      </div>

                      <div className="row">
                        {/* <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="MobileNumber" className="form-label">Mobile Number</label>
                            <Field type="text" id="MobileNumber" name="MobileNumber" className="form-control" inputMode="numeric" pattern="[0-9]*" />
                            <ErrorMessage name="MobileNumber" component="div" className="text-danger" />
                          </div>
                        </div> */}
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="MobileNumber" className="form-label">Mobile Number</label>
                            <Field type="text" id="MobileNumber" name="MobileNumber" className="form-control" onChange={(e) => handleMobileNumberChange(e, setFieldValue)} />
                            <ErrorMessage name="MobileNumber" component="div" className="text-danger" />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="District" className="form-label">District</label>
                            <Field as="select" id="District" name="District" className="form-control">
                              <option value="">Select District</option>
                              {districts.map(district => (
                                <option key={district} value={district}>{district}</option>
                              ))}
                            </Field>
                            <ErrorMessage name="District" component="div" className="text-danger" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="PostalCode" className="form-label">Postal Code</label>
                            <Field type="text" id="PostalCode" name="PostalCode" className="form-control" />
                            <ErrorMessage name="PostalCode" component="div" className="text-danger" />
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="Address1" className="form-label">Address Line 1</label>
                        <Field type="text" id="Address1" name="Address1" className="form-control" />
                        <ErrorMessage name="Address1" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="Address2" className="form-label">Address Line 2</label>
                        <Field type="text" id="Address2" name="Address2" className="form-control" />
                        <ErrorMessage name="Address2" component="div" className="text-danger" />
                      </div>
                     
                      
                      <FieldArray name="crops">
                        {({ push, remove }) => (
                          <>
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <h4>Crops</h4>
                              </div>
                              <div className="col-md-6 d-flex justify-content-end">
                                <Button variant="success" type="button" onClick={() => push({ CropName: '', LandArea: '', PlantingDate: '', HarvestingDate: '', EstimatedYeild: '', Production: '', AvailableYeild: '' })}>Add Crop</Button>
                              </div>
                            </div>
                            <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th style={{ verticalAlign: 'top' }}>Crop Name</th>
                                  <th style={{ verticalAlign: 'top' }}>Land Area(Acre)</th>
                                  <th style={{ verticalAlign: 'top' }}>Planting Date</th>
                                  <th style={{ verticalAlign: 'top' }}>Harvesting Date</th>
                                  <th style={{ verticalAlign: 'top' }}>Estimated Yield</th>
                                  <th style={{ verticalAlign: 'top' }}>Production(kg)</th>
                                  <th style={{ verticalAlign: 'top' }}>Available Yield(kg)</th>
                                  <th style={{ verticalAlign: 'top' }}>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {values.crops.map((crop, index) => (
                                  <tr key={index}>
                                    <td><Field type="text" name={`crops.${index}.CropName`} className="form-control" /></td>
                                    <td><Field type="text" name={`crops.${index}.LandArea`} className="form-control" /></td>
                                    <td><Field type="date" name={`crops.${index}.PlantingDate`} className="form-control" /></td>
                                    <td><Field type="date" name={`crops.${index}.HarvestingDate`} className="form-control" /></td>
                                    <td><Field type="number" name={`crops.${index}.EstimatedYeild`} className="form-control" /></td>
                                    <td><Field type="number" name={`crops.${index}.Production`} className="form-control" /></td>
                                    <td><Field type="number" name={`crops.${index}.AvailableYeild`} className="form-control" /></td>
                                    <td><Button variant="danger" type="button" onClick={() => remove(index)}>Remove Crop</Button></td>
                                  </tr>
                                ))} 
                              </tbody>
                            </Table>
                          </>
                        )}
                      </FieldArray>
                      <div className="row">
                        <Button type="submit" disabled={isSubmitting}>Submit</Button>
                      </div>
                    </Form>
                  )}
                </Formik>
                {/* card end */}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccessModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Common pop up */}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default ViewProfile;
