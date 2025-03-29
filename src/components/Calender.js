import React, { useState } from 'react';
import "./Calender.css";
import Logout from './Logout';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handlePrevYear = () => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(currentDate.getFullYear() - 1);
    setCurrentDate(newDate);
  };

  const handleNextYear = () => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(currentDate.getFullYear() + 1);
    setCurrentDate(newDate);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());
    const firstDayOfMonth = getFirstDayOfMonth(currentDate.getMonth(), currentDate.getFullYear());
    const today = new Date().getDate(); // Get today's date

    let calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div className="empty-day" key={`empty-${i}`}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
      calendarDays.push(
        <div className={`day ${isToday ? 'today' : ''}`} key={day}>
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div> 
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevYear}>&lt;&lt;</button>
        <button>{currentDate.getFullYear()}</button>
        <button onClick={handleNextYear}>&gt;&gt;</button>
      </div>
      <div className="calendar-month">
        <button onClick={handlePrevMonth}>&lt;</button>
        <button>{months[currentDate.getMonth()]}</button>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        <div className="day-name">Sun</div>
        <div className="day-name">Mon</div>
        <div className="day-name">Tue</div>
        <div className="day-name">Wed</div>
        <div className="day-name">Thu</div>
        <div className="day-name">Fri</div>
        <div className="day-name">Sat</div>
        
        {renderCalendar()}
      </div>

    </div>
    <Logout/>
    </div>

  );
};

export default Calendar;
