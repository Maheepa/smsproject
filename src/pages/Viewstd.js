// import React, { useState, useEffect } from "react";
// import { db } from "../firebase";
// import { ref, get } from "firebase/database";

// export default function StudentSearch() {
//   const [searchId, setSearchId] = useState("");
//   const [student, setStudent] = useState(null);
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Function to handle search
//   const handleSearch = () => {
//     if (!searchId.trim()) {
//       setError("Please enter a Student ID.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setStudent(null);
//     setCourses([]);

//     // Fetch student data
//     const studentRef = ref(db, "students");
//     get(studentRef).then((snapshot) => {
//       if (snapshot.exists()) {
//         const studentsData = snapshot.val();
//         const studentData = Object.values(studentsData).find(
//           (s) => s.studentId === searchId
//         );

//         if (studentData) {
//           setStudent(studentData);
//           fetchCourses(studentData.intake);
//         } else {
//           setError("Student not found.");
//         }
//       }
//       setLoading(false);
//     });
//   };

//   // Function to determine current semester and academic year
//   const fetchCourses = (intake) => {
//     const currentMonth = new Date().getMonth() + 1; // Get current month (1-based)
    
//     let academicYear, semester;

//     // Determine student's academic year based on intake
//     const seniorIntake = 39; // Intake 39 is the 4th year
//     const yearDiff = seniorIntake - parseInt(intake);
//     academicYear = 4 - yearDiff; // Example: Intake 40 → 3rd Year

//     // Determine semester based on current month
//     semester = currentMonth >= 1 && currentMonth <= 6 ? 1 : 2;

//     // Fetch courses for that year and semester
//     const coursesRef = ref(db, `Courses/${academicYear}/Semester${semester}`);
//     get(coursesRef).then((snapshot) => {
//       if (snapshot.exists()) {
//         setCourses(Object.values(snapshot.val()));
//       } else {
//         setCourses([]);
//       }
//     });
//   };

//   return (
//     <div className="search-container">
//       <h2>Search Student</h2>
//       <div className="search-box">
//         <input
//           type="text"
//           placeholder="Enter Student ID"
//           value={searchId}
//           onChange={(e) => setSearchId(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {student && (
//         <div className="student-details">
//           <h3>Student Details</h3>
//           <p><strong>Name:</strong> {student.firstName} {student.lastName}</p>
//           <p><strong>Student ID:</strong> {student.studentId}</p>
//           <p><strong>Intake:</strong> {student.intake}</p>

//           <h3>Currently Enrolled Courses</h3>
//           {courses.length > 0 ? (
//             <ul>
//               {courses.map((course, index) => (
//                 <li key={index}>
//                   <strong>{course.courseCode}:</strong> {course.courseName}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No courses found for this semester.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }










import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, get } from "firebase/database";
import Navbar from "../components/Navbar";
import Slidebar from "../components/Slidebar";
import "./Viewstd.css";

export default function StudentSearch() {
  const [searchId, setSearchId] = useState("");
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [academicYear, setAcademicYear] = useState(null);
  const [semester, setSemester] = useState(null);

  const handleSearch = () => {
    console.log("Searching for Student ID:", searchId);
    
    if (!searchId.trim()) {
      setError("Please enter a Student ID.");
      console.error("Error: No Student ID entered");
      return;
    }

    setLoading(true);
    setError("");
    setStudent(null);
    setCourses([]);
    setAcademicYear(null);
    setSemester(null);

    const studentRef = ref(db, "students");
    get(studentRef).then((snapshot) => {
      if (snapshot.exists()) {
        const studentsData = snapshot.val();
        console.log("Fetched Students Data:", studentsData);
        
        const studentData = Object.values(studentsData).find(
          (s) => s.studentId === searchId
        );

        if (studentData) {
          console.log("Student Found:", studentData);
          setStudent(studentData);
          fetchCourses(studentData.intake);
        } else {
          setError("Student not found.");
          console.error("Error: Student not found");
        }
      } else {
        console.error("Error: No students data found in database");
      }
      setLoading(false);
    }).catch((err) => {
      console.error("Error fetching student data:", err);
      setLoading(false);
    });
  };

  const fetchCourses = (intake) => {
    console.log("Fetching courses for intake:", intake);
    const currentMonth = new Date().getMonth() + 1; 
    
    const seniorIntake = 39;
    const yearDiff = seniorIntake - parseInt(intake);
    const calculatedYear = yearDiff + 4; 
    const calculatedSemester = currentMonth >= 1 && currentMonth <= 6 ? 1 : 2;

    setAcademicYear(calculatedYear);
    setSemester(calculatedSemester);
    
    console.log(`Calculated Academic Year: ${calculatedYear}, Semester: ${calculatedSemester}`);

    const coursesRef = ref(db, `Courses/${calculatedYear}/Semester${calculatedSemester}`);
    get(coursesRef).then((snapshot) => {
      if (snapshot.exists()) {
        const fetchedCourses = Object.values(snapshot.val());
        console.log("Fetched Courses:", fetchedCourses);
        setCourses(fetchedCourses);
      } else {
        console.warn("Warning: No courses found for this semester");
        setCourses([]);
      }
    }).catch((err) => {
      console.error("Error fetching courses:", err);
    });
  };

  return (
    <div className="bg-viewstd"><Navbar/>
    <div className="container-viewstd">
      <div className="left-section-viewstd"><Slidebar/></div>
      <div className="right-section-viewstd">
      <h2 className="heading-viewstd">Search Student</h2>
      <div className="viewstd-page">
      <div className="search-boxviewstd">
        <input
          type="text"
          className="search-barviewstd"
          placeholder="Enter Student ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="search-btnviewstd" onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {student && (
        <div className="viewstudent-details">
          <h3 className="hview">Student Details</h3>
          
            <tbody className="viewstd-tbody">
              <tr>
                <td><strong>Name</strong></td>
                <td>:  {student.firstName} {student.lastName}</td>
              </tr>
              <tr>
                <td><strong>Student ID</strong></td>
                <td>:  {student.studentId}</td>
              </tr>
              <tr>
                <td><strong>Intake</strong></td>
                <td>:  {student.intake}</td>
              </tr>
              <tr>
                <td><strong>Year</strong></td>
                <td>:  {academicYear} Year</td>
              </tr>
              <tr>
                <td><strong>Current Semester</strong></td>
                <td>:  {semester}</td>
              </tr>
            </tbody>
          

          <h3 className="hview">Currently Enrolled Courses:</h3>
          {courses.length > 0 ? (
            <table className="viewstd-tb" >
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>{course.courseCode}</td>
                    <td>{course.courseName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="parapp">No courses found for this semester.</p>
          )}
        </div>
      )}
      </div>
      </div>
      </div>
    </div>
  );
}
