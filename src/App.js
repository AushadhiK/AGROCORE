//import icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

//import Boostraps
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'


import './App.css';


import {  createBrowserRouter,  RouterProvider,} from "react-router-dom"; 

import Header from './components/dashboardComponents/Header';
import SideBar from './components/SideBar';
import Footer from './components/dashboardComponents/Footer';
import Main from './components/Main';
import AgrarianCenter from './modules/agrarianDpt/agrarianCenter';
import Registration from './registration/Registration';
 
import Auth from './auth/Auth';
 
import LoanRequest from './modules/farmer/loanRequest'
 
 import CreateGruops from './modules/farmer/CreateGruops'
import ViewProfile from './modules/farmer/ViewProfile';
import CompareScheme from './modules/farmer/compareScheme';
import ApproveRequest from './modules/microFinance/ApproveRequest';
import FarmerDetailRpt from './modules/report/farmerDetailRpt';
import LoanRequestRpt from './modules/report/loanRequestRpt';
import FarmerDash from './modules/farmer/FarmerDash';
import ContactFarmers from './modules/farmer/ContactFarmers';
import CreateLoan from './modules/microFinance/CreateLoan';
 

 

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Registration/>
    },
    {
      path: "/login",
      element: <Auth/>
    },
    {
      path: "/main",
      element: (
        <>
          <Header />
          <SideBar />
          <Main /> <Footer />
        </>
      ),
    },
    {
      path: "/agrarianDpt/agrarianCenter",
      element: (
        <>
          <Header />
          <SideBar />
          <AgrarianCenter /> <Footer />
        </>
      ),
    },
    {
      path: "/farmer/loanRequest",
      element: (
        <>
          <Header />
          <SideBar />
            <LoanRequest /> 
          <Footer />
        </>
      ),
    },
    {
      path: "/farmer/ViewProfile",
      element: (
        <>
          {/* <Header /> */}
          <SideBar />
            <ViewProfile /> 
          <Footer />
        </>
      ),
    },
    {
      path: "/farmer/CreateGruops",
      element: (
        <>
          <Header />
          <SideBar />
            <CreateGruops /> 
          <Footer />
        </>
      ),
    },

    {
      path: "/farmer/compareScheme",
      element: (
        <>
          <Header />
          <SideBar />
            <CompareScheme /> 
          <Footer />
        </>
      ),
    },
    {
      path: "/microFinance/ApproveRequest",
      element: (
        <>
          <Header />
          <SideBar />
            <ApproveRequest /> 
          <Footer />
        </>
      ),
    },
    {
      path: "/Report/loanRequestRpt",
      element: (
        <>
          <Header />
          <SideBar />
          <LoanRequestRpt />
          <Footer />
        </>
      ),
    },
    {
      path: "/Report/farmerDetailRpt",
      element: (
        <>
          <Header />
          <SideBar />
          <FarmerDetailRpt />
          <Footer />
        </>
      ),
    },
    {
      path: "/farmer/FarmerDash",
      element: (
        <>
          { <Header /> }
          <SideBar />
            <FarmerDash /> 
          <Footer />
        </>
      ),
    },
    {
      path: "/farmer/ContactFarmers",
      element: (
        <>
          { <Header /> }
          <SideBar />
            <ContactFarmers /> 
          <Footer />
        </>
      ),
    },   
    {
      path: "/microFinance/CreateLoan",
      element: (
        <>
          { <Header /> }
          <SideBar />
            <CreateLoan /> 
          <Footer />
        </>
      ),
    },
   
   
  ]);

  return ( 
    <>    
       {/* <Auth />       */}  
     {/* <CreateGruops />  */}
 {/* <Report />  */}
      
           {/* <Registration />   */}
            {/* <Header />
      <SideBar />
      <RouterProvider router={router} />
      <Footer/>        */}


<RouterProvider router={router} />
    </>
  );
}

export default App;