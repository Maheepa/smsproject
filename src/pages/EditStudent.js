import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { ref, update, push, get, remove, set } from "firebase/database";
import Navbar from "../components/Navbar";
import Slidebar from "../components/Slidebar";
import "./EditStudent.css";



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
        setCurrentUser(user.email);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // If intake is changed, delete from old node and add to new intake
    if (student.intake !== intake) {
      const oldStudentRef = ref(db, `students/${student.id}`);
      remove(oldStudentRef).then(() => {
        console.log("Old student record deleted successfully.");
        addStudentWithNewIntake();
      }).catch((error) => {
        console.error("Error deleting old student record:", error);
      });
    } else {
      updateStudentDetails(student.id);
    }
  };

  const addStudentWithNewIntake = () => {
    const studentsRef = ref(db, "students");
    get(studentsRef).then((snapshot) => {
      const studentsData = snapshot.val() || {};
      
      // Get the number of students in the new intake to generate student ID
      const intakeStudents = Object.values(studentsData).filter(s => s.intake === intake);
      const newStudentId = `${intake}${String(intakeStudents.length + 1).padStart(3, "0")}`;
      
      const newStudentRef = push(studentsRef);
      const newStudentKey = newStudentRef.key;

      const newStudentData = {
        id: newStudentKey,
        firstName,
        lastName,
        address,
        dob,
        intake,
        studentId: newStudentId
      };

      set(ref(db, `students/${newStudentKey}`), newStudentData)
        .then(() => {
          console.log("New student record created successfully.");
          alert("Student updated successfully!");
          saveLog(`Updated student from intake ${student.intake} to ${intake}`);
          navigate("/pages/student");
        })
        .catch((error) => {
          console.error("Error creating new student record:", error);
          alert("Failed to update student.");
        });
    });
  };

  const updateStudentDetails = (studentId) => {
    const studentRef = ref(db, `students/${studentId}`);
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
    if (!currentUser) return;
    const logsRef = ref(db, "logs");
    const newLog = {
      user: currentUser,
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
          const oldestLogKey = logKeys[0];
          remove(ref(db, `logs/${oldestLogKey}`));
        }
      }
    });
  };

  return (
    <div className="bg-editstd">
      <Navbar />
      <div className="container-editstd">
      <div className="left-section-editstd"><Slidebar/></div>
      <div className="right-section-editstd">
        <div className="editstd-page">
        <h2 className="heading-editstd">Edit Student</h2>
        <form className="form-editstd" onSubmit={handleUpdate}>
        <div className="row-editstd">
        <div className="inputGroup-editstd">
          <label>First Name</label>
          <input type="text" className="input-editstd" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="inputGroup-editstd">
          <label>Last Name</label>
          <input type="text" className="input-editstd" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          </div>
          <div className="inputGroupFull-editstd">
          <label className="lable-editstd">Address</label>
          <input type="text" className="input-editstd" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="row-editstd">
          <div className="inputGroup-editstd">
          <label>Date of Birth</label>
          <input type="date" className="input-editstd" value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
          <div className="inputGroup-editstd">
          <label>Intake</label>
          <select className="input-editstd" value={intake} onChange={(e) => setIntake(e.target.value)}>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
          </select>
          </div>
          </div>
          <button className="edit-button" type="submit">Update Student</button>
        </form>
        </div>
        </div>
      </div>
    </div>
  );
}
