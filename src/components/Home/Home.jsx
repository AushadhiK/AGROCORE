import React from 'react';
import Header from '../dashboardComponents/Header';
import SideBar from '../SideBar';
import Main from '../Main';
import Footer from '../dashboardComponents/Footer';

function Home() {
  return (
    <>
      <Header />
     <SideBar />
     <Main />
     <Footer />   
     </>
  )
}

export default Home