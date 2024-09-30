import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button, Modal, Form as BootstrapForm } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // Import the search icon

function AgrarianCenter() {
  const initialValues = {
    CenterCode: '',
    CenterName: '',
    Email: '',
    Address1: '',
    Address2: '',
    District: '',
    Division: '', // Added Division field
    DivSecretariat: '',
    OfficerIncharge: ''
  };

  const validationSchema = yup.object().shape({
    CenterCode: yup.string().required('Center Code is required'),
    CenterName: yup.string().required('Center Name is required').max(200),
    Email: yup.string().email('Invalid email').required('Email is required').max(50),
    Address1: yup.string().required('Address Line 1 is required').max(200),
    Address2: yup.string().max(200),
    District: yup.string().required('District is required').max(50),
    Division: yup.string().max(100), // Added validation for Division field
    DivSecretariat: yup.string().max(100),
    OfficerIncharge: yup.string().required('Officer Incharge is required').max(20)
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRegistrationAlert, setShowRegistrationAlert] = useState(false); // State to control registration alert visibility

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {

    // Convert string values to uppercase
    const uppercaseValues = {};
    for (const key in values) {
      if (typeof values[key] === 'string') {
        uppercaseValues[key] = values[key].toUpperCase();
      } else {
        uppercaseValues[key] = values[key];
      }
    }
    const response = await axios.post('https://localhost:44345/api/agrarianCenters', uppercaseValues);
      // const response = await axios.post('https://localhost:44345/api/agrarianCenters', values);
      if (response.status === 201) {
        setSuccessMessage('Detail updated successfully! Center Code: ' + response.data.CenterCode);
        setShowSuccessModal(true);
      } else {
        setSuccessMessage('Please check data and status!');
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setSubmitting(false);
    resetForm();
  };
  const handleClose = () => setShowSuccessModal(false);
  const districts = [
    { code: 'DIS02', name: 'Gampaha' },
    { code: 'DIS03', name: 'Kalutara' },
    { code: 'DIS04', name: 'Kandy' },
    { code: 'DIS05', name: 'Matale' },
    { code: 'DIS06', name: 'Nuwara Eliya' },
    { code: 'DIS07', name: 'Galle' },
    { code: 'DIS08', name: 'Matara' },
    { code: 'DIS09', name: 'Hambantota' },
    { code: 'DIS10', name: 'Jaffna' },
    { code: 'DIS11', name: 'Kilinochchi' },
    { code: 'DIS12', name: 'Mannar' },
    { code: 'DIS13', name: 'Vavuniya' },
    { code: 'DIS14', name: 'Mullaitivu' },
    { code: 'DIS15', name: 'Batticaloa' },
    { code: 'DIS16', name: 'Ampara' },
    { code: 'DIS17', name: 'Trincomalee' },
    { code: 'DIS18', name: 'Kurunegala' },
    { code: 'DIS19', name: 'Puttalam' },
    { code: 'DIS20', name: 'Anuradhapura' },
    { code: 'DIS21', name: 'Polonnaruwa' },
    { code: 'DIS22', name: 'Badulla' },
    { code: 'DIS23', name: 'Moneragala' },
    { code: 'DIS24', name: 'Ratnapura' },
    { code: 'DIS25', name: 'Kegalle' }
  ];

  // Sort districts alphabetically by name
  districts.sort((a, b) => a.name.localeCompare(b.name));

  //Inquire data
   
  // const handleFind = async (values, { setFieldValue }) => {
  //   try {
  //     const response = await axios.get(`https://localhost:44345/api/agrarianCenters/${values.CenterCode}`);
  //     const data = response.data;
  //     // Set field values based on the retrieved data
  //     setFieldValue('CenterName', data.CenterName);
  //     setFieldValue('Email', data.Email);
  //     setFieldValue('Address1', data.Address1);
  //     setFieldValue('Address2', data.Address2);
  //     setFieldValue('District', data.District);
  //     setFieldValue('Division', data.Division);
  //     setFieldValue('DivSecretariat', data.DivSecretariat);
  //     setFieldValue('OfficerIncharge', data.OfficerIncharge);
  //   } catch (error) {
  //     console.error('Error fetching agrarian center data:', error);
  //     // Handle error here, such as displaying an error message to the user
  //   }
  // };
  
  const handleFind = async (values, { setFieldValue }) => {
    try {

      if (!values.CenterCode) {
        setShowRegistrationAlert(true); // Show registration alert if CenterCode is empty
        return;
      }

      const response = await axios.get(`https://localhost:44345/api/agrarianCenters/${values.CenterCode}`);
      const data = response.data;
      // Set field values based on the retrieved data
      setFieldValue('CenterName', data.CenterName);
      setFieldValue('Email', data.Email);
      setFieldValue('Address1', data.Address1);
      setFieldValue('Address2', data.Address2);
      setFieldValue('District', data.District);
      setFieldValue('Division', data.Division);
      setFieldValue('DivSecretariat', data.DivSecretariat);
      setFieldValue('OfficerIncharge', data.OfficerIncharge);
    } catch (error) {
       if(error.response.data.title =="Not Found"){ setShowRegistrationAlert(true); }
       else{console.error('Error fetching agrarian center data:', error);}
      
       
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
                <h5 style={{ color: "#88BDAE" }}> Add New Record</h5>
                <hr className="mx-n3" style={{ color: "#8BDAE", height: "3px" }}></hr>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                   {({ isSubmitting, resetForm, values, setFieldValue }) => (
                    
                    <Form>
                      <div className="row">
                        <div className="col-md-6 "> {/* Added align-items-end class */}
                        {/* <div className="col-md-6 d-flex align-items-end"> */}
                          <div className="mb-3">
                            <label htmlFor="CenterCode" className="form-label">Center Code</label>
                            <div className="input-group"> {/* Added input-group */}
                              <Field type="text" id="CenterCode" name="CenterCode" className="form-control text-uppercase" />
                              <button type="button" className="btn btn-info text-uppercase" onClick={() => handleFind(values, { setFieldValue })}>
                                <FaSearch /> {/* Search icon */}
                              </button>
                            </div>
                            <ErrorMessage name="CenterCode" component="div" className="text-danger" />
                          </div>
                        </div>                      
                      </div>


                      <div className="row">                       
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label htmlFor="CenterName" className="form-label">Center Name</label>
                            <Field type="text" id="CenterName" name="CenterName" className="form-control text-uppercase" />
                            <ErrorMessage name="CenterName" component="div" className="text-danger" />
                          </div>
                        </div>
                      </div>
                       
                      <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="Address1" className="form-label">Address Line 1</label>
                                <Field type="text" id="Address1" name="Address1" className="form-control text-uppercase" />
                                <ErrorMessage name="Address1" component="div" className="text-danger" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="Address2" className="form-label">Address Line 2</label>
                              <Field type="text" id="Address2" name="Address2" className="form-control text-uppercase" />
                              <ErrorMessage name="Address2" component="div" className="text-danger" />
                            </div>
                          </div>  
                      </div>         

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="District" className="form-label">District:</label>
                         
                           {/* Dropdown for DiviDivSecretariatsion */}
                            <Field as="select" id="District" name="District" className="form-control text-uppercase">
                            <option value="" style={{ fontStyle:"italic" }}>Select District</option>
                              {districts.map(district => (
                              <option key={district.code} value={district.code}>
                              {district.name}
                              </option>
                              ))}
                            </Field>
                          <ErrorMessage name="District" component="div" className="text-danger" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="DivSecretariat" className="form-label">DivSecretariat</label>
                          {/* Dropdown for DiviDivSecretariatsion */}
                          <Field as="select" id="DivSecretariat" name="DivSecretariat" className="form-control text-uppercase">
                          <option value="" style={{ fontStyle:"italic" }}>Select Divisional Secretariat</option>
                            {/* <option value="" style={{ color:"blue", fontStyle:"italic" }}>Select Divisional Secretariat</option> */}
                            <option value="Agalawatta ">Agalawatta</option>
                            <option value="Agalawatta ">Agalawatta</option>
                            <option value="Bandaragama">Bandaragama</option>                            
                            <option value="Beruwala">Beruwala</option>
                            <option value="Bulathsinhala ">Bulathsinhala</option>
                            <option value="Dodangoda">Dodangoda</option>
                            <option value="Horana">Horana</option>
                            <option value="Ingiriya">Ingiriya</option>
                            <option value="Kalutara ">Kalutara</option>
                            <option value="Mathugama">Mathugama</option>
                            <option value="Panadura">Panadura</option>
                            <option value="Palindanuwara">Palindanuwara</option>
                            <option value="Madurawela ">Madurawela</option>
                            <option value="Walallavita ">Walallavita</option>                       
                            
                          </Field>
                          <ErrorMessage name="DivSecretariat" component="div" className="text-danger" />
                        </div>
                      </div>  
                    </div>                     
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="Email" className="form-label">Email</label>
                            <Field type="email" id="Email" name="Email" className="form-control text-uppercase" />
                            <ErrorMessage name="Email" component="div" className="text-danger" />
                          </div>
                        </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="OfficerIncharge" className="form-label">Officer Incharge</label>
                          <Field type="text" id="OfficerIncharge" name="OfficerIncharge" className="form-control text-uppercase" />
                          <ErrorMessage name="OfficerIncharge" component="div" className="text-danger" />
                        </div>   
                      </div>   
                      </div>
                      <div className="row">
                        <div className="col-md-2">
                          <Button type="submit" className="btn btn-success btn-block" style={{ width: "150px" }} disabled={isSubmitting}>
                          {isSubmitting ? 'Submitting...' : 'Save Records'}
                          </Button>
                        </div>
                        <div className="col-md-2">
                          <Button type="button" className="btn-primary btn-block" style={{ width: "150px" }} onClick={() => {
                          // Reset form data when the button is clicked
                          resetForm();
                          }}>
                          Reset
                          </Button>
                        </div>
                      </div>

                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* message pop up */}
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


        {/* Registration alert modal */}
        <Modal show={showRegistrationAlert} onHide={() => setShowRegistrationAlert(false)} centered>
          <Modal.Header closeButton>
          <Modal.Title>Registration Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please enter your registration number</Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRegistrationAlert(false)}>Close</Button>
          </Modal.Footer>
        </Modal>



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

export default AgrarianCenter;
import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button, Modal, Form as BootstrapForm } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // Import the search icon

function AgrarianCenter() {
  const initialValues = {
    CenterCode: '',
    CenterName: '',
    Email: '',
    Address1: '',
    Address2: '',
    District: '',
    Division: '', // Added Division field
    DivSecretariat: '',
    OfficerIncharge: ''
  };

  const validationSchema = yup.object().shape({
    CenterCode: yup.string().required('Center Code is required'),
    CenterName: yup.string().required('Center Name is required').max(200),
    Email: yup.string().email('Invalid email').required('Email is required').max(50),
    Address1: yup.string().required('Address Line 1 is required').max(200),
    Address2: yup.string().max(200),
    District: yup.string().required('District is required').max(50),
    Division: yup.string().max(100), // Added validation for Division field
    DivSecretariat: yup.string().max(100),
    OfficerIncharge: yup.string().required('Officer Incharge is required').max(20)
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRegistrationAlert, setShowRegistrationAlert] = useState(false); // State to control registration alert visibility

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {

    // Convert string values to uppercase
    const uppercaseValues = {};
    for (const key in values) {
      if (typeof values[key] === 'string') {
        uppercaseValues[key] = values[key].toUpperCase();
      } else {
        uppercaseValues[key] = values[key];
      }
    }
    const response = await axios.post('https://localhost:44345/api/agrarianCenters', uppercaseValues);
      // const response = await axios.post('https://localhost:44345/api/agrarianCenters', values);
      if (response.status === 201) {
        setSuccessMessage('Detail updated successfully! Center Code: ' + response.data.CenterCode);
        setShowSuccessModal(true);
      } else {
        setSuccessMessage('Please check data and status!');
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setSubmitting(false);
    resetForm();
  };
  const handleClose = () => setShowSuccessModal(false);
  const districts = [
    { code: 'DIS02', name: 'Gampaha' },
    { code: 'DIS03', name: 'Kalutara' },
    { code: 'DIS04', name: 'Kandy' },
    { code: 'DIS05', name: 'Matale' },
    { code: 'DIS06', name: 'Nuwara Eliya' },
    { code: 'DIS07', name: 'Galle' },
    { code: 'DIS08', name: 'Matara' },
    { code: 'DIS09', name: 'Hambantota' },
    { code: 'DIS10', name: 'Jaffna' },
    { code: 'DIS11', name: 'Kilinochchi' },
    { code: 'DIS12', name: 'Mannar' },
    { code: 'DIS13', name: 'Vavuniya' },
    { code: 'DIS14', name: 'Mullaitivu' },
    { code: 'DIS15', name: 'Batticaloa' },
    { code: 'DIS16', name: 'Ampara' },
    { code: 'DIS17', name: 'Trincomalee' },
    { code: 'DIS18', name: 'Kurunegala' },
    { code: 'DIS19', name: 'Puttalam' },
    { code: 'DIS20', name: 'Anuradhapura' },
    { code: 'DIS21', name: 'Polonnaruwa' },
    { code: 'DIS22', name: 'Badulla' },
    { code: 'DIS23', name: 'Moneragala' },
    { code: 'DIS24', name: 'Ratnapura' },
    { code: 'DIS25', name: 'Kegalle' }
  ];

  // Sort districts alphabetically by name
  districts.sort((a, b) => a.name.localeCompare(b.name));

  //Inquire data
   
  // const handleFind = async (values, { setFieldValue }) => {
  //   try {
  //     const response = await axios.get(`https://localhost:44345/api/agrarianCenters/${values.CenterCode}`);
  //     const data = response.data;
  //     // Set field values based on the retrieved data
  //     setFieldValue('CenterName', data.CenterName);
  //     setFieldValue('Email', data.Email);
  //     setFieldValue('Address1', data.Address1);
  //     setFieldValue('Address2', data.Address2);
  //     setFieldValue('District', data.District);
  //     setFieldValue('Division', data.Division);
  //     setFieldValue('DivSecretariat', data.DivSecretariat);
  //     setFieldValue('OfficerIncharge', data.OfficerIncharge);
  //   } catch (error) {
  //     console.error('Error fetching agrarian center data:', error);
  //     // Handle error here, such as displaying an error message to the user
  //   }
  // };
  
  const handleFind = async (values, { setFieldValue }) => {
    try {

      if (!values.CenterCode) {
        setShowRegistrationAlert(true); // Show registration alert if CenterCode is empty
        return;
      }

      const response = await axios.get(`https://localhost:44345/api/agrarianCenters/${values.CenterCode}`);
      const data = response.data;
      // Set field values based on the retrieved data
      setFieldValue('CenterName', data.CenterName);
      setFieldValue('Email', data.Email);
      setFieldValue('Address1', data.Address1);
      setFieldValue('Address2', data.Address2);
      setFieldValue('District', data.District);
      setFieldValue('Division', data.Division);
      setFieldValue('DivSecretariat', data.DivSecretariat);
      setFieldValue('OfficerIncharge', data.OfficerIncharge);
    } catch (error) {
       if(error.response.data.title =="Not Found"){ setShowRegistrationAlert(true); }
       else{console.error('Error fetching agrarian center data:', error);}
      
       
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
                <h5 style={{ color: "#88BDAE" }}> Add New Record</h5>
                <hr className="mx-n3" style={{ color: "#8BDAE", height: "3px" }}></hr>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                   {({ isSubmitting, resetForm, values, setFieldValue }) => (
                    
                    <Form>
                      <div className="row">
                        <div className="col-md-6 "> {/* Added align-items-end class */}
                        {/* <div className="col-md-6 d-flex align-items-end"> */}
                          <div className="mb-3">
                            <label htmlFor="CenterCode" className="form-label">Center Code</label>
                            <div className="input-group"> {/* Added input-group */}
                              <Field type="text" id="CenterCode" name="CenterCode" className="form-control text-uppercase" />
                              <button type="button" className="btn btn-info text-uppercase" onClick={() => handleFind(values, { setFieldValue })}>
                                <FaSearch /> {/* Search icon */}
                              </button>
                            </div>
                            <ErrorMessage name="CenterCode" component="div" className="text-danger" />
                          </div>
                        </div>                      
                      </div>


                      <div className="row">                       
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label htmlFor="CenterName" className="form-label">Center Name</label>
                            <Field type="text" id="CenterName" name="CenterName" className="form-control text-uppercase" />
                            <ErrorMessage name="CenterName" component="div" className="text-danger" />
                          </div>
                        </div>
                      </div>
                       
                      <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="Address1" className="form-label">Address Line 1</label>
                                <Field type="text" id="Address1" name="Address1" className="form-control text-uppercase" />
                                <ErrorMessage name="Address1" component="div" className="text-danger" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="Address2" className="form-label">Address Line 2</label>
                              <Field type="text" id="Address2" name="Address2" className="form-control text-uppercase" />
                              <ErrorMessage name="Address2" component="div" className="text-danger" />
                            </div>
                          </div>  
                      </div>         

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="District" className="form-label">District:</label>
                         
                           {/* Dropdown for DiviDivSecretariatsion */}
                            <Field as="select" id="District" name="District" className="form-control text-uppercase">
                            <option value="" style={{ fontStyle:"italic" }}>Select District</option>
                              {districts.map(district => (
                              <option key={district.code} value={district.code}>
                              {district.name}
                              </option>
                              ))}
                            </Field>
                          <ErrorMessage name="District" component="div" className="text-danger" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="DivSecretariat" className="form-label">DivSecretariat</label>
                          {/* Dropdown for DiviDivSecretariatsion */}
                          <Field as="select" id="DivSecretariat" name="DivSecretariat" className="form-control text-uppercase">
                          <option value="" style={{ fontStyle:"italic" }}>Select Divisional Secretariat</option>
                            {/* <option value="" style={{ color:"blue", fontStyle:"italic" }}>Select Divisional Secretariat</option> */}
                            <option value="Agalawatta ">Agalawatta</option>
                            <option value="Agalawatta ">Agalawatta</option>
                            <option value="Bandaragama">Bandaragama</option>                            
                            <option value="Beruwala">Beruwala</option>
                            <option value="Bulathsinhala ">Bulathsinhala</option>
                            <option value="Dodangoda">Dodangoda</option>
                            <option value="Horana">Horana</option>
                            <option value="Ingiriya">Ingiriya</option>
                            <option value="Kalutara ">Kalutara</option>
                            <option value="Mathugama">Mathugama</option>
                            <option value="Panadura">Panadura</option>
                            <option value="Palindanuwara">Palindanuwara</option>
                            <option value="Madurawela ">Madurawela</option>
                            <option value="Walallavita ">Walallavita</option>                       
                            
                          </Field>
                          <ErrorMessage name="DivSecretariat" component="div" className="text-danger" />
                        </div>
                      </div>  
                    </div>                     
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="Email" className="form-label">Email</label>
                            <Field type="email" id="Email" name="Email" className="form-control text-uppercase" />
                            <ErrorMessage name="Email" component="div" className="text-danger" />
                          </div>
                        </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="OfficerIncharge" className="form-label">Officer Incharge</label>
                          <Field type="text" id="OfficerIncharge" name="OfficerIncharge" className="form-control text-uppercase" />
                          <ErrorMessage name="OfficerIncharge" component="div" className="text-danger" />
                        </div>   
                      </div>   
                      </div>
                      <div className="row">
                        <div className="col-md-2">
                          <Button type="submit" className="btn btn-success btn-block" style={{ width: "150px" }} disabled={isSubmitting}>
                          {isSubmitting ? 'Submitting...' : 'Save Records'}
                          </Button>
                        </div>
                        <div className="col-md-2">
                          <Button type="button" className="btn-primary btn-block" style={{ width: "150px" }} onClick={() => {
                          // Reset form data when the button is clicked
                          resetForm();
                          }}>
                          Reset
                          </Button>
                        </div>
                      </div>

                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* message pop up */}
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


        {/* Registration alert modal */}
        <Modal show={showRegistrationAlert} onHide={() => setShowRegistrationAlert(false)} centered>
          <Modal.Header closeButton>
          <Modal.Title>Registration Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please enter your registration number</Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRegistrationAlert(false)}>Close</Button>
          </Modal.Footer>
        </Modal>



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

export default AgrarianCenter;
