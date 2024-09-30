import React ,{ useState, useEffect} from 'react';
import '../dashboardcss/recentActivity.css';
import CardFilter from './CardFilter'
import RecentActivityItem from './RecentActivityItem';

function RecentActivity() {
   const [recentAct, setItem] = useState([]);
   const [filter, setFilter] = useState('March');
   const handleFilterChange = filter => {
     setFilter(filter);
   };

   const fetchData = () => {
    fetch('http://localhost:4000/recentactiviy')
      .then(res => res.json())
      .then(data => {
        setItem(data);
      })
      .catch(e => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="card">
    <CardFilter filterChange={handleFilterChange} />

    <div className="card-body">
      <h5 className="card-title">
        Recent Activity <span>| {filter}</span>
      </h5>

      <div className="activity">
        {recentAct &&
          recentAct.length > 0 &&
          recentAct.map(item => (
            <RecentActivityItem key={item._id} item={item} />
          ))}
      </div>
    </div>
  </div>
  )
}

export default RecentActivity