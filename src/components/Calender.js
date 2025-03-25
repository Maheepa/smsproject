import React from 'react';
import './Calender.css';
export default function Calender() {
  return (
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
  )
}
