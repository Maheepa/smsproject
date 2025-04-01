import React from 'react';
import './Coursepage.css';  // Correct path to your CSS file
import Navbar from '../components/Navbar';
import { useNavigate, Link } from "react-router-dom";
import Logout from '../components/Logout';
import Slidebar from '../components/Slidebar';
import Calendar from '../components/Calender';

export default function Studentpage() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/pages/Assigncourses');
  const handleClick1 = () => navigate('/pages/courses');
  

  return (
  <div className='bgc'><Navbar/>
  
  
  
    <div className="container3">
    <div className="left-section-c">
      <Slidebar/>
      </div><div className='right-section-c'>
      {/* Student Actions */}
      <div className='course-page'>
      <div className="course-actions">
      
        <button className="action-btncourse" onClick={handleClick}>Add Courses</button>
        <button className="action-btncourse" onClick={handleClick1}>List Courses</button>
        </div>
      </div>
      </div>
      </div>
    
    
    </div>
  );
}
