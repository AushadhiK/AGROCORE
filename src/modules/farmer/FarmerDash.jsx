import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Card, Row, Col } from 'react-bootstrap';
import { FaMoneyCheckAlt, FaCheckCircle, FaTimesCircle, FaHourglassHalf,FaUser, FaRegListAlt, FaThList,FaPhone, FaBalanceScale, FaListAlt } from 'react-icons/fa'; // Import the icons
import ViewProfile from './ViewProfile';
import CreateGruops from './CreateGruops';
import ContactAgrarian from './ContactAgrarian';
import ContactFarmers from './ContactFarmers';
import ViewLoanHistry from './ViewLoanHistry';
import ViewCrops from './ViewCrops';
import CompareRates from './CompareRates';
import LoanRequest from './loanRequest';


function FarmerDash() {
  const [modalMessage, setModalMessage] = useState(''); // State to control modal message content
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [totalLoans, setTotalLoans] = useState(0); // State to hold total loan count
  const [approvedLoans, setApprovedLoans] = useState(0); // State to hold approved loan count
  const [rejectedLoans, setRejectedLoans] = useState(0); // State to hold rejected loan count
  const [pendingLoans, setPendingLoans] = useState(0); // State to hold pending loan count
  const [activeForm, setActiveForm] = useState(null); // State to hold active form
  const [clickedCard, setClickedCard] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {   
  const storedUserId = localStorage.getItem('userId');
  if (storedUserId) {
       setUserId(storedUserId);
   
     console.log('User ID:', storedUserId);
      } else {   
         console.error('No user ID found in local storage');
     }


     
    // Fetch total loan count from the API
    const fetchTotalLoans = async () => {
      try {
        const response = await axios.get('/api/loans/total'); // Adjust the endpoint as needed
        setTotalLoans(response.data.total);
      } catch (error) {
        console.error('Error fetching total loan count:', error);
      }
    };

    // Fetch approved loan count from the API
    const fetchApprovedLoans = async () => {
      try {
        const response = await axios.get('/api/loans/approved'); // Adjust the endpoint as needed
        setApprovedLoans(response.data.total);
      } catch (error) {
        console.error('Error fetching approved loan count:', error);
      }
    };

    

    // Fetch rejected loan count from the API
    const fetchRejectedLoans = async () => {
      try {
        const response = await axios.get('/api/loans/rejected'); // Adjust the endpoint as needed
        setRejectedLoans(response.data.total);
      } catch (error) {
        console.error('Error fetching rejected loan count:', error);
      }
    };

    // Fetch pending loan count from the API
    const fetchPendingLoans = async () => {
      try {
        const response = await axios.get('/api/loans/pending'); // Adjust the endpoint as needed
        setPendingLoans(response.data.total);
      } catch (error) {
        console.error('Error fetching pending loan count:', error);
      }
    };

    fetchTotalLoans();
    fetchApprovedLoans();
    fetchRejectedLoans();
    fetchPendingLoans();
  }, []);



  // Function to handle option click
  const handleOptionClick = (form) => {
    setActiveForm(form);
    setClickedCard(form);
  };
  
  // Function to render active form
  const renderActiveForm = () => {
    switch (activeForm) {
      case 'profile':
        return <ViewProfile />;
      case 'requestLoan':
        return <LoanRequest />;
      case 'compareLoan':
        return <CompareRates />;
      case 'viewCrops':
        return <ViewCrops />;
      case 'viewFarmers':
        return <ContactFarmers />; 
      case 'viewLoan':
        return <ViewLoanHistry />; 
      case 'contactAgrarianCenter':
        return <ContactAgrarian />; 
      default:
        return null;
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
                <h5 style={{ color: "#88BDAE" }}>WELCOME TO FARMER PROFILE</h5>
                <hr className="mx-n3" style={{ color: "#8BDAE", height: "3px" }}></hr>
                
                {/* Cards for Loan Requests */}
                <Row hidden>
                  <Col>
                    <Card className="mb-4">
                      <Card.Body>
                        <Card.Title style={{ color: '#3B7A57' }}>
                          <FaMoneyCheckAlt /> Total Loan Requests
                        </Card.Title>
                        <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3B7A57' }}>
                          {totalLoans}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="mb-4">
                      <Card.Body>
                        <Card.Title style={{ color: '#3B7A57' }}>
                          <FaCheckCircle /> Approved Loan Requests
                        </Card.Title>
                        <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3B7A57' }}>
                          {approvedLoans}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="mb-4">
                      <Card.Body>
                        <Card.Title style={{ color: '#3B7A57' }}>
                          <FaTimesCircle /> Rejected Loan Requests
                        </Card.Title>
                        <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3B7A57' }}>
                          {rejectedLoans}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="mb-4">
                      <Card.Body>
                        <Card.Title style={{ color: '#3B7A57' }}>
                          <FaHourglassHalf /> Approval Pending Requests
                        </Card.Title>
                        <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold', color: '#006400' }}>
                          {pendingLoans}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                {/* End of Loan Requests Cards */}

           {/* Buttons for Different Options */}
                <Row>
                   {/* <Col>
                    <Button variant="success" onClick={() => handleOptionClick('requestLoan')}>Request Loan</Button>
                  </Col> */}

                <Col md={3}>
                  <Card className="mb-4" style={{ backgroundColor: clickedCard === 'profile' ? '#3f712c' : '#7ec364', cursor: 'pointer' }} onClick={() => handleOptionClick('profile')}>
                    {/* <Card className="mb-4" style={{ backgroundColor: isClicked ? '#3f712c' : '#7ec364', cursor: 'pointer'}} onClick={() => handleOptionClick('profile')}> */}
                      <Card.Body className="text-center">
                        <FaUser size={48} color="#f3faf1" />
                        <h6 className="mt-2" style={{ color: '#f3faf1' }}>View Profile</h6>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="mb-4" style={{ backgroundColor: clickedCard === 'requestLoan' ? '#477f31': '#7ec364' , cursor: 'pointer' }} onClick={() => handleOptionClick('requestLoan')}>
                      <Card.Body className="text-center">
                        <FaMoneyCheckAlt size={48} color="#f3faf1" />
                        <h6 className="mt-2" style={{ color: '#f3faf1' }}>Request Loan</h6>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="mb-4" style={{ backgroundColor: clickedCard === 'viewCrops' ? '#4f8d37': '#7ec364', cursor: 'pointer' }} onClick={() => handleOptionClick('viewCrops')}>
                      <Card.Body className="text-center">
                        <FaRegListAlt size={48} color="#f3faf1" />
                        <h6 className="mt-2" style={{ color: '#f3faf1' }}>View Crops</h6>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="mb-4" style={{ backgroundColor: clickedCard === 'viewFarmers' ? '#579b3c': '#7ec364', cursor: 'pointer' }} onClick={() => handleOptionClick('viewFarmers')}>
                      <Card.Body className="text-center">
                        <FaThList size={48} color="#f3faf1" />
                        <h6 className="mt-2" style={{ color: '#f3faf1' }}>View Farmers</h6>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row>
                    {/* Add new cards for additional functionalities */}
                  <Col md={3}>
                    <Card className="mb-4" style={{ backgroundColor: clickedCard === 'contactAgrarianCenter' ? '#477f31': '#7ec364' , cursor: 'pointer' }} onClick={() => handleOptionClick('contactAgrarianCenter')}>
                      <Card.Body className="text-center">
                        <FaPhone size={48} color="#f3faf1" />
                        <h6 className="mt-2" style={{ color: '#f3faf1' }}>Contact Agrarian Center</h6>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="mb-4" style={{ backgroundColor: clickedCard === 'compareLoan' ? '#4f8d37': '#7ec364', cursor: 'pointer' }} onClick={() => handleOptionClick('compareLoan')}>
                      <Card.Body className="text-center">
                        <FaBalanceScale size={48} color="#f3faf1" />
                        <h6 className="mt-2" style={{ color: '#f3faf1' }}>Compare Loan</h6>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="mb-4" style={{ backgroundColor: clickedCard === 'viewLoan' ? '#579b3c': '#7ec364', cursor: 'pointer' }} onClick={() => handleOptionClick('viewLoan')}>
                      <Card.Body className="text-center">
                        <FaListAlt size={48} color="#f3faf1" />
                        <h6 className="mt-2" style={{ color: '#f3faf1' }}>View Loan</h6>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                {/* End of Buttons for Different Options */}
                
                {/* Render Active Form */}
                {renderActiveForm()}
                {/* End of Render Active Form */}

              </div>
            </div>
          </div>
        </div>
      </div>

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

export default FarmerDash;
