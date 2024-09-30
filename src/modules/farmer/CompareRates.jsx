import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';

function CompareRates() {
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:44345/api/LoanType/loanTypes');
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
    item.LoanType.toString().includes(searchTerm.toLowerCase()) ||
    item.LoanCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.MaxLoanAmount.toString().includes(searchTerm.toLowerCase())  ||
    item.InterestRate.toString().includes(searchTerm.toLowerCase())  ||
    item.Term.toString().includes(searchTerm.toLowerCase())  ||
    item.OfferdBank.toLowerCase().includes(searchTerm.toLowerCase())    
  ); 

  // Find the lowest and second lowest interest rates
  const sortedRates = filteredData.map(item => item.InterestRate).sort((a, b) => a - b);
  const lowestRate = sortedRates[0];
  const secondLowestRate = sortedRates[1];

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
            <th style={headerStyles}>Loan Type</th>
            <th style={headerStyles}>Loan Category</th>
            <th style={headerStyles}>Max Loan Amount</th>
            <th style={headerStyles}>Rate</th>
            <th style={headerStyles}>Term</th>
            <th style={headerStyles}>Offerd By</th>
            
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.LoanType}</td>
              <td>{item.LoanCategory}</td>
              <td style={{ textAlign: 'right' }}>{item.MaxLoanAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
              {/* <td style={{ textAlign: 'right' }}>{item.InterestRate}</td> */}
              <td style={{ textAlign: 'right', color: item.InterestRate === lowestRate ? '#cf3a24' : item.InterestRate === secondLowestRate ? '#12a451' : 'inherit' }}>
                {item.InterestRate}
              </td>
              <td>{item.Term}</td>
              <td>{item.OfferdBank}</td>                
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

export default CompareRates;
