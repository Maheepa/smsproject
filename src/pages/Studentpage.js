import React from 'react';
import './Studentpage.css';  // Correct path to your CSS file
import Navbar from '../components/Navbar';
import { useNavigate, Link } from "react-router-dom";
import Logout from '../components/Logout';
import Slidebar from '../components/Slidebar';
import Calendar from '../components/Calender';

export default function Studentpage() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/pages/Addstudent');
  const handleClick1 = () => navigate('/pages/Liststudent');


  // const handleClick1= () => navigate('/pages/ListStudent');
  // const handleClick2= () => navigate('/pages/Assigncourses');
  return (
  <div className='bg'><Navbar/>
  {/* <div><Slidebar/></div> */}


    <div className="container2">
      <div className="left-section">
      <Slidebar/>
      </div>
      <div className="right-section">
      <div className="student-page">

{/* Student Actions */}
<div className="student-actions">
{/* <button className="adminbutton" onClick={handleClick}>Admin</button> */}
  <button className="action-btn" onClick={handleClick}>Add Student</button>
  <button className="action-btn" onClick={handleClick1}>List Students</button>
  
  
</div>
</div>
      </div>
    </div>
    </div>

  );
}
