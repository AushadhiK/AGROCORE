import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';

function ViewLoanHistry() {
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:44345/api/loanRequest/all');
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
    item.RequestID.toString().includes(searchTerm.toLowerCase()) ||     
    item.MicroFinanceCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.AccountStatus.toString().includes(searchTerm.toLowerCase()) ||
    item.DisiredLoanAmount.toString().includes(searchTerm.toLowerCase()) ||
    item.ExpectedComencementDate.toString().includes(searchTerm.toLowerCase())
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
            <th style={headerStyles}>Loan Id</th>
            <th style={headerStyles}>Bank</th>
            <th style={headerStyles}>Branch</th>
            <th style={headerStyles}>Request Amount (Rs.)</th>
            <th style={headerStyles}>Requested Date</th>
            <th style={headerStyles}>Loan Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.RequestID}</td>
              <td>{item.MicroFinanceCompany}</td>
              <td>{item.Branch}</td>
              <td style={{ textAlign: 'right' }}>{item.DisiredLoanAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
              {/* <td>{item.DisiredLoanAmount}</td> */}
              <td>{new Date(item.ExpectedComencementDate).toLocaleDateString()}</td>
              {/* <td>{item.AccountStatus}</td> */}
                <td style={{ textAlign: 'left' }}>
                {item.AccountStatus === 0 ? "Approval Pending" :
                item.AccountStatus === 1 ? "Approved" :
                item.AccountStatus === 3 ? "Rejected" :
                ""}
            </td>
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

export default ViewLoanHistry;
