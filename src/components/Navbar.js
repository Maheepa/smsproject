import React from "react";
import "./Navbar.css";
import logo from '../images/studlogo.png'
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo">
        <div>
        <img src={logo} alt="studlogo.png" /></div>
        <span>StudHUB</span>
      </div>
      <ul className="nav-links">
        
        {/* <li><Link to="/">Home</Link></li> */}        
        <li><a href="/pages/student">Student</a></li>
        <li><a href="/pages/coursepage">Courses</a></li>
        <li><a href="/pages/Log">Logs</a></li>
        <li><a href="/pages/Admin">Administrators</a></li>
      </ul>
    </nav>
  );
}
