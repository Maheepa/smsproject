import React from "react";
import "./Navbar.css";
import logo from '../images/studlogo.png'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo"><div>
        <img src={logo} alt="studlogo.png" /></div>
        <span>StudHUB</span>
      </div>
      <ul className="nav-links">
        <li className="active"><a href="#">Home</a></li>
        <li><a href="#">Student</a></li>
        <li><a href="#">Courses</a></li>
        <li><a href="#">Logs</a></li>
        <li><a href="#">Administrators</a></li>
      </ul>
    </nav>
  );
}
