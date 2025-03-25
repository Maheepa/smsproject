import React from 'react';
import './Studentpage.css';  // Correct path to your CSS file
import Navbar from '../components/Navbar';
import Login from '../components/Login';


export default function Studentpage() {
  return (
  <div><Navbar/>
  <div><Login/>
    <div className="student-page">
      
    
      {/* Calendar Section */}
      <div className="calendar">
        <h3>July 2021</h3>
        <div className="calendar-grid">
          <div className="day-header">Mo</div>
          <div className="day-header">Tu</div>
          <div className="day-header">We</div>
          <div className="day-header">Th</div>
          <div className="day-header">Fr</div>
          <div className="day-header">Sa</div>
          <div className="day-header">Su</div>
          {/* Example Days (you can generate dynamically) */}
          <div className="day"></div> <div className="day"></div>
          <div className="day"></div> <div className="day"></div>
          <div className="day"></div> <div className="day"></div>
          <div className="day active">6</div> {/* Active Day */}
        </div>
      </div>

      {/* Student Actions */}
      <div className="student-actions">
        <button className="action-btn">Add Student</button>
        <button className="action-btn">Remove Student</button>
        <button className="action-btn">List Students</button>
        <button className="action-btn">Assign Courses</button>
      </div>
    </div>
    </div>
    </div>
  );
}
