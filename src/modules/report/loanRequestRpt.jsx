import React, { useState } from 'react';
import axios from 'axios';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { Modal, Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { Formik, Field, ErrorMessage } from 'formik';
import districts from '../../data/districData';

const styles = StyleSheet.create({
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: '100%',
    border: '1 solid black',
  },
  tableRow: { display: 'table-row' },
  tableColHeader: {
    display: 'table-cell',
    backgroundColor: '#f0f0f0',
    border: '1 solid black',
    padding: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableColData: {
    display: 'table-cell',
    border: '1 solid black',
    padding: 5,
    textAlign: 'left',
    fontSize: 15,
  },
});

function LoanRequestRpt() {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async (District) => {
    try {
      let url = 'https://localhost:44345/api/loanRequest';
      if (District) {
        url += `?district=${District}`;
      }
      const response = await axios.get(url);
      setUserData(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleExportToExcel = () => {
    if (userData) {
      const worksheet = XLSX.utils.json_to_sheet(userData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Farmers');
      XLSX.writeFile(workbook, 'farmers.xlsx');
    }
  };

  return (
    <Formik initialValues={{ District: '' }} onSubmit={(values) => fetchData(values.District)}>
      {({ handleSubmit }) => (
        <main id="main" className="main">
          <div>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-xl-12">
                <div className="card" style={{ marginTop: '30px' }}>
                  <div className="card-body">
                    <br />
                    <h5 style={{ color: '#88BDAE' }}> Requested Loan Details</h5>
                    <hr className="mx-n3" style={{ color: '#8BDAE', height: '3px' }}></hr>

                    <div className="row">
                      <div class="col-md-4">
                            <div class="mb-3">
                                <label for="District" class="form-label">User ID</label>
                                <input type="text" class="form-control" id="District" name="District"></input>
                            </div>
                        </div>
                      <div className="col-md-4">
                         
                        <div className="mb-3">
                          <label htmlFor="District" className="form-label"> </label>
                          <div className="d-flex justify-content-start">
                            <Button variant="success" onClick={handleSubmit} style={{ width: '150px' }}>Generate Report</Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Modal show={showModal} onHide={handleCloseModal} size="lg">
                      <Modal.Header closeButton>
                        <Modal.Title>Loan Details Report</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {userData && (
                          <Document>
                            <Page>
                              <View style={styles.table}>
                                <View style={styles.tableRow}>
                                  <Text style={styles.tableColHeader}>Request ID</Text>
                                  <Text style={styles.tableColHeader}>FarmerRegNo</Text>
                                  <Text style={styles.tableColHeader}>NIC</Text>                                  
                                  <Text style={styles.tableColHeader}>Neaest Center</Text>
                                  <Text style={styles.tableColHeader}>MicroFinance Company</Text>
                                  <Text style={styles.tableColHeader}>Branch</Text>
                                  <Text style={styles.tableColHeader}>Disired LoanAmount</Text>
                                  <Text style={styles.tableColHeader}>CropType</Text>
                                </View>
                                {userData.map((user, index) => (
                                  <View key={index} style={styles.tableRow}>
                                    <Text style={styles.tableColData}>{user.RequestID}</Text>
                                    <Text style={styles.tableColData}>{user.FarmerRegNo}</Text>
                                    <Text style={styles.tableColData}>{user.NIC}</Text>                                  
                                    <Text style={styles.tableColData}>{user.NeaestAgrarianServiceCenter}</Text>
                                    <Text style={styles.tableColData}>{user.MicroFinanceCompany}</Text>
                                    <Text style={styles.tableColData}>{user.Branch}</Text>
                                    <Text style={styles.tableColData}>{user.DisiredLoanAmount}</Text>
                                    <Text style={styles.tableColData}>{user.CropType}</Text>
                                  </View>
                                ))}
                              </View>
                            </Page>
                          </Document>
                        )}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                          Close
                        </Button>
                        <Button variant="success" onClick={handleExportToExcel}>
                          Export to Excel
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </Formik>
  );
}

export default LoanRequestRpt;
