import React ,{useState,useEffect}from 'react';
import '../dashboardcss/dashboard.css';  
 import Cards from './Cards';
import Reports from './Reports';
import MonthCultivation from './MonthCultivation';
import LoanProcessStatus from './LoanProcessStatus';
import Topyeild from './Topyeild';
import RecentActivity from './RecentActivity';
import News from './News';


function Dashboard() {
    const [cards, setCards] = useState([]);

    const fetchData = () => {
             fetch('http://localhost:4000/cards')
             .then (res => res.json())
             .then(data => {
                setCards(data);
             })
             .catch (e => console.loge(e.message));
    };
    //to use i have write useeftect function
    useEffect(()=>{
        fetchData();
    },[]);

  return (
     <section className="dashboard section">
       <h2>Towards Empowering Farmers Through Micro-Finance Services</h2>

       <div className="row">
          <div className="col-lg-8">
            <div className="row">     
                <Cards />              
                <div className="col-12">
                 <Reports />   
                </div>                
                <div className="col-12">
                 <LoanProcessStatus />
                </div>
                <div className="col-12">
                 <MonthCultivation />
                </div>
                <div className="col-12">
                  <Topyeild />                     
                </div>
            </div>
       </div>
            
         {/* right handside    */}
       <div className="col-lg-4">        
         <RecentActivity />   
         <News />       
       </div>
        {/* <div className="col-lg-4">
            <div className="row"></div>
        </div>  */}
       </div>
     </section>
  );
}

export default Dashboard