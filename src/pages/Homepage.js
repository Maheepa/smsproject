import React from 'react';
import Navbar from '../components/Navbar';  // Correct path to Navbar
import Logout from '../components/Logout';
import "./Homepage.css";
import { useNavigate, Link } from "react-router-dom";
import Calendar from '../components/Calender';
import logo from '../images/studlogo.png'


export default function Homepage() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/components/Login');
  return (
    
    <div className='background-container'>
    
    <button className="login-btn" onClick={handleClick}>Login</button>
    {/* <div className='homelogo'>
    <img src={logo} alt="studlogo.png" /></div> */}
      <div>
        <h1 className='homehead'>StudHUB</h1>
      </div>
    </div>
    
  );
}
