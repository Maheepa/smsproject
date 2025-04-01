import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase"; // Import Firebase database instance
import { ref, push, get, remove } from "firebase/database"; // Firebase functions for writing data
import Navbar from "../components/Navbar";
import Slidebar from "../components/Slidebar";
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

  // Function to generate student ID
  const generateStudentId = (intake) => {
    // Reference to 'students' node filtered by intake
    const studentsRef = ref(db, "students");
    
    return new Promise((resolve, reject) => {
      get(studentsRef)
        .then((snapshot) => {
          const data = snapshot.val();
          if (data) {
            // Filter students by the selected intake
            const intakeStudents = Object.values(data).filter(student => student.intake === intake);
            // Generate student ID based on the number of students in the selected intake
            const studentCount = intakeStudents.length;
            const newStudentId = `${intake}${String(studentCount + 1).padStart(3, "0")}`; // Format as "40xxx"
            resolve(newStudentId);
          } else {
            // If no data, return the first student ID
            resolve(`${intake}001`);
          }
        })
        .catch((error) => {
          console.error("Error fetching students:", error);
          reject(error);
        });
    });
  };

  // Function to save student data to Firebase
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form refresh

    if (!firstName || !lastName || !address || !dob) {
      alert("Please fill all fields.");
      return;
    }

    generateStudentId(intake).then((generatedStudentId) => {
      setStudentId(generatedStudentId); // Set the generated student ID

      const studentsRef = ref(db, "students"); // Reference to 'students' node in Realtime Database

      // Data object to save
      const newStudent = {
        firstName,
        lastName,
        address,
        dob,
        intake,
        studentId: generatedStudentId, // Use generated student ID
      };

      // Push new student data to Firebase
      push(studentsRef, newStudent)
        .then(() => {
          alert("Student added successfully!");
          saveLog(`Add student ${generatedStudentId}`);
          // Clear form fields
          setFirstName("");
          setLastName("");
          setAddress("");
          setDob("");
          setIntake("39");
        })
        .catch((error) => {
          console.error("Error adding student:", error);
          alert("Failed to add student. Please try again.");
        });
    }).catch((error) => {
      alert("Error generating student ID.");
      console.error("Error generating student ID:", error);
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
    <div className="bg-addstudent">
      <Navbar />
      <div className="container-addst">
        <div className="left-section-addst"><Slidebar /></div>
        <div className="right-section-addst">
          <div className="Addstd-page">
            <h2 className="heading-addst">Add Student</h2>
            <form className="form-addst" onSubmit={handleSubmit}>
              <div className="row-addst">
                <div className="inputGroup-addst">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="input-addst"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="inputGroup-addst">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="input-addst"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="inputGroupFull-addst">
                <label>Address</label>
                <input
                  type="text"
                  className="input-addst"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="row-addst">
                <div className="inputGroup-addst">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    className="input-addst"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                <div className="inputGroup-addst">
                  <label>Intake</label>
                  <select
                    className="input-addst"
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

              {/* <div className="inputGroupFull-addst">
                <label>Student ID</label>
                <input
                  type="text"
                  className="input-addst"
                  value={studentId}
                  disabled
                />
              </div> */}

              <button type="submit" className="submitBtnadst">Add Student</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


