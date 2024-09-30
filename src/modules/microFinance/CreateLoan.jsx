import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button, Modal } from 'react-bootstrap';

function CreateLoan() {
  const initialValues = {
    LoanTypeID: '',
    LoanType: '',
    LoanCategory: '',
    MaxLoanAmount: '',
    InterestRate: '',
    Term: '',
    Remark: '',
    Status: 'A',
    OfferdBank: ''
  };

  const validationSchema = yup.object().shape({
    LoanTypeID: yup.string().required('Loan type ID is required').max(5),
    LoanType: yup.string().required('Loan type is required').max(25),
    LoanCategory: yup.string().max(25),
    MaxLoanAmount: yup.number().required('Max loan amount is required'),
    InterestRate: yup.number().required('Interest rate is required'),
    Term: yup.number().required('Term is required'),
    Remark: yup.string().max(200),
    Status: yup.string().max(1),
    OfferdBank: yup.string().required('Offered bank is required').max(100)
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('https://localhost:44345/api/loanType', values);
      if (response.status === 201) {
        setSuccessMessage('Loan type added successfully!');
        setShowSuccessModal(true);
        resetForm();
      } else {
        setErrorMessage('Failed to add loan type. Please try again.');
        setShowErrorModal(true);
      }
    } catch (error) {
      setErrorMessage('Failed to add loan type. Please try again.');
      setShowErrorModal(true);
    }
    setSubmitting(false);
  };

  const handleCloseSuccessModal = () => setShowSuccessModal(false);
  const handleCloseErrorModal = () => setShowErrorModal(false);

  return (
    <main id="main" className="main">
      <div>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-12">
            <div className="card" style={{ marginTop: "30px" }}>
              <div className="card-body">
                <br />
                <h5 style={{ color: "#88BDAE" }}> Create Loan</h5>
                <hr className="mx-n3" style={{ color: "#8BDAE", height: "3px" }}></hr>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting ,resetForm }) => (
                    <Form>

<div className="row">
    <div className="col-md-6">
    <div className="mb-3">
                                <label htmlFor="LoanTypeID" className="form-label">Loan Type ID</label>
                                <Field type="text" id="LoanTypeID" name="LoanTypeID" className="form-control" />
                                <ErrorMessage name="LoanTypeID" component="div" className="text-danger" />
                            </div>
    </div>
    <div className="col-md-6">
    <div className="mb-3">
                                <label htmlFor="LoanType" className="form-label">Loan Type</label>
                                <Field type="text" id="LoanType" name="LoanType" className="form-control" />
                                <ErrorMessage name="LoanType" component="div" className="text-danger" />
                            </div>
    </div>
</div>

<div className="row">
    <div className="col-md-6">
    <div className="mb-3">
                                <label htmlFor="LoanCategory" className="form-label">Loan Category</label>
                                <Field type="text" id="LoanCategory" name="LoanCategory" className="form-control" />
                                <ErrorMessage name="LoanCategory" component="div" className="text-danger" />
                            </div>
    </div>
    <div className="col-md-6">
    <div className="mb-3">
                                <label htmlFor="MaxLoanAmount" className="form-label">Max Loan Amount</label>
                                <Field type="number" id="MaxLoanAmount" name="MaxLoanAmount" className="form-control" />
                                <ErrorMessage name="MaxLoanAmount" component="div" className="text-danger" />
                            </div>
    </div>
</div>
<div className="row">
    <div className="col-md-3">
    <div className="mb-3">
                                <label htmlFor="InterestRate" className="form-label">Interest Rate</label>
                                <Field type="number" id="InterestRate" name="InterestRate" className="form-control" />
                                <ErrorMessage name="InterestRate" component="div" className="text-danger" />
                            </div>
    </div>
    <div className="col-md-3">
    <div className="mb-3">
                                <label htmlFor="Term" className="form-label">Term (Month)</label>
                                <Field type="number" id="Term" name="Term" className="form-control" />
                                <ErrorMessage name="Term" component="div" className="text-danger" />
                            </div>
    </div>
    <div className="col-md-3" hidden>
    <div className="mb-3">
                                <label htmlFor="Status" className="form-label">Status</label>
                                <Field type="text" id="Status" name="Status" className="form-control" />
                                <ErrorMessage name="Status" component="div" className="text-danger" />
                            </div>
    </div>
    <div className="col-md-3">
    <div className="mb-3">
                                <label htmlFor="OfferdBank" className="form-label">Offered Bank</label>
                                <Field type="text" id="OfferdBank" name="OfferdBank" className="form-control" />
        <ErrorMessage name="OfferdBank" component="div" className="text-danger" />
        </div>
    </div>
</div>
<div className="row">
    <div className="col-md-6">
    <div className="mb-3">
                                <label htmlFor="Remark" className="form-label">Remark</label>
                                <Field type="text" id="Remark" name="Remark" className="form-control" />
                                <ErrorMessage name="Remark" component="div" className="text-danger" />
                            </div>
    </div>
   
    
</div>

                            
                           
                            
                            
                           
                           
                            
                            
                  
        <Button type="submit" disabled={isSubmitting}>Submit</Button>
        <Button type="button" variant="danger" onClick={() => resetForm(initialValues)}>Clear</Button>

                    </Form>
)}
                 </Formik>
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
</main>
);
}

export default CreateLoan;
