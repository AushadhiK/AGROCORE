import React , { useState, useEffect }from 'react';
import '../dashboardcss/monthCultivation.css';
import CardFilter from './CardFilter';
import MonthCultivationTable from './MonthCultivationTable';

function MonthCultivation() {

const  [items,setItem] =useState([]);
const [filter, setFilter] = useState('March 2024');
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
    <div className="card recent-sales overflow-auto">
    <CardFilter filterChange={hadleFilterChange} />

    <div className="card-body">
      <h5 className="card-title">
        Monthly Cultivation <span>| {filter}</span>
      </h5>
      <MonthCultivationTable items={items} />
    </div>
  </div>
  );
}

export default MonthCultivation