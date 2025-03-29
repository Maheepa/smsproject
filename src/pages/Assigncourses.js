import React, { useState,useEffect } from "react";
import { getDatabase, ref, update,get,remove,push } from "firebase/database";
import { db, auth } from "../firebase"; 

const AddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [year, setYear] = useState("1");
  const [semester, setSemester] = useState("1");
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

  const years = [
    { year: 1, semesters: ["Semester 1", "Semester 2"] },
    { year: 2, semesters: ["Semester 3", "Semester 4"] },
    { year: 3, semesters: ["Semester 5", "Semester 6"] },
    { year: 4, semesters: ["Semester 7", "Semester 8"] },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Firebase reference
    const db = getDatabase();
    const courseRef = ref(db, `Courses/${year}/Semester${semester}/Code${courseCode}`);

    // Create the course data to save
    const courseData = {
      courseName: courseName,
      courseCode: courseCode,
    };

    // Set the data under the correct year and semester
    update(courseRef, courseData)
      .then(() => {
        alert("Course added successfully!");
        saveLog(`Add course ${courseName}`);
      })
      .catch((error) => {
        console.error("Error adding course: ", error);
      });

    // Clear form after submission
    setCourseName("");
    setCourseCode("");
    setYear("1");
    setSemester("1");
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
      <h2>Add a New Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Name:</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Course Code:</label>
          <input
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Year:</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          >
            {years.map((yearOption) => (
              <option key={yearOption.year} value={yearOption.year}>
                Year {yearOption.year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Semester:</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          >
            {years
              .find((yearOption) => yearOption.year === parseInt(year))
              .semesters.map((sem, index) => (
                <option key={index} value={index + 1}>
                  {sem}
                </option>
              ))}
          </select>
        </div>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
