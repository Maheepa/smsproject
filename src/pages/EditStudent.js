// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { db } from "../firebase";
// import { ref, update } from "firebase/database";
// import Navbar from "../components/Navbar";
// import Logout from "../components/Logout";
// // import "./EditStudent.css";

// export default function EditStudent() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const student = location.state.student;

//   const [firstName, setFirstName] = useState(student.firstName);
//   const [lastName, setLastName] = useState(student.lastName);
//   const [address, setAddress] = useState(student.address);
//   const [dob, setDob] = useState(student.dob);
//   const [intake, setIntake] = useState(student.intake);

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     const studentRef = ref(db, `students/${student.id}`);

//     update(studentRef, { firstName, lastName, address, dob, intake })
//       .then(() => {
//         alert("Student updated successfully!");
//         navigate("/pages/student");
//       })
//       .catch((error) => {
//         console.error("Error updating student:", error);
//         alert("Failed to update student.");
//       });
//   };

//   return (
//     <div>
//       <Navbar />
//       <Logout />
//       <div className="container">
//         <h2>Edit Student</h2>
//         <form onSubmit={handleUpdate}>
//           <label>First Name</label>
//           <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

//           <label>Last Name</label>
//           <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />

//           <label>Address</label>
//           <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

//           <label>Date of Birth</label>
//           <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />

//           <label>Intake</label>
//           <select value={intake} onChange={(e) => setIntake(e.target.value)}>
//             <option value="39">39</option>
//             <option value="40">40</option>
//             <option value="41">41</option>
//             <option value="42">42</option>
//           </select>

//           <button type="submit">Update Student</button>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase"; // Import auth
import { ref, update, push, get, remove } from "firebase/database";
import Navbar from "../components/Navbar";
import Logout from "../components/Logout";

export default function EditStudent() {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state.student;

  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);
  const [address, setAddress] = useState(student.address);
  const [dob, setDob] = useState(student.dob);
  const [intake, setIntake] = useState(student.intake);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const studentRef = ref(db, `students/${student.id}`);

    update(studentRef, { firstName, lastName, address, dob, intake })
      .then(() => {
        alert("Student updated successfully!");
        saveLog(`Updated student ${student.studentId}`);
        navigate("/pages/student");
      })
      .catch((error) => {
        console.error("Error updating student:", error);
        alert("Failed to update student.");
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
        <h2>Edit Student</h2>
        <form onSubmit={handleUpdate}>
          <label>First Name</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

          <label>Last Name</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />

          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

          <label>Date of Birth</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />

          <label>Intake</label>
          <select value={intake} onChange={(e) => setIntake(e.target.value)}>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
          </select>

          <button type="submit">Update Student</button>
        </form>
      </div>
    </div>
  );
}
