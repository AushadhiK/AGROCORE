import React from 'react';
import './dashboardcss/sideBar.css';
import navList from '../data/navItem';
import NavItem from './dashboardComponents/NavItem';
//import {  NavLink } from 'react-router-dom';
import { AgrarianCenter } from '../modules/agrarianDpt/agrarianCenter';
import { FarmerDetails } from '../modules/agrarianDpt/farmerDetails';
import { CropDetails } from '../modules/agrarianDpt/cropDetails';
import { useNavigate } from 'react-router-dom';//use for logout Navigation
 import {ContactFarmers} from '../modules/farmer/ContactFarmers';

function SideBar() {
  const navigation = useNavigate()
  return (    
    <aside id="siderbar" className='sidebar'>
        <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a className="nav-link " href="/main">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-menu-button-wide"></i>
            <span>Agrarian Service Center</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="components-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
               <a href="/AgrarianDpt/agrarianCenter">
                 <i className="bi bi-circle"></i>
                 <span>Agrarian Center </span>
                </a>
              
            </li>
            <li>
            <a href="/farmer/ContactFarmers">
                 <i className="bi bi-circle"></i>
                 <span>Farmer Details</span>
               </a>              
            </li>
            <li>
                <a href="#">
                  <i className="bi bi-circle"></i>
                   <span>Maintain Crop</span>
                </a>
              
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Introduce New varities</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#forms-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-journal-text"></i>
            <span>Microfinance Company</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="forms-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
            <a href="/microFinance/CreateLoan">
                <i className="bi bi-circle"></i>
                <span>Create Loan</span>
              </a>
            </li>
            <li>
              <a href="/microFinance/ApproveRequest">
                <i className="bi bi-circle"></i>
                <span>Approve Request</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Loan Dash board</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#tables-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>Farmer</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="tables-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="/farmer/ViewProfile">
                <i className="bi bi-circle"></i>
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a href="/farmer/loanRequest">
                <i className="bi bi-circle"></i>
                <span> Loan Request</span>
              </a>
            </li>
            <li>
              <a href="/farmer/compareScheme">
                <i className="bi bi-circle"></i>
                <span>Compare Loan Scheme</span>
              </a>
            </li>
            <li>
              <a href="/farmer/CreateGruops">
                <i className="bi bi-circle"></i>
                <span>Group Creation</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#charts-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-bar-chart"></i>
            <span>Reports</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="charts-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
            <a href="/Report/loanRequestRpt">
                <i className="bi bi-circle"></i>
                <span>Loan Request Report(for bank)</span>
              </a>
            </li>
            <li>
            <a href="/Report/farmerDetailRpt">
                <i className="bi bi-circle"></i>
                <span>Farmer Details(for bank /Agri)</span>
              </a>
            </li>


            <li>
               <a href="/Report/farmerDetailRpt">
                 <i className="bi bi-circle"></i>
                 <span>Agrarian Center </span>
                </a>
              
            </li>


            <li>
            <a href="/Report/farmerDetailRpt">
                <i className="bi bi-circle"></i>
                <span>Farmer Crop Details(Farmers/Agri/Bank)</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Harverst Report(Monthly)</span>
              </a>
            </li>

          </ul>
        </li>

        <li className="nav-item" onClick={()=>navigation('/login')}>
          <a
          className="nav-link collapsed"
          data-bs-target="#icons-nav"
          data-bs-toggle="collapse"
          //href="/login"
          >
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'green', marginRight: '0.5rem' }}></div>
          <span>Logout</span>         
          </a>          
          </li>


        {/* <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#icons-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-gem"></i>
            <span>Other Services</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="icons-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Bootstrap Icons</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Remix Icons</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Boxicons</span>
              </a>
            </li>
          </ul>
        </li> */}

  
          
      </ul>          
      
    </aside>
   
  );
}

export default SideBar