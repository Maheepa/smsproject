// import React, { useState, useEffect } from "react";
// import { getDatabase, ref, onValue, remove } from "firebase/database";
// import Navbar from "../components/Navbar";
// import Logout from "../components/Logout"; // Ensure you use Logout instead of Login
// import "./Studentpage.css"; // Ensure you have this CSS file for styling
// import { db } from "../firebase"; // Import Firebase configuration

// export default function StudentPage() {
//   const [students, setStudents] = useState([]);

//   // Fetch student data from Firebase
//   useEffect(() => {
//     const studentsRef = ref(db, "students");
    
//     onValue(studentsRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const studentList = Object.keys(data).map((key) => ({
//           id: key,
//           ...data[key],
//         }));
//         setStudents(studentList);
//       } else {
//         setStudents([]); // Set empty array if no data
//       }
//     });
//   }, []);

//   // Function to delete a student from Firebase
//   const deleteStudent = (id) => {
//     const studentRef = ref(db, `students/${id}`);
//     remove(studentRef)
//       .then(() => {
//         alert("Student deleted successfully!");
//       })
//       .catch((error) => {
//         console.error("Error deleting student:", error);
//         alert("Failed to delete student.");
//       });
//   };

//   return (
//     <div>
//       <Navbar />
//       <Logout />
//       <div className="student-page">
//         <h2>Student List</h2>

//         {/* Student Table */}
//         <table className="student-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>FirstName</th>
//               <th>LastName</th>
//               <th>Address</th>
//               <th>DataofBirth</th>
//               <th>Intake</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.length > 0 ? (
//               students.map((student) => (
//                 <tr key={student.studentId}>
//                   <td>{student.studentId}</td>
//                   <td>{student.firstName}</td>
//                   <td>{student.lastName}</td>
//                   <td>{student.address}</td>
//                   <td>{student.dob}</td>
//                   <td>{student.intake}</td>
//                   <td>
//                     <button
//                       className="delete-btn"
//                       onClick={() => deleteStudent(student.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5">No students found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }















import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Logout from "../components/Logout";
import "./Studentpage.css";
import { db } from "../firebase"; 

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
    <div>
      <Navbar />
      <div className="student-page">
        <h2>Student List</h2>

        {/* Search Bars */}
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search by Student ID..."
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
          />

          <input
            type="text"
            className="search-bar"
            placeholder="Search by Intake (e.g., 39)..."
            value={intakeSearch}
            onChange={(e) => setIntakeSearch(e.target.value)}
          />

          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* Student Table */}
        <table className="student-table">
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
                    <button className="edit-btn" onClick={() => handleEdit(student)}>
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </button>
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
  );
}



