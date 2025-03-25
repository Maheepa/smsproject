import React from 'react';
import Navbar from '../components/Navbar';  // Correct path to Navbar
import Login from '../components/Login';
import "./Homepage.css";


export default function Homepage() {
  return (
    <div className='background-container'>
    <Navbar/>
    <Login/>
      <div>
        <h1>This is the Home Page</h1>
      </div>
    </div>
  );
}
