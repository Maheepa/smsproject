import React, { useState, useEffect } from "react";
import "./Courses.css";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import Navbar from "../components/Navbar";
import Slidebar from "../components/Slidebar";

const Courses = () => {
  const [selectedYear, setSelectedYear] = useState("1");
  const [selectedSemester, setSelectedSemester] = useState("1");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const years = [
    { year: "1", semesters: ["Semester 1", "Semester 2"] },
    { year: "2", semesters: ["Semester 3", "Semester 4"] },
    { year: "3", semesters: ["Semester 5", "Semester 6"] },
    { year: "4", semesters: ["Semester 7", "Semester 8"] },
  ];

  useEffect(() => {
    fetchCourses();
  }, [selectedYear, selectedSemester]);

  const fetchCourses = () => {
    const db = getDatabase();
    const coursesRef = ref(db, `Courses/${selectedYear}/Semester${selectedSemester}`);
    setLoading(true);

    onValue(coursesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCourses(Object.entries(data).map(([key, value]) => ({ id: key, ...value })));
      } else {
        setCourses([]);
      }
      setLoading(false);
    }, { onlyOnce: true });
  };

  const handleDelete = async (courseId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this course?");
    if (isConfirmed) {
      const db = getDatabase();
      const courseRef = ref(db, `Courses/${selectedYear}/Semester${selectedSemester}/${courseId}`);
      try {
        await remove(courseRef);
        fetchCourses();
        console.log("Course deleted successfully");
      } catch (error) {
        console.error("Error deleting course: ", error);
      }
    }
  };

  return (
    <div className="bg-crse">
      <Navbar />
      <div className="courses-container">
        <div className="left-section-crse"><Slidebar/></div>
        <div className="right-section-crse">
          <h2 className="heading-crse">Course List</h2>
          <div className="crse-page">
            <div className="filter-section">
              <label>Year: </label>
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                {years.map((yearOption) => (
                  <option key={yearOption.year} value={yearOption.year}>
                    Year {yearOption.year}
                  </option>
                ))}
              </select>

              <label>Semester: </label>
              <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
                {years.find((yearOption) => yearOption.year === selectedYear)?.semesters.map((sem, index) => (
                  <option key={index} value={index + 1}>{sem}</option>
                ))}
              </select>
            </div>

            <div className="courses-table">
              {loading ? (
                <p>Loading courses...</p>
              ) : courses.length > 0 ? (
                <table className="ctable">
                  <thead>
                    <tr>
                      <th>Module Code</th>
                      <th>Module Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id}>
                        <td>{course.courseCode || "No Code"}</td>
                        <td>{course.courseName || "No Name"}</td>
                        <td>
                          <button onClick={() => handleDelete(course.id)} className="delete-button">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="parapp">No courses available for this semester.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;



 