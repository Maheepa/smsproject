import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Studentpage from './pages/Studentpage';
import Login from './components/Login';
import Homepage from './pages/Homepage';
import Addstudent from './pages/Addstudent';
import Liststudent from './pages/Liststudent';
import Courses from './pages/Courses';
import EditStudent from './pages/EditStudent';
import Log from './pages/Log';
import Admin from './pages/Admin';
import AssignCourses from './pages/Assigncourses';
import Slidebar from "./components/Slidebar";
import Coursepage from './pages/Coursepage';
import Viewstd from './pages/Viewstd';



function App() {
  return (
    
    <div className="App">
      <Router>
       <Routes>
       <Route path="/" element={<Homepage />} />
       <Route path="/pages/student" element={<Studentpage />} />
       <Route path="/pages/courses" element={<Courses />} />
       <Route path="/pages/Addstudent" element={<Addstudent />} />
       <Route path="/pages/Liststudent" element={<Liststudent />} />
       <Route path="/components/Login" element={<Login />} />
       <Route path="/editstudent" element={<EditStudent />} />
       <Route path="/pages/Log" element={<Log />} />
       <Route path="/pages/Admin" element={<Admin />} />
       <Route path="/pages/Assigncourses" element={<AssignCourses />} />
       <Route path="/pages/coursepage" element={<Coursepage />} />
       <Route path="/pages/Viewstd" element={<Viewstd />}/>

      </Routes>
    </Router>
    {/* <AdminLog/> */}
    
    </div>
  );
}

export default App;
