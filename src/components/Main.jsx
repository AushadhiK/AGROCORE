import React from 'react';
import './dashboardcss/main.css';
import PageTitle from './dashboardComponents/PageTitle';
import Dashboard from './dashboardComponents/Dashboard';


function Main() {
  return (
    <main id="main" className="main">
      <PageTitle page="Dashboard"/>
      <Dashboard /> 
    </main>
  )
}

export default Main