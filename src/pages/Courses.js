// import React, { useState, useEffect } from "react";
// import "./Courses.css";
// import { getDatabase, ref, onValue } from "firebase/database";
// import Navbar from "../components/Navbar";

// const Courses = () => {
//   const [selectedYear, setSelectedYear] = useState("1"); // Default Year 1
//   const [selectedSemester, setSelectedSemester] = useState("1"); // Default Semester 1
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const years = [
//     { year: "1", semesters: ["Semester 1", "Semester 2"] },
//     { year: "2", semesters: ["Semester 3", "Semester 4"] },
//     { year: "3", semesters: ["Semester 5", "Semester 6"] },
//     { year: "4", semesters: ["Semester 7", "Semester 8"] },
//   ];

//   useEffect(() => {
//     const db = getDatabase();
//     const coursesRef = ref(db, `Courses/${selectedYear}/Semester${selectedSemester}`);

//     console.log("Fetching data from: ", `Courses/${selectedYear}/Semester${selectedSemester}`);

//     onValue(coursesRef, (snapshot) => {
//       const data = snapshot.val();
//       console.log("Firebase Data: ", data);

//       if (data) {
//         // Extract the course data from the object using Object.values
//         const courseList = Object.values(data); 
//         setCourses(courseList);
//       } else {
//         setCourses([]); // No courses available
//       }
//       setLoading(false);
//     });
//   }, [selectedYear, selectedSemester]);

//   return (
//     <div>
//       <Navbar />
//       <div className="courses-container">
//         {/* Year Selection */}
//         <div className="filter-section">
//           <label>Year: </label>
//           <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
//             {years.map((yearOption) => (
//               <option key={yearOption.year} value={yearOption.year}>
//                 Year {yearOption.year}
//               </option>
//             ))}
//           </select>

//           {/* Semester Selection */}
//           <label>Semester: </label>
//           <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
//             {years
//               .find((yearOption) => yearOption.year === selectedYear)
//               ?.semesters.map((sem, index) => (
//                 <option key={index} value={index + 1}>
//                   {sem}
//                 </option>
//               ))}
//           </select>
//         </div>

//         {/* Display Courses */}
//         <div className="courses-table">
//           {loading ? (
//             <p>Loading courses...</p>
//           ) : courses.length > 0 ? (
//             <table className="ctable">
//               <thead>
//                 <tr>
//                   <th>Module Code</th>
//                   <th>Module Name</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {courses.map((course, index) => (
//                   <tr key={index}>
//                     <td>{course.courseCode || "No Code"}</td>
//                     <td>{course.courseName || "No Name"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No courses available for this semester.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Courses;


import React, { useState, useEffect } from "react";
import "./Courses.css";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import Navbar from "../components/Navbar";

const Courses = () => {
  const [selectedYear, setSelectedYear] = useState("1"); // Default Year 1
  const [selectedSemester, setSelectedSemester] = useState("1"); // Default Semester 1
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const years = [
    { year: "1", semesters: ["Semester 1", "Semester 2"] },
    { year: "2", semesters: ["Semester 3", "Semester 4"] },
    { year: "3", semesters: ["Semester 5", "Semester 6"] },
    { year: "4", semesters: ["Semester 7", "Semester 8"] },
  ];

  useEffect(() => {
    const db = getDatabase();
    const coursesRef = ref(db, `Courses/${selectedYear}/Semester${selectedSemester}`);

    console.log("Fetching data from: ", `Courses/${selectedYear}/Semester${selectedSemester}`);

    onValue(coursesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Firebase Data: ", data);

      if (data) {
        // Extract the course data from the object using Object.values
        const courseList = Object.values(data); 
        setCourses(courseList);
      } else {
        setCourses([]); // No courses available
      }
      setLoading(false);
    });
  }, [selectedYear, selectedSemester]);

  // Function to handle course deletion
  const handleDelete = (courseCode) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this course?");
    if (isConfirmed) {
      const db = getDatabase();
      const courseRef = ref(db, `Courses/${selectedYear}/Semester${selectedSemester}/${courseCode}`);
      remove(courseRef)
        .then(() => {
          console.log("Course deleted successfully");
          // Refresh the courses list after deletion
          setCourses(courses.filter((course) => course.courseCode !== courseCode));
        })
        .catch((error) => {
          console.error("Error deleting course: ", error);
        });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="courses-container">
        {/* Year Selection */}
        <div className="filter-section">
          <label>Year: </label>
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            {years.map((yearOption) => (
              <option key={yearOption.year} value={yearOption.year}>
                Year {yearOption.year}
              </option>
            ))}
          </select>

          {/* Semester Selection */}
          <label>Semester: </label>
          <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
            {years
              .find((yearOption) => yearOption.year === selectedYear)
              ?.semesters.map((sem, index) => (
                <option key={index} value={index + 1}>
                  {sem}
                </option>
              ))}
          </select>
        </div>

        {/* Display Courses */}
        <div className="courses-table">
          {loading ? (
            <p>Loading courses...</p>
          ) : courses.length > 0 ? (
            <table className="ctable">
              <thead>
                <tr>
                  <th>Module Code</th>
                  <th>Module Name</th>
                  <th>Action</th> {/* Added column for delete button */}
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>{course.courseCode || "No Code"}</td>
                    <td>{course.courseName || "No Name"}</td>
                    <td>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(course.courseCode)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No courses available for this semester.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
