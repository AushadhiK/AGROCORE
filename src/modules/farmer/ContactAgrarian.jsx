import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';

function ContactFarmers() {
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:44345/api/agrarianCenters/allcenters');
        setTableData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = tableData.filter(item => 
    item.CenterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.District.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.OfficerIncharge.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Address1.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ContactNumber.toString().includes(searchTerm.toLowerCase())
  );

 

  const tableStyles = {
    maxHeight: '400px',
    overflowY: 'auto',
    display: 'block'
  };

  const cardStyles = {
    borderRadius: "25px",
    overflow: 'visible',
  };

  const headerStyles = {
    textAlign: 'center',
    verticalAlign: 'top'
  };

  const Table = ({ tableData }) => {
    return (
      <table className="table" style={tableStyles}>
        <thead>
          <tr>
            <th style={headerStyles}>Center Name</th>
            <th style={headerStyles}>District</th>
            <th style={headerStyles}>Officer In Charge</th>
            <th style={headerStyles}>Email</th>
            <th style={headerStyles}>Address</th>
            <th style={headerStyles}>Contact Number</th>
            
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.CenterName}</td>
              <td>{item.District}</td>
              <td>{item.OfficerIncharge}</td>
              <td>{item.Email}</td>
              <td>{item.Address1}</td> 
               {/* <td>{item.Address2}</td> */}
              <td>{item.ContactNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <section
        className="p-5 w-100"
        style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
      >
        <div className="row">
          <div className="col-1"> </div>
          <div className="col-10">
            <div className="card text-black" style={cardStyles}>
              <div className="card-body p-md-5">
                <Fragment>
                  <div className="mb-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Search" 
                      value={searchTerm} 
                      onChange={handleSearchChange} 
                    />
                  </div>
                  <Table tableData={filteredData} />
                </Fragment>
              </div>
            </div>
          </div>
          <div className="col-1"> </div>
        </div>
      </section>
    </div>
  );
}

export default ContactFarmers;
