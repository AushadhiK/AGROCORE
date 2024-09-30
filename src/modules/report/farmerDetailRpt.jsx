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
    fontSize: 12,
  },
});

function FarmerDetailRpt() {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async (District) => {
    try {
      let url = 'https://localhost:44345/api/farmer';
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
                    <h5 style={{ color: '#88BDAE' }}> Farmer Details Report(District Wise)</h5>
                    <hr className="mx-n3" style={{ color: '#8BDAE', height: '3px' }}></hr>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="District" className="form-label">Filter By District</label>
                          <div className="d-flex">                              
                            <Field as="select" id="District" name="District" className="form-control">
                              <option value="">Select District</option>
                              {districts.map(district => (
                                <option key={district} value={district}>{district}</option>
                              ))}
                            </Field>
                          </div>
                          <ErrorMessage name="district" component="div" className="text-danger" />
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
                        <Modal.Title>District-wise Farmer Details Report</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {userData && (
                          <Document>
                            <Page>
                              <View style={styles.table}>
                                <View style={styles.tableRow}>
                                  <Text style={styles.tableColHeader}>Registration No</Text>
                                  <Text style={styles.tableColHeader}>Name</Text>
                                  <Text style={styles.tableColHeader}>Mobile Number</Text>
                                  <Text style={styles.tableColHeader}>Email</Text>
                                  <Text style={styles.tableColHeader}>District</Text>
                                  <Text style={styles.tableColHeader}>Postal Code</Text>
                                  <Text style={styles.tableColHeader}>Address 1</Text>
                                  <Text style={styles.tableColHeader}>Address 2</Text>
                                </View>
                                {userData.map((user, index) => (
                                  <View key={index} style={styles.tableRow}>
                                    <Text style={styles.tableColData}>{user.FarmerRegistartionNo}</Text>
                                    <Text style={styles.tableColData}>{user.FullName}</Text>
                                    <Text style={styles.tableColData}>{user.MobileNumber}</Text>
                                    <Text style={styles.tableColData}>{user.Email}</Text>
                                    <Text style={styles.tableColData}>{user.District}</Text>
                                    <Text style={styles.tableColData}>{user.PostalCode}</Text>
                                    <Text style={styles.tableColData}>{user.Address1}</Text>
                                    <Text style={styles.tableColData}>{user.Address2}</Text>
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

export default FarmerDetailRpt;
