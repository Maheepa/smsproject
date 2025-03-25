import React from 'react'
import Calender from '../components/Calender'
import Navbar from '../components/Navbar'
import Login from '../components/Login'
import './Addstudent.css'

export default function Addstudent() {
  return (
    <div><Navbar/>
        <div><Login/>
        <div className="container">
            <div><Calender/>
      <h2 className="heading">Add Student</h2>
      <form className="form">
        <div className="row">
          <div className="inputGroup">
            <label>First Name</label>
            <input type="text" className="input" />
          </div>
          <div className="inputGroup">
            <label>Last Name</label>
            <input type="text" className="input" />
          </div>
        </div>

        <div className="inputGroupFull">
          <label>Address</label>
          <input type="text" className="input" />
        </div>

        <div className="row">
          <div className="inputGroup">
            <label>Date of Birth</label>
            <input type="date" className="input" />
          </div>
          <div className="inputGroup">
            <label>Degree Program</label>
            <select className="input">
              <option>Select</option>
              <option>Computer Science</option>
              <option>Business</option>
              <option>Engineering</option>
            </select>
          </div>
        </div>

        <div className="inputGroupFull">
          <label>Student ID</label>
          <input type="text" className="input" />
        </div>
      </form>
    </div>
    </div>
        </div>
    </div>
  )
}
