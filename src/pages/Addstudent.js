// import React from 'react'
// import Calender from '../components/Calender'
// import Navbar from '../components/Navbar'
// import Login from '../components/Logout'
// import './Addstudent.css'

// export default function Addstudent() {
//   return (
//     <div><Navbar/>
//         <div><Login/>
//         <div className="container">
//             <div>
//       <h2 className="heading">Add Student</h2>
//       <form className="form">
//         <div className="row">
//           <div className="inputGroup">
//             <label>First Name</label>
//             <input type="text" className="input" />
//           </div>
//           <div className="inputGroup">
//             <label>Last Name</label>
//             <input type="text" className="input" />
//           </div>
//         </div>

//         <div className="inputGroupFull">
//           <label>Address</label>
//           <input type="text" className="input" />
//         </div>

//         <div className="row">
//           <div className="inputGroup">
//             <label>Date of Birth</label>
//             <input type="date" className="input" />
//           </div>
//           <div className="inputGroup">
//             <label>Intake</label>
//             <select className="input">
//               <option>39</option>
//               <option>40</option>
//               <option>41</option>
//               <option>42</option>
//             </select>
//           </div>
//         </div>

//         <div className="inputGroupFull">
//           <label>Student ID</label>
//           <input type="text" className="input" />
//         </div>
//       </form>
//     </div>
//     </div>
//         </div>
//     </div>
//   )
// }


import React, { useState,useEffect } from "react";
import { db, auth } from "../firebase"; // Import Firebase database instance
import { ref, push,get,remove } from "firebase/database"; // Firebase functions for writing data
import Navbar from "../components/Navbar";
import Login from "../components/Logout";
import "./Addstudent.css";

export default function AddStudent() {
  // State variables for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [intake, setIntake] = useState("39");
  const [studentId, setStudentId] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.email); // Set the logged-in user's email
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to save student data to Firebase
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form refresh

    if (!firstName || !lastName || !address || !dob || !studentId) {
      alert("Please fill all fields.");
      return;
    }

    const studentsRef = ref(db, "students"); // Reference to 'students' node in Realtime Database

    // Data object to save
    const newStudent = {
      firstName,
      lastName,
      address,
      dob,
      intake,
      studentId,
    };

    // Push new student data to Firebase
    push(studentsRef, newStudent)
      .then(() => {
        alert("Student added successfully!");
        saveLog(`Add student ${studentId}`);
        // Clear form fields
        setFirstName("");
        setLastName("");
        setAddress("");
        setDob("");
        setStudentId("");
        setIntake("39");
      })
      .catch((error) => {
        console.error("Error adding student:", error);
        alert("Failed to add student. Please try again.");
      });
  };

    const saveLog = async (description) => {
      if (!currentUser) return; // Ensure we have a valid user before saving the log
  
      const logsRef = ref(db, "logs");
  
      const newLog = {
        user: currentUser, // Store logged-in user's email
        description,
        timestamp: new Date().toISOString(),
      };
  
      push(logsRef, newLog)
        .then(() => cleanLogs())
        .catch((error) => console.error("Error saving log:", error));
    };
  
    const cleanLogs = async () => {
      const logsRef = ref(db, "logs");
  
      get(logsRef).then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          const logKeys = Object.keys(data);
          if (logKeys.length > 10) {
            const oldestLogKey = logKeys[0]; // Remove the oldest log
            remove(ref(db, `logs/${oldestLogKey}`));
          }
        }
      });
    };

  return (
    <div>
      <Navbar />
        <div className="container">
          <h2 className="heading">Add Student</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="inputGroup">
                <label>First Name</label>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="inputGroup">
                <label>Last Name</label>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="inputGroupFull">
              <label>Address</label>
              <input
                type="text"
                className="input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="row">
              <div className="inputGroup">
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="input"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div className="inputGroup">
                <label>Intake</label>
                <select
                  className="input"
                  value={intake}
                  onChange={(e) => setIntake(e.target.value)}
                >
                  <option value="39">39</option>
                  <option value="40">40</option>
                  <option value="41">41</option>
                  <option value="42">42</option>
                </select>
              </div>
            </div>

            <div className="inputGroupFull">
              <label>Student ID</label>
              <input
                type="text"
                className="input"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>

            <button type="submit" className="submitBtn">Add Student</button>
          </form>
        </div>
    </div>
  );
}

