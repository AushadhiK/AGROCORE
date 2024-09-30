import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';

function ViewCrops() {
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:44345/api/CropMaster/all');
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
    item.CropID.toString().includes(searchTerm.toLowerCase()) ||
    item.CropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.TimeToMature.toString().includes(searchTerm.toLowerCase())  ||
    item.Species.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Diseases.toLowerCase().includes(searchTerm.toLowerCase())
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
            <th style={headerStyles}>Crop ID</th>
            <th style={headerStyles}>Name</th>
            <th style={headerStyles}>Type</th>
            <th style={headerStyles}>Time To Mature(Month)</th>
            <th style={headerStyles}>Species</th>
            <th style={headerStyles}>Main Diseases</th>
            
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.CropID}</td>
              <td>{item.CropName}</td>
              <td>{item.Type}</td>
              <td>{item.TimeToMature}</td>
              <td>{item.Species}</td> 
               {/* <td>{item.Address2}</td> */}
              <td>{item.Diseases}</td>
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

export default ViewCrops;
