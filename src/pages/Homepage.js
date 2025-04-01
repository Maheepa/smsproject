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
    <div className='homelogo'>
    <img src={logo} alt="studlogo.png" /></div>
      <div>
        <h1 className='homehead'>StudHUB</h1>
        <h2 className='wel'>Welcome, </h2>
        <p className='welpara'> to studHUB, the ultimate Student Management System! As an administrator, you now have the power to effortlessly manage student records, assign and delete courses, and maintain an organized database. studHUB streamlines your administrative tasks, making it easier than ever to ensure smooth student management. Explore the features and start enhancing your workflow with studHUB today! </p>
      </div>
    </div>
    
  );
}
