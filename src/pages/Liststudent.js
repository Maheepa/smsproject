import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Logout from "../components/Logout";
import "./Liststudent.css";
import { db } from "../firebase"; 
import Slidebar from "../components/Slidebar";
import "./Liststudent.css";

export default function StudentPage() {
  const [students, setStudents] = useState([]);
  const [studentSearch, setStudentSearch] = useState(""); 
  const [intakeSearch, setIntakeSearch] = useState(""); 
  const [filteredStudents, setFilteredStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const studentsRef = ref(db, "students");

    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const studentList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setStudents(studentList);
        setFilteredStudents(studentList); // Default to all students
      } else {
        setStudents([]);
        setFilteredStudents([]);
      }
    });
  }, []);

  // Function to filter students dynamically
  const handleSearch = () => {
    let filtered = students;

    if (studentSearch) {
      filtered = filtered.filter((student) =>
        student.studentId.toLowerCase().includes(studentSearch.toLowerCase())
      );
    }

    if (intakeSearch) {
      filtered = filtered.filter((student) =>
        student.intake.toString().includes(intakeSearch)
      );
    }

    setFilteredStudents(filtered);
  };

  const deleteStudent = (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this student? This action cannot be undone."
    );

    if (confirmation) {
      const studentRef = ref(db, `students/${id}`);
      remove(studentRef)
        .then(() => {
          alert("Student deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting student:", error);
          alert("Failed to delete student.");
        });
    }
  };

  const handleEdit = (student) => {
    navigate("/editstudent", { state: { student } });
  };

  return (
    <div className="bg-liststd">
      <Navbar />
      <div className="container-liststd">
        <div className="left-section-liststd"><Slidebar/></div>
          <div className="right-section-liststd">
              <h2 className="heading-liststd">Student List</h2>
            <div className="liststd-page">
        

        {/* Search Bars */}
        <div className="search-containerliststd">
          <input
            type="text"
            className="search-barliststd"
            placeholder="Search by Student ID..."
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
          />

          <input
            type="text"
            className="search-barliststd"
            placeholder="Search by Intake (e.g., 39)..."
            value={intakeSearch}
            onChange={(e) => setIntakeSearch(e.target.value)}
          />

          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
          </div>
        

        {/* Student Table */}
        <div>
        <table className="student-tableliststd">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Date of Birth</th>
              <th>Intake</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.studentId}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.address}</td>
                  <td>{student.dob}</td>
                  <td>{student.intake}</td>
                  <td>
                    <button className="edit-btnliststd" onClick={() => handleEdit(student)}>
                      Edit
                    </button>
                    <button
                      className="delete-btnliststd"
                      onClick={() => deleteStudent(student.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
        
      </div>
      </div>
      </div>
    </div>
  );
}



