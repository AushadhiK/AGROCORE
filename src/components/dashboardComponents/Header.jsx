 import React from 'react';
 import '../dashboardcss/header.css';
 import Logo from './Logo';
import SearchBar from './SearchBar';
import Nav from './Nav';
    
 function Header() {
   return (
     <header id='header' className="header fixed-top d-flex align-items-center">
      {/* Aushadhi Kahapalalarachchi  */}
      {/* {logo} */      }
       <Logo />
      {/* {searchbar} */}
      {/* <SearchBar /> */}
      {/* {nav} */}
      <Nav />
     </header>
   )
 }
 
 export default Header
