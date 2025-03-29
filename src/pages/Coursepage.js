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
  

  // const handleClick1= () => navigate('/pages/ListStudent');
  // const handleClick2= () => navigate('/pages/Assigncourses');
  return (
  <div><Navbar/>
  {/* <div><Slidebar/></div> */}
  
  
    <div className="course-page">
      <div><Slidebar/>
      {/* Student Actions */}
      <div className="course-actions">
      {/* <button className="adminbutton" onClick={handleClick}>Admin</button> */}
        <button className="action-btncourse" onClick={handleClick}>Add Courses</button>
        <button className="action-btncourse" onClick={handleClick1}>List Courses</button>
  
      </div>
      </div>
    </div>
    
    </div>
  );
}
