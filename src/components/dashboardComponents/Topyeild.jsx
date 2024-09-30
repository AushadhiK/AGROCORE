import React ,{useState, useEffect }from 'react';
 
import CardFilter from './CardFilter';
import TopyeildCrops from './TopyeildCrops';
import '../dashboardcss/topyeild.css';

function Topyeild() {
    const [crops,setCrop] = useState([]);
    const [filter, setFilter] = useState('March');
    const hadleFilterChange = filter =>{
        setFilter(filter);
    };

    const fetchData = () =>{
        fetch('http://localhost:4000/topselling')
    .then(res => res.json())
    .then(data => {
      setCrop(data);
    })
    .catch(e => console.log(e.message));
};

useEffect(() => {
    fetchData();
}, []);

  return (
    <div className="card top-yeild overflow-auto">
      <CardFilter filterChange={hadleFilterChange} />

      <div className="card-body pb-0">
        <h5 className="card-title">
          Highest Yeild For the month of <span>| {filter}</span>
        </h5>

        <table className="table table-borderless">
          <thead className="table-light">
            <tr>
              <th scope="col">Preview</th>
              <th scope="col">Crop</th>
              <th scope="col"> fFarmers</th>
              <th scope="col">Yeild</th>
              <th scope="col">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {crops &&
              crops.length > 0 &&
              crops.map(crop => <TopyeildCrops key={crop._id} crop={crop} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Topyeild