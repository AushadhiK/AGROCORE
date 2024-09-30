import React, { useState, useEffect }from 'react';
import CardFilter from './CardFilter';
import '../dashboardcss/loanProcessStatus.css'; 
import LoanProcessStatusTable from './LoanProcessStatusTable';

function LoanProcessStatus() {


    const  [reqId,setItem] =useState([]);
    const [filter, setFilter] = useState('Today');
    const hadleFilterChange = filter =>{
        setFilter(filter);
    };
    
    const fetchData = () =>{
        fetch('http://localhost:4000/recentsales')
        .then(res => res.json())
        .then(data => {
            setItem(data);
        })
        .catch(e => console.log(e.message));
    };
    
    useEffect(() =>{
        fetchData();
    }, []);

  return (
    <div className="card Loan-process-status overflow-auto">
    <CardFilter filterChange={hadleFilterChange} />

    <div className="card-body">
      <h5 className="card-title">
        Loan Request Status <span>| {filter}</span>
      </h5>
      <LoanProcessStatusTable reqId={reqId} />
    </div>
  </div>
  )
}

export default LoanProcessStatus